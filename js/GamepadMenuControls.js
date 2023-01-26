(async () => {
  await import("https://cdn.jsdelivr.net/gh/alvaromontoro/gamecontroller.js@latest/dist/gamecontroller.min.js");
  function GamepadMenuControls(elements) {
    gameControl.on("connect", (controller) => {
      this.controller = controller;
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
      controller.on("button0", () => {}).before("button0", () => {
        document.querySelectorAll(".gamepad-focus")[document.querySelectorAll(".gamepad-focus").length - 1].click();
        this.action("click", document.querySelectorAll(".gamepad-focus")[document.querySelectorAll(".gamepad-focus").length - 1]);
      });
      controller.on("button1", () => {}).before("button1", () => {
        swal.getState().isOpen && swal.close();
        document.querySelector(".notiflix-confirm") && document.querySelector(".notiflix-confirm").remove();
      });
      controller.on("left0", () => {}).before("left0", () => {
        this.focus + 1 >= this.maxFocus ? this.focus = 0 : this.focus++;
        timeout = setTimeout(() => {
          threshold = setInterval(() => {
            this.focus + 1 >= this.maxFocus ? this.focus = 0 : this.focus++;
          }, 100);
        }, 400);
      }).after("left0", () => (clearInterval(threshold), clearTimeout(timeout)));
      controller.on("right0", () => {}).before("right0", () => {
        this.focus <= 0 ? this.focus = this.maxFocus - 1 : this.focus--;
        timeout = setTimeout(() => {
          threshold = setInterval(() => {
            this.focus <= 0 ? this.focus = this.maxFocus - 1 : this.focus--;
          }, 100);
        }, 400);
      }).after("right0", () => (clearInterval(threshold), clearTimeout(timeout)));
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
  swal = function() {
    e.apply(this, arguments);
    document.querySelectorAll(".gamepad-focus").forEach(x => x.classList.remove("gamepad-focus"));
    document.querySelector(".swal-button").classList.add("gamepad-focus");
  }
  swal.close = function() {
    d.apply(this, arguments);
    document.querySelector(".swal-button").classList.remove("gamepad-focus");
  }
  swal.getState = f;
})();