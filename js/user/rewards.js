function Reward(title, description, type, gift) {
  if (type == "points") {
    let reward = {
      title: title,
      description: description,
      gift: {
        type: "points",
        item: "",
        value: gift
      }
    };
    let metadata = userMan.get("metadata");
    let rewards = metadata.rewards;
    rewards.push(reward);
    userMan.set("metadata", metadata, () => {}, ["tuser", "tpass"]);
  } else {
    let reward = {
      title: title,
      description: description,
      gift: {
        type: "",
        item: type,
        value: gift
      }
    };
    let metadata = userMan.get("metadata");
    let rewards = metadata.rewards;
    rewards.push(reward);
    userMan.set("metadata", metadata, () => {}, ["tuser", "tpass"]);
  }
}