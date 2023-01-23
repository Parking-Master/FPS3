let helpList = {};
fetch("js/help/help.json").then(response => response.json()).then(e => helpList = e);
function help(text = null) {
  if (typeof helpKeyUp == "undefined") helpKeyUp = 0;
  if (!text) {
    let help = document.createElement("div");
    help.innerHTML = `
    <input class="help-input" type="text" placeholder="How do I start a game?" onkeyup="event.preventDefault(), oldText = this.value, clearTimeout(helpKeyUp), helpKeyUp = setTimeout(() => (this.value.trim() && help(this.value.trim())), 400)">
    `;
    swal({
      title: "Help center",
      text: "What do you need help with?",
      content: help,
      button: "Close"
    });
  } else {
    text = document.querySelector(".help-input").value.toString().toLowerCase().trim();
    document.querySelectorAll("details").forEach(x => x.remove());
    document.querySelectorAll("#notfound").forEach(x => x.remove());
    let responses = [];
    let content = "";
    for (let i = 0; i < Object.keys(helpList).length; i++) {
      let helpResponse = Object.keys(helpList)[i].toString().toLowerCase().trim();
      helpResponse.split(" ").forEach(helpText => {
        text.split(" ").forEach(text => {
          if (helpText.toLowerCase().trim().includes(text.toLowerCase().trim())) {
            responses.push(`
            <details class="help-list-item" style="border-bottom: 1px  solid #333">
              <summary>
                ${Object.keys(helpList)[i].replace(new RegExp(text, "gi"), `<span class="highlight" style="background: yellow">${text}</span>`)}
              </summary>
              <iframe src="data:text/html,${encodeURIComponent(`
                <style>
                  @font-face {
                    font-family: "Roboto";
                    src: url(fonts/Roboto.ttf);
                  }
                  html, body {
                    font-family: "Roboto", Arial, Helvetica, sans-serif;
                    color: #333;
                    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
                  }
                  a {
                    color: #444;
                  }
                </style>
                ${Object.values(helpList)[i]}
                `)}" style="width: 100%; border: none; outline: none; border-bottom: 2px solid #ddd"></iframe>
              </details>
            `);
          }
        });
      });
    }
    if (responses.length < 1) {
      responses.push(`<i id="notfound">No results</i>`);
    }
    responses = [... new Set(responses)];
    responses.forEach((x) => {
      content.includes(x) || (content += x);
    });
    document.querySelector(".swal-content").innerHTML += content;
    document.querySelector(".help-input").value = text;
    document.querySelector(".help-input").focus();
    setInterval(() => {
      for (let i = 0; i < document.querySelectorAll("summary").length; i++) {
        if (document.querySelectorAll("summary")[i - 1]) {
          if (document.querySelectorAll("summary")[i - 1].textContent.toLowerCase().trim() == document.querySelectorAll("summary")[i].textContent.toLowerCase().trim()) {
            document.querySelectorAll("summary")[i - 1].parentElement.remove();
          }
        }
      }
    }, 200);
  }
}