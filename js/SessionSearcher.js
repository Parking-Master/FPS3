(async () => {
  await import("https://npmcdn.com/parse@3.4.4/dist/parse.min.js");
  
  Parse.initialize("NTR81WnvZ9NPy2JNigjx1OQS9BG41TrmSHD6z2ap", "4xIHZYPRyPpBcBR7bQOY3IKV1VlCFbZRoH6hSrp7");
  Parse.serverURL = "https://parseapi.back4app.com/";
  
  window.Session = {
    create: async function(query) {
      let extend = new Parse.Object.extend("Lobby");
      let lobby = new extend();
      lobby.set("query", query);
      lobby.set("sessionId", Session.generateId());
      await lobby.save();
      window.currentObjectId = lobby.id;
    },
    search: function() {
      return new Promise(function(resolve, reject) {
        (async () => {
          let e = !1;
          const t = Parse.Object.extend("Lobby");
          const n = new Parse.Query(t);
          const s = await n.find();
          let lobbies = [];
          let pause = false;
          for (let t = 0; t < s.length; t++) {
            let ot = t;
            const n = Parse.Object.extend("Lobby");
            new Parse.Query(n).get(s[t].id).then((t => {
              const n = { name: t.get("name"), query: t.get("query"), sessionId: t.get("sessionId") };
              n.query.sessionId = n.sessionId;
              n.query.users = 2;
              if (e) {
                lobbies.push(n.query);
              } else {
                lobbies.push(n.query);
                e = !0;
              }
              resolve(lobbies);
            }));
          }
        })();
      });
    },
    cancel: function() {
      let promise = new Promise(function(resolve, reject) {
        (async () => {
          let e = !1;
          const t = Parse.Object.extend("Lobby");
          const n = new Parse.Query(t);
          const s = await n.find();
          let lobbies = [];
          let pause = false;
          for (let t = 0; t < s.length; t++) {
            let ot = t;
            const n = Parse.Object.extend("Lobby");
            new Parse.Query(n).get(s[t].id).then((t => {
              const n = { name: t.get("name"), query: t.get("query"), sessionId: t.get("sessionId") };
              n.query.sessionId = n.sessionId;
              n.query.users = 2;
              n.query.objectId = t.get("objectId");
              if (e) {
                lobbies.push(n.query);
              } else {
                lobbies.push(n.query);
                e = !0;
              }
              resolve(lobbies);
            }));
          }
        })();
      });
      promise.then(lobby => {
        console.log(lobby)
        lobby.forEach(i => {
          Session.getIds().forEach(x => {
            if (i.sessionId == x) {
              let extend = new Parse.Object.extend("Lobby");
              let lobby = new extend();
              lobby.set("objectId", i.objectId);
              lobby.destroy();
            }
          });
        });
      });
    },
    getIds: function() {
      let clone = Session.cache.ids;
      clone.forEach(x => clone[clone.indexOf(x)] = x - 0);
      return clone.filter(filter => filter);
    },
    generateId: function() {
      let id = crypto.getRandomValues(new Uint16Array(1))[0];
      let push = (localStorage["SessionIds"] || "").split(",");
      push.push(id);
      push = push.join(",");
      localStorage.setItem("SessionIds", push);
      Session.update();
      return id;
    },
    cache: {
      ids: []
    }
  };
  Session.update = function() {
    if (localStorage["SessionIds"]) {
      localStorage["SessionIds"].split(",").forEach(x => Session.cache.ids.push(x));
    } else {
      Session.cache.ids = [];
    }
  }
  Session.clearCache = function() {
    if (localStorage["SessionIds"]) {
      localStorage.removeItem("SessionIds");
      Session.update();
    }
  }
  Session.update();
})();