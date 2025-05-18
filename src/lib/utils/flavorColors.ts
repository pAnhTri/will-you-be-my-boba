// Color mappings for different flavor categories
const flavorColorMap: Record<string, string> = {
  // Fruit flavors
  Strawberry: "bg-pink-100 text-pink-700 ring-pink-200",
  Blueberry: "bg-blue-100 text-blue-700 ring-blue-200",
  Mango: "bg-orange-100 text-orange-700 ring-orange-200",
  Pineapple: "bg-yellow-100 text-yellow-700 ring-yellow-200",
  Lychee: "bg-red-100 text-red-700 ring-red-200",
  Passionfruit: "bg-purple-100 text-purple-700 ring-purple-200",
  Peach: "bg-orange-100 text-orange-700 ring-orange-200",
  Orange: "bg-orange-100 text-orange-700 ring-orange-200",
  Grapefruit: "bg-pink-100 text-pink-700 ring-pink-200",
  Banana: "bg-yellow-100 text-yellow-700 ring-yellow-200",
  Avocado: "bg-green-100 text-green-700 ring-green-200",
  Acai: "bg-purple-100 text-purple-700 ring-purple-200",

  // Tea flavors
  Matcha: "bg-green-100 text-green-700 ring-green-200",
  Genmaicha: "bg-amber-100 text-amber-700 ring-amber-200",
  Oolong: "bg-amber-100 text-amber-700 ring-amber-200",
  "Four Season": "bg-amber-100 text-amber-700 ring-amber-200",

  // Dairy/Milk flavors
  Milk: "bg-gray-100 text-gray-700 ring-gray-200",
  Latte: "bg-gray-100 text-gray-700 ring-gray-200",
  Creamy: "bg-gray-100 text-gray-700 ring-gray-200",

  // Sweet flavors
  "Brown Sugar": "bg-amber-100 text-amber-700 ring-amber-200",
  Vanilla: "bg-amber-100 text-amber-700 ring-amber-200",
  Chocolate: "bg-amber-100 text-amber-700 ring-amber-200",
  Taro: "bg-purple-100 text-purple-700 ring-purple-200",

  // Tropical flavors
  Tropical: "bg-orange-100 text-orange-700 ring-orange-200",
  Coconut: "bg-amber-100 text-amber-700 ring-amber-200",

  // Floral flavors
  Rose: "bg-pink-100 text-pink-700 ring-pink-200",
  Hibiscus: "bg-pink-100 text-pink-700 ring-pink-200",
  Floral: "bg-pink-100 text-pink-700 ring-pink-200",

  // Citrus flavors
  Citrusy: "bg-yellow-100 text-yellow-700 ring-yellow-200",
  Zesty: "bg-yellow-100 text-yellow-700 ring-yellow-200",
  Tangy: "bg-yellow-100 text-yellow-700 ring-yellow-200",
  Tart: "bg-yellow-100 text-yellow-700 ring-yellow-200",

  // Texture/Feel flavors
  Smooth: "bg-gray-100 text-gray-700 ring-gray-200",
  Watery: "bg-blue-100 text-blue-700 ring-blue-200",
  Refreshing: "bg-blue-100 text-blue-700 ring-blue-200",

  // Aroma flavors
  Aromatic: "bg-amber-100 text-amber-700 ring-amber-200",
  Toasty: "bg-amber-100 text-amber-700 ring-amber-200",
  Roasted: "bg-amber-100 text-amber-700 ring-amber-200",
  Malty: "bg-amber-100 text-amber-700 ring-amber-200",
  Nutty: "bg-amber-100 text-amber-700 ring-amber-200",
  Earthy: "bg-amber-100 text-amber-700 ring-amber-200",
  Grassy: "bg-green-100 text-green-700 ring-green-200",

  // Intensity flavors
  Bold: "bg-gray-800 text-white ring-gray-600",
  Rich: "bg-gray-800 text-white ring-gray-600",
  Bright: "bg-yellow-100 text-yellow-700 ring-yellow-200",
  Warm: "bg-orange-100 text-orange-700 ring-orange-200",
  Comforting: "bg-orange-100 text-orange-700 ring-orange-200",
};

// Default color for flavors not in the map
const defaultColor = "bg-gray-100 text-gray-700 ring-gray-200";

/**
 * Get the appropriate color classes for a flavor
 * @param flavor The flavor to get colors for
 * @returns Tailwind CSS classes for the flavor
 */
export const getFlavorColor = (flavor: string): string => {
  return flavorColorMap[flavor] || defaultColor;
};

/**
 * Get all available flavor colors
 * @returns Record of all flavor colors
 */
export const getAllFlavorColors = (): Record<string, string> => {
  return flavorColorMap;
};
