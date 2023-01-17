typeof Parse == "undefined" && import("https://npmcdn.com/parse/dist/parse.min.js");
Parse.initialize("NTR81WnvZ9NPy2JNigjx1OQS9BG41TrmSHD6z2ap", "4xIHZYPRyPpBcBR7bQOY3IKV1VlCFbZRoH6hSrp7");
Parse.serverURL = "https://parseapi.back4app.com/";
Chat = new Parse.Object.extend("Chat");
chat = {};
(async () => {
  function getHistory() {
    return new Promise(function(resolve, reject) {
      (async() => {
        let e = !1;
        const t = Parse.Object.extend("Chat");
        const n = new Parse.Query(t);
        const s = await n.find();
        for (let t = 0; t < s.length; t++) {
          const n = Parse.Object.extend("Chat");
          new Parse.Query(n).get(s[t].id).then((t => {
            resolve(t);
          }));
        }
      })();
    });
  }
  chat.add = function() {
    getHistory().then((chistory) => {
      let prefix = !chistory.get("history") ? "" : ",";
      let message = prefix + encodeURIComponent(arguments[0].toString().trim());
      chistory.set("history", chistory.get("history") + message);
      chistory.save();
    });
  }
  chat.get = function(callback) {
    (async() => {
      let e = !1;
      const t = Parse.Object.extend("Chat");
      const n = new Parse.Query(t);
      const s = await n.find();
      for (let t = 0; t < s.length; t++) {
        const n = Parse.Object.extend("Chat");
        new Parse.Query(n).get(s[t].id).then((t => {
          callback(t.get("history"));
        }));
      }
    })();
  }
  chat.truncate = function(length) {
    getHistory().then((chistory) => {
      let messages = chistory.get("history").split(",");
      console.log(messages)
      messages = messages.slice(messages.length - length, messages.length);
      console.log(messages)
      chistory.set("history", messages.join(","));
    });
  }
})();