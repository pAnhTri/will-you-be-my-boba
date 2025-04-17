const adjectives = [
  "Fluffy",
  "Sparkly",
  "Wiggly",
  "Cheeky",
  "Bouncy",
  "Jolly",
  "Zesty",
  "Peppy",
  "Snuggly",
  "Whimsy",
  "Chubby",
  "Nifty",
  "Cozy",
  "Lively",
  "Giggly",
  "Sunny",
  "Feisty",
  "Bubbly",
  "Slinky",
  "Stinky",
  "Evil",
  "Boop the",
  "Sleepy",
];

const animals = [
  "Panda",
  "Bunny",
  "Kitten",
  "Fox",
  "Otter",
  "Dolphin",
  "Koala",
  "Llama",
  "Penguin",
  "Husky",
  "Duckling",
  "Pupper",
  "Chick",
  "Froggy",
  "Turtle",
  "Pony",
  "Squirrel",
  "Bee",
  "Chicken",
  "Human",
  "Chameleon",
  "Puppy",
  "Horsey",
  "Boba",
];

const getRandomElement = (array: string[]) =>
  array[Math.floor(Math.random() * array.length)];

const getBrowserName = () => {
  const userAgent = navigator.userAgent;

  if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
    return "Chrome";
  } else if (userAgent.includes("Edg")) {
    return "Edge";
  } else if (userAgent.includes("Firefox")) {
    return "Firefox";
  } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
    return "Safari";
  } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
    return "Opera";
  } else if (userAgent.includes("MSIE") || userAgent.includes("Trident")) {
    return "Internet Explorer";
  } else {
    return "Unknown";
  }
};

const generateUsername = () => {
  const userAgent = getBrowserName().slice(0, 3);
  const randomNum = Math.floor(Math.random() * 1000);

  // Generate random cutesy username
  const username = `${getRandomElement(adjectives)} ${getRandomElement(
    animals
  )} ${userAgent} ${randomNum}`;

  return username;
};

export default generateUsername;
