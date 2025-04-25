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

const bobaTerms = [
  "Tapioca",
  "Pearl",
  "Bubble",
  "Milk",
  "Tea",
  "Matcha",
  "Taro",
  "Brown Sugar",
  "Honey",
  "Lychee",
  "Mango",
  "Strawberry",
  "Coconut",
  "Almond",
  "Oolong",
  "Jasmine",
  "Earl Grey",
  "Chai",
  "Thai",
  "Tiger",
  "Crystal",
  "Pudding",
  "Jelly",
  "Popping",
];

const getRandomElement = (array: string[]) =>
  array[Math.floor(Math.random() * array.length)];

export const generateUsername = () => {
  const randomNum = Math.floor(Math.random() * 1000);

  // Generate random boba-themed username
  const username = `${getRandomElement(adjectives)} ${getRandomElement(
    animals
  )} ${getRandomElement(bobaTerms)} ${randomNum}`;

  return username;
};
