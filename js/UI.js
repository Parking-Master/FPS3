UI = function(type) {
  this.action = null;
  if (type == "touch") {
    let ui = document.createElement("div");
    let movementStick = document.createElement("div");
    movementStick.style = `
    position: absolute;
    left: 100px;
    bottom: 100px;
    margin: 0;
    border: 3px solid #fff;
    border-radius: 100%;
    width: 100px;
    height: 100px;
    `;
    let previousTouch = null;
    movementStick.addEventListener("touchmove", function(event) {
      event.preventDefault();
      camera.rotation.order = "YXZ";
      if (previousTouch && (Math.PI / 2).toFixed(12) - 0 != Math.abs(camera.rotation.x.toFixed(12) - 0)) {
        camera.rotation.y -= (event.touches[0].pageX - previousTouch.pageX) / (500 / this.speed);
        camera.rotation.x -= (event.touches[0].pageY - previousTouch.pageY) / (500 / this.speed);
      }
      previousTouch = event.touches[0];
      if (event.target == movementStick) {
        let x = event.touches[0].pageX - movementStick.getBoundingClientRect().left;
        let y = event.touches[0].pageY - movementStick.getBoundingClientRect().top;
        let position = x <= 50 && y <= 100 ? "forward" : x <= 100 && y <= 0 ? "forward-right" : x >= -100 && y >= -50 ? "right" : x <= 50 && y <= 100 ? "backward-right" : x <= 50 && y >= 100 ? "backward" : "";
        console.log(position, x, y);
        typeof this.action == "function" && this.action("move", [(event.touches[0].pageX - previousTouch.pageX), (event.touches[0].pageY - previousTouch.pageY)]);
      }
    });
    movementStick.addEventListener("touchend", function() {
      previousTouch = null;
    });
    ui.appendChild(movementStick);
    this.domElement = ui;
  }
}