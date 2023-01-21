function Mail(to, from, message, callback) {
  this.send = function() {
    (async () => {
      let e = !1;
      const t = Parse.Object.extend("User");
      const n = new Parse.Query(t);
      const s = await n.find();
      let lobbies = [];
      let pause = false;
      for (let t = 0; t < s.length; t++) {
        let ot = t;
        const n = Parse.Object.extend("User");
        new Parse.Query(n).get(s[t].id).then((t => {
          if (t.get("tuser") == to.trim()) {
            Parse.User.logIn(t.get("tuser"), t.get("tpass")).then((user) => {
              let inbox = user.get("mail");
              inbox.push({
                "sender": from,
                "message": message
              });
              user.set("mail", inbox);
              user.save().then(() => callback());
            });
          }
        }));
      }
    })();
  }
}