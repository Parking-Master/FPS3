UI = function(type, action) {
  if (type == "touch") {
    let ui = document.createElement("div");
    let movementStick = document.createElement("div");
    let movementButton = document.createElement("div");
    let jumpButton = document.createElement("div");
    let shootButton = document.createElement("div");
    let fireButton = document.createElement("div");
    let zoomButton = document.createElement("div");
    let reloadButton = document.createElement("div");
    let throwButton = document.createElement("div");
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
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1), 0 1px 4px rgba(0, 0, 0, 0.24);
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
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1), 0 1px 4px rgba(0, 0, 0, 0.24);
    `;
    shootButton.style = `
    position: absolute;
    right: 35px;
    bottom: 170px;
    margin: 0;
    border: 2px solid #fff;
    border-radius: 100%;
    width: 50px;
    height: 50px;
    z-index: 9999999999999999999;
    display: inline-flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1), 0 1px 4px rgba(0, 0, 0, 0.24);
    `;
    fireButton.style = `
    position: absolute;
    left: 150px;
    bottom: 285px;
    margin: 0;
    border: 2px solid #fff;
    border-radius: 100%;
    width: 50px;
    height: 50px;
    z-index: 9999999999999999999;
    display: inline-flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1), 0 1px 4px rgba(0, 0, 0, 0.24);
    `;
    zoomButton.style = `
    position: absolute;
    left: 35px;
    bottom: 285px;
    margin: 0;
    border: 2px solid #fff;
    border-radius: 100%;
    width: 50px;
    height: 50px;
    z-index: 9999999999999999999;
    display: inline-flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1), 0 1px 4px rgba(0, 0, 0, 0.24);
    `;
    reloadButton.style = `
    position: absolute;
    right: 35px;
    bottom: 285px;
    margin: 0;
    border: 2px solid #fff;
    border-radius: 100%;
    width: 50px;
    height: 50px;
    z-index: 9999999999999999999;
    display: inline-flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1), 0 1px 4px rgba(0, 0, 0, 0.24);
    `;
    throwButton.style = `
    position: absolute;
    left: 50%;
    bottom: 0;
    margin: 0;
    border: 3px solid #fff;
    border-bottom: none;
    border-radius: 4px;
    width: 100px;
    height: 40px;
    margin-left: -50px;
    z-index: 9999999999999999999;
    display: inline-flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1), 0 1px 4px rgba(0, 0, 0, 0.24);
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
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1), 0 1px 4px rgba(0, 0, 0, 0.24);
    `;
    jumpButton.innerHTML += `
    <img src="images/icons/ui/jump.png" style="width: 50%; filter: invert(100%)">
    `;
    shootButton.innerHTML += `
    <img src="images/icons/ui/shoot.png" style="width: 50%; filter: invert(100%)">
    `;
    fireButton.innerHTML += `
    <img src="images/icons/ui/shoot1.png" style="width: 50%; filter: invert(100%);">
    `;
    zoomButton.innerHTML += `
    <img src="images/icons/ui/zoom.png" style="width: 50%; filter: invert(100%)">
    `;
    reloadButton.innerHTML += `
    <img src="images/icons/ui/reload.png" style="width: 50%; filter: invert(100%)">
    `;
    throwButton.innerHTML += `
    <img src="images/icons/ui/grenade.png" style="width: 50%">
    `;
    movementStick.appendChild(movementButton);
    movementStick.addEventListener("touchmove", function(event) {
      let touch = event.touches[0];
      Object.values(event.touches).forEach(x => x.target == movementStick && (console.log(x), touch = x));
      movementButton.style.left = (touch.pageX - 85) + "px";
      movementButton.style.bottom = ((window.innerHeight - touch.pageY) - 200) + "px";
      movementStick.style.background = "rgba(0, 0, 0, .2)";
      movementButton.style.background = "#eee";
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
      movementStick.style.background = "";
      movementButton.style.background = "#fff";
    });
    jumpButton.addEventListener("touchstart", () => ((jumpButton.style.transform = "scale(.9)", jumpButton.querySelector("img").style.transform = "scale(1.1)"), typeof action == "function" && action("jump", {
      positive: true
    })));
    jumpButton.addEventListener("touchend", () => ((jumpButton.style.transform = "", jumpButton.querySelector("img").style.transform = ""), typeof action == "function" && action("jump", {
      positive: false
    })));
    shootButton.addEventListener("touchstart", () => ((shootButton.style.transform = "scale(.9)", shootButton.querySelector("img").style.transform = "scale(1.1)"), typeof action == "function" && action("shoot", {
      positive: true
    })));
    shootButton.addEventListener("touchend", () => ((shootButton.style.transform = "", shootButton.querySelector("img").style.transform = ""), typeof action == "function" && action("shoot", {
      positive: false
    })));
    zoomButton.addEventListener("touchstart", () => ((zoomButton.style.transform = "scale(.9)", zoomButton.querySelector("img").style.transform = "scale(1.1)"), typeof action == "function" && action("zoom", {
      positive: true
    })));
    zoomButton.addEventListener("touchend", () => ((zoomButton.style.transform = "", zoomButton.querySelector("img").style.transform = ""), typeof action == "function" && action("zoom", {
      positive: false
    })));
    fireButton.addEventListener("touchstart", () => ((fireButton.style.transform = "scale(.9)", fireButton.querySelector("img").style.transform = "scale(1.1)"), typeof action == "function" && action("fire", {
      positive: true
    })));
    fireButton.addEventListener("touchend", () => ((fireButton.style.transform = "", fireButton.querySelector("img").style.transform = ""), typeof action == "function" && action("fire", {
      positive: false
    })));
    reloadButton.addEventListener("touchstart", () => ((reloadButton.style.transform = "scale(.9)", reloadButton.querySelector("img").style.transform = "scale(1.1)"), typeof action == "function" && action("reload", {
      positive: true
    })));
    reloadButton.addEventListener("touchend", () => ((reloadButton.style.transform = "", reloadButton.querySelector("img").style.transform = ""), typeof action == "function" && action("reload", {
      positive: false
    })));
    throwButton.addEventListener("touchstart", () => (typeof action == "function" && action("throw", {
      positive: true
    })));
    throwButton.addEventListener("touchend", () => (typeof action == "function" && action("throw", {
      positive: false
    })));
    ui.appendChild(movementStick);
    ui.appendChild(jumpButton);
    ui.appendChild(shootButton);
    ui.appendChild(zoomButton);
    ui.appendChild(fireButton);
    ui.appendChild(reloadButton);
    ui.appendChild(throwButton);
    this.domElement = ui;
  }
}