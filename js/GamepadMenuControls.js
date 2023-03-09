(async () => {
  await import("https://cdn.jsdelivr.net/gh/alvaromontoro/gamecontroller.js@latest/dist/gamecontroller.min.js");
  await import("https://cdn.jsdelivr.net/gh/TSedlar/pseudo-styler@1.0.7/pseudostyler.js");
  function GamepadMenuControls(elements, inverted = false) {
    let styler;
    (async () => {
      styler = new PseudoStyler();
      await styler.loadDocumentStyles();
      styler.setStyle = function setStyle(element, pseudoclass, force) {
        if (!this.registered.has(element)) {
          this.registered.set(element, new Map());
        }
        if (!this.registered.get(element).has(pseudoclass)) {
          this.register(element, pseudoclass);
        }
        let uuid = this.registered.get(element).get(pseudoclass);
        element.classList.add(this._getMimicClassName(pseudoclass, uuid).substr(1), force);
      };
      styler.removeStyle = function removeStyle(element, pseudoclass, force) {
        if (!this.registered.has(element)) {
          this.registered.set(element, new Map());
        }
        if (!this.registered.get(element).has(pseudoclass)) {
          this.register(element, pseudoclass);
        }
        let uuid = this.registered.get(element).get(pseudoclass);
        element.classList.remove(this._getMimicClassName(pseudoclass, uuid).substr(1), force);
      };
    })();
    gameControl.on("connect", (controller) => {
      window.controller = controller;
      this.elements = elements;
      let objects = [];
      this.focus = 0;
      this.elements.forEach(element => {
        element = document.querySelector(element);
        if (!element || !element.checkVisibility()) return;
        objects.push(element);
      });
      this.update = function() {
        objects = [];
        this.elements.forEach(element => {
          element = document.querySelector(element);
          if (!element || !element.checkVisibility()) return;
          objects.push(element);
        });
      };
      setInterval(() => {
        this.elements.forEach(element => {
          element = document.querySelector(element);
          if (!element || !element.checkVisibility()) return;
          objects.pop();
          objects.unshift(element);
        });
        this.maxFocus = objects.length;
      }, 1000);
      this.maxFocus = objects.length;
      let timeout = 0;
      let threshold = 0;
      let controlX = inverted ? "button11" : "left0";
      let controlY = inverted ? "button12" : "right0";
      let cursorMode = false;
      controller.on("button13", () => {}).before("button13", () => {
        if (cursorMode) {
          document.body.removeChild(cursor);
          cursorMode = false;
        } else {
          document.body.appendChild(cursor);
          cursorMode = true;
        }
      });
      let cursor = document.createElement("div");
      cursor.className = "gamepad-cursor";
      let cursorX = 20, cursorY = 20;
      cursor.style = "width: 20px; height: 20px; z-index: 999999999999999999999; background-image: url(./images/cursors/gamepad.png); background-size: cover; background-repeat: no-repeat; background-position: center; padding: 2px; position: absolute;";
      function pollGamepad() {
        let sensitivity = 3;
        if (!navigator.getGamepads()[0]) return;
        let gamepad = navigator.getGamepads()[0];
        if (!gamepad || !cursorMode) return;
        if (gamepad.axes[1] > 0.20) {
          document.elementsFromPoint(cursorX + (gamepad.axes[0] * sensitivity), (cursorY + (gamepad.axes[1] * sensitivity)))[1] != document.elementsFromPoint(cursorX, cursorY)[1] && styler.removeStyle(document.elementsFromPoint(cursorX, cursorY)[1], ":hover");
          if (!((cursorY + (gamepad.axes[1] * sensitivity)) < 0) && !((cursorY + (gamepad.axes[1] * sensitivity)) > window.innerHeight - 10)) cursorY += (gamepad.axes[1] * sensitivity);
        }
        if (gamepad.axes[1] < -0.20) {
          document.elementsFromPoint(cursorX + (gamepad.axes[0] * sensitivity), (cursorY + (gamepad.axes[1] * sensitivity)))[1] != document.elementsFromPoint(cursorX, cursorY)[1] && styler.removeStyle(document.elementsFromPoint(cursorX, cursorY)[1], ":hover");
          if (!((cursorY + (gamepad.axes[1] * sensitivity)) < 0) && !((cursorY + (gamepad.axes[1] * sensitivity)) > window.innerHeight - 10)) cursorY += (gamepad.axes[1] * sensitivity);
        }
        if (gamepad.axes[0] < -0.20) {
          document.elementsFromPoint(cursorX + (gamepad.axes[0] * sensitivity), (cursorY + (gamepad.axes[1] * sensitivity)))[1] != document.elementsFromPoint(cursorX, cursorY)[1] && styler.removeStyle(document.elementsFromPoint(cursorX, cursorY)[1], ":hover");
          if (!((cursorX + (gamepad.axes[0] * sensitivity)) < 0) && !((cursorX + (gamepad.axes[0] * sensitivity)) > window.innerWidth - 10)) cursorX += (gamepad.axes[0] * sensitivity);
        }
        if (gamepad.axes[0] > 0.20) {
          document.elementsFromPoint(cursorX + (gamepad.axes[0] * sensitivity), (cursorY + (gamepad.axes[1] * sensitivity)))[1] != document.elementsFromPoint(cursorX, cursorY)[1] && styler.removeStyle(document.elementsFromPoint(cursorX, cursorY)[1], ":hover");
          if (!((cursorX + (gamepad.axes[0] * sensitivity)) < 0) && !((cursorX + (gamepad.axes[0] * sensitivity)) > window.innerWidth - 10)) cursorX += (gamepad.axes[0] * sensitivity);
        }
      }
      setInterval(() => {
        pollGamepad();
        cursor.style.left = cursorX + "px";
        cursor.style.top = cursorY + "px";
        styler.setStyle(document.elementsFromPoint(cursorX, cursorY)[1], ":hover");
      });
      controller.on("button0", () => {}).before("button0", () => {
        if (cursorMode) return document.elementsFromPoint(cursorX, cursorY)[1].click();
        document.querySelectorAll(".gamepad-focus")[document.querySelectorAll(".gamepad-focus").length - 1].click();
        this.action("click", document.querySelectorAll(".gamepad-focus")[document.querySelectorAll(".gamepad-focus").length - 1]);
      });
      controller.on("button1", () => {}).before("button1", () => {
        swal.getState().isOpen && swal.close();
        document.querySelector(".notiflix-confirm") && document.querySelector(".notiflix-confirm").remove();
      });
      controller.on(controlX, () => {}).before(controlX, () => {
        if (cursorMode) return;
        this.focus + 1 >= this.maxFocus ? this.focus = 0 : this.focus++;
        timeout = setTimeout(() => {
          threshold = setInterval(() => {
            this.focus + 1 >= this.maxFocus ? this.focus = 0 : this.focus++;
          }, 100);
        }, 400);
      }).after(controlX, () => (clearInterval(threshold), clearTimeout(timeout)));
      controller.on(controlY, () => {}).before(controlY, () => {
        if (cursorMode) return;
        this.focus <= 0 ? this.focus = this.maxFocus - 1 : this.focus--;
        timeout = setTimeout(() => {
          threshold = setInterval(() => {
            this.focus <= 0 ? this.focus = this.maxFocus - 1 : this.focus--;
          }, 100);
        }, 400);
      }).after(controlY, () => (clearInterval(threshold), clearTimeout(timeout)));
      setInterval(() => {
        if (!(!document.querySelector(".notiflix-confirm-overlay") || !document.querySelector(".notiflix-confirm-overlay").checkVisibility())) {
          document.querySelectorAll(".gamepad-focus").forEach(x => x.classList.remove("gamepad-focus"));
          document.querySelector(".nx-confirm-button-ok").classList.add("gamepad-focus");
        }
        objects.forEach(x => {
          if (objects.indexOf(x) == this.focus) {
            x.classList.add("gamepad-focus");
          } else {
            x.classList.remove("gamepad-focus");
          }
        });
      });
    });
  }
  window.GamepadMenuControls = GamepadMenuControls;
  let e = swal;
  let d = swal.close;
  let f = swal.getState;
  document.addEventListener("click", function(e) {
    if (e.target.classList.contains("swal-button")) {
      document.querySelector(".swal-button").classList.remove("gamepad-focus");
    }
  });
  swal.close = function() {
    d.apply(this, arguments);
    document.querySelector(".swal-button").classList.remove("gamepad-focus");
  }
  swal.getState = f;
})();