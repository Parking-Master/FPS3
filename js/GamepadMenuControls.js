(async () => {
  await import("https://cdn.jsdelivr.net/gh/alvaromontoro/gamecontroller.js@latest/dist/gamecontroller.min.js");
  function GamepadMenuControls(elements) {
    let objects = [];
    this.focus = 0;
    elements.forEach(element => {
      element = document.querySelector(element);
      if (!element || !element.checkVisibility()) return;
      objects.push(element);
    });
    let tempObjects = [];
    setInterval(() => {
      elements.forEach(element => {
        element = document.querySelector(element);
        if (!element || !element.checkVisibility()) return;
        objects.pop();
        objects.unshift(element);
      });
    }, 1000);
    this.maxFocus = objects.length;
    let timeout = 0;
    let threshold = 0;
    gameControl.on("connect", (controller) => {
      this.controller = controller;
      controller.on("button0", () => {}).before("button0", () => {
        document.querySelectorAll(".gamepad-focus")[document.querySelectorAll(".gamepad-focus").length - 1].click();
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
    });
    setInterval(() => {
      objects.forEach(x => {
        if (objects.indexOf(x) == this.focus) {
          x.classList.add("gamepad-focus");
          x.style.outline = "5px solid #fbf719c4";
        } else {
          x.classList.remove("gamepad-focus");
          x.style.outline = "none";
        }
      });
    });
  }
  window.GamepadMenuControls = GamepadMenuControls;
  let e = swal;
  let d = swal.close;
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
})();