UI = function(type, action) {
  if (type == "touch") {
    let ui = document.createElement("div");
    let movementStick = document.createElement("div");
    let movementButton = document.createElement("div");
    let jumpButton = document.createElement("div");
    let shootButton = document.createElement("div");
    movementStick.style = `
    position: absolute;
    left: 35px;
    bottom: 150px;
    margin: 0;
    border: 3px solid #fff;
    border-radius: 100%;
    width: 100px;
    height: 100px;
    z-index: 9999999999999999999;
    `;
    jumpButton.style = `
    position: absolute;
    right: 35px;
    bottom: 35px;
    margin: 0;
    border: 3px solid #fff;
    border-radius: 100%;
    width: 100px;
    height: 100px;
    z-index: 9999999999999999999;
    display: inline-flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    `;
    movementButton.style = `
    pointer-events: none;
    position: absolute;
    left: 10px;
    bottom: 10px;
    margin: 0;
    background: #fff;
    border-radius: 100%;
    width: 80px;
    height: 80px;
    `;
    jumpButton.innerHTML += `
    <img src="images/icons/ui/jump.png" style="width: 50%; filter: invert(100%)">
    `;
    movementStick.appendChild(movementButton);
    movementStick.addEventListener("touchmove", function(event) {
      let touch = event.touches[0];
      Object.values(event.touches).forEach(x => x.target == movementStick && (console.log(x), touch = x));
      movementButton.style.left = (touch.pageX - 85) + "px";
      movementButton.style.bottom = ((window.innerHeight - touch.pageY) - 200) + "px";
      let x = touch.pageX - movementStick.getBoundingClientRect().left;
      let y = touch.pageY - movementStick.getBoundingClientRect().top;
      let position = x >= 50 && y <= 0 ? "forward" : x >= 75 && y <= 25 ? "forward-right" : x >= 75 && y <= 75 ? "right" : x >= 50 && y >= 75 ? "backward-right" : x <= 50 && y >= 75 ? "backward" : x <= 0 && y >= 50 ? "backward-left" : x <= 0 && y <= 50 ? "left" : x <= 50 && y <= 0 ? "forward-left" : "";
      typeof action == "function" && action("move", {
        where: position,
        run: y <= -100,
        positive: true
      });
    });
    movementStick.addEventListener("touchend", function(event) {
      if (event.target != movementStick) return;
      typeof action == "function" && action("move", {
        positive: false
      });
      movementButton.style.left = "10px";
      movementButton.style.bottom = "10px";
    });
    jumpButton.addEventListener("touchstart", () => ((jumpButton.style.transform = "scale(.9)", jumpButton.querySelector("img").style.transform = "scale(1.1)"), typeof action == "function" && action("jump", {
      positive: true
    })));
    jumpButton.addEventListener("touchend", () => ((jumpButton.style.transform = "", jumpButton.querySelector("img").style.transform = ""), typeof action == "function" && action("jump", {
      positive: false
    })));
    ui.appendChild(movementStick);
    ui.appendChild(jumpButton);
    this.domElement = ui;
  }
}