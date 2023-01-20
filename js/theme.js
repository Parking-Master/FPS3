registeredPages = {};
function registerPage(src, elements) {
  registeredPages[src] = elements;
}

// Register pages (add more for more themes)
registerPage("index.html", {
  "body": {
    color: "#333",
    type: "background"
  },
  ".main-title": {
    color: "#333",
    type: "color"
  },
  ".secondary-title": }
    color: "#333",
  "img": "light"
});

// Theme functions
window.addEventListener("load", () => {
  Object.keys(registeredPages).forEach(page => {
    let path = location.pathname == "/" ? "index.html" : location.pathname;
    if (path.endsWith(page.toString().trim())) {
      Object.keys(registeredPages[page]).forEach(element => {
        if (document.querySelector(element).nodeName == "IMG") {
          document.querySelectorAll(element).forEach(i => {
            if (getComputedStyle(i).filter.includes("invert")) {
              let g = i.style.filter.split(" ");
              g.forEach(x => {
                if (x.includes("invert(")) {
                  g[g.indexOf(x.trim())] = `invert(${registeredPages[page][element] == "light" ? (100 - (x.split("invert(").pop().split("%)")[0] - 0)) : "0"}%)`;
                }
              });
              g = g.join(" ");
              i.style.filter = g;
            } else {
              i.style.filter += registeredPages[page][element] == "light" ? " invert(100%)" : " invert(0%)";
            }
          });
        } else if (document.querySelector(element).textContent.trim() && /BODY|HTML/gi.test(document.querySelector(element).nodeName)) {
          document.querySelectorAll(element).forEach(i => (i.style.color = registeredPages[page][element] == "dark" ? "#333" : "#fff"));
        } else {
          document.querySelectorAll(element).forEach(i => (i.style.backgroundColor = registeredPages[page][element] == "dark" ? "#333" : "#fff"));
        }
      });
    }
  });
});