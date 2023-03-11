document.head.innerHTML += `
<script src="https://cdn.jsdelivr.net/npm/simple-keyboard@latest/build/index.js"></script>
`;
(async () => {
  await import("https://cdn.jsdelivr.net/gh/alvaromontoro/gamecontroller.js@latest/dist/gamecontroller.min.js");
  await import("https://cdn.jsdelivr.net/gh/TSedlar/pseudo-styler@1.0.7/pseudostyler.js");
  function GamepadMenuControls(elements, inverted = false, onlyCursor = false) {
    let styler;
    (async () => {
      styler = new PseudoStyler();
      await styler.loadDocumentStyles();
      styler.setStyle = function setStyle(element, pseudoclass, force) {
        if (typeof element != "object") return;
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
        if (typeof element != "object") return;
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
    if (document.head.querySelector("style") != null) {
      document.head.querySelector("style").textContent += `
      .simple-keyboard {
        width: 90% !important;
        left: 50%;
        margin: 0;
        margin-left: -45%;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1), 0 1px 8px rgba(0, 0, 0, 0.3);
        position: fixed;
        bottom: 35px !important;
        z-index: 999999999999999;
        display: none;
      }
      .hg-button:hover {
        background: #eee !important;
      }
      .hg-button:active {
        background: #ccc !important;
        box-shadow: none !important;
      }
      `;
    } else {
      document.head.innerHTML += `
      <style>
      .simple-keyboard {
        width: 90% !important;
        left: 50%;
        margin: 0;
        margin-left: -45%;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1), 0 1px 8px rgba(0, 0, 0, 0.3);
        position: fixed;
        bottom: 35px !important;
        z-index: 999999999999999;
        display: none;
      }
      .hg-button:hover {
        background: #eee !important;
      }
      .hg-button:active {
        background: #ccc !important;
        box-shadow: none !important;
      }
      </style>
      `;
    }
    document.head.innerHTML += `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/simple-keyboard@latest/build/css/index.css">
    `;
    document.body.innerHTML += `
    <div class="simple-keyboard"></div>
    `;
    let currentInput;
    function openKeyboard(input) {
      currentInput = input;
      let keyboard = document.querySelector(".simple-keyboard");
      if (keyboard.style.display == "block") {
        keyboard.style.display = "none";
      } else {
        keyboard.style.display = "block";
      }
    }
    function onKeyPress(button) {
      let buttons = {
        "{space}": " ",
        "{tab}": "\t",
        "{lock}": "",
        "{shift}": " ",
        "{enter}": "\n",
        "{bksp}": "bksp",
      };
      if (button.includes("{")) button = button.replace(button, buttons[button]);
      if (currentInput) {
        if (button == "bksp") {
          return currentInput.value = currentInput.value.split("").reverse().splice(1).reverse().join("");
        }
        currentInput.value += button;
      }
      currentInput.dispatchEvent(new KeyboardEvent("keyup", { key: button, bubbles: true }));
    }
    let Keyboard = SimpleKeyboard.default;
    let keyboard = new Keyboard({
      onChange: () => {},
      onKeyPress: button => onKeyPress(button)
    });
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
      cursorMode = onlyCursor;
      this.toggleCursor = function() {
        controller.buttonActions[13].before();
      };
      let getGamepads = null;
      this.disable = function() {
        getGamepads = navigator.getGamepads;
        navigator.getGamepads = function() { return [] };
        cursor.style.visibility = "hidden";
      };
      this.enable = function() {
        navigator.getGamepads = getGamepads;
        getGamepads = null;
        cursor.style.visibility = "";
      };
      this.setCursorPosition = function(x, y) {
        cursorX = x;
        cursorY = y;
      };
      controller.on("button13", () => {}).before("button13", () => {
        if (cursorMode) {
          if (onlyCursor) return;
          document.body.removeChild(cursor);
          cursorMode = false;
        } else {
          document.body.appendChild(cursor);
          cursorMode = true;
        }
      });
      let cursor = document.createElement("div");
      if (onlyCursor) {
        document.body.appendChild(cursor);
      }
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
        if (cursorMode) {
          if (document.elementsFromPoint(cursorX, cursorY)[1].tagName == "INPUT") {
            openKeyboard(document.elementsFromPoint(cursorX, cursorY)[1]);
          }
          return document.elementsFromPoint(cursorX, cursorY)[1].click(), document.elementsFromPoint(cursorX, cursorY)[1].dispatchEvent(new MouseEvent("pointerdown")), document.elementsFromPoint(cursorX, cursorY)[1].dispatchEvent(new MouseEvent("pointerup"));
        }
        if (document.querySelectorAll(".gamepad-focus")[document.querySelectorAll(".gamepad-focus").length - 1].tagName == "INPUT") {
          openKeyboard(document.querySelectorAll(".gamepad-focus")[document.querySelectorAll(".gamepad-focus").length - 1]);
        }
        document.querySelectorAll(".gamepad-focus")[document.querySelectorAll(".gamepad-focus").length - 1].click();
        document.querySelectorAll(".gamepad-focus")[document.querySelectorAll(".gamepad-focus").length - 1].dispatchEvent(new MouseEvent("pointerdown"));
        document.querySelectorAll(".gamepad-focus")[document.querySelectorAll(".gamepad-focus").length - 1].dispatchEvent(new MouseEvent("pointerup"));
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
          if (objects.indexOf(x) == this.focus && !cursorMode) {
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