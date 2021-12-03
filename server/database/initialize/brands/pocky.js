const pocky = {
  name: "Pocky Chocolate",
  brand: "Pocky",
  description: "The original Pocky flavor that started it all! Delicious alone with coffee, tea, milk or wine, Pocky Chocolate is the perfect every day, all occasion chocolate snack.",
  prices: [{ size: "1.41 oz", price: 1.89}, {size: "2.47 oz", price: 2.49}],
  basePrice: 1.89,
  image: "/pocky.png"
}

const pocky_chocolate_banana = {
  name: "Pocky Chocolate Banana",
  brand: "Pocky",
  description: "Two delicious flavors combine into one sweet snack. Pairing the light chocolate biscuit stick with a smooth banana flavored cream, Pocky Chocolate Banana is the perfect pick me up snack to brighten your day…or a friend’s! It’s a no mess snack packed with a fruity goodness flavor.",
  prices: [{ size: "1.41 oz", price: 1.89}, {size: "2.47 oz", price: 2.49}],
  basePrice: 1.89,
  image: "/pocky-chocolate-banana.png"
}

const pocky_cookie_cream = {
  name: "Pocky Cookie & Cream",
  brand: "Pocky",
  description: "We’ve taken the classic cookies & cream and turned it into a delicious Pocky flavor. Creamy and satisfying, Pocky Cookies & Cream perfectly balances the sweet cream. With crunchy cookie bits in every bite, this is the new twist to the classic taste.",
  prices: [{ size: "1.41 oz", price: 1.89}, {size: "2.47 oz", price: 2.49}],
  basePrice: 1.89,
  image: "/pocky-cookie-cream.png"
}

const pocky_matcha = {
  name: "Pocky Matcha Green Tea",
  brand: "Pocky",
  description: "Pocky Matcha Green Tea blends the authentic flavor of finely powdered matcha into a smooth green tea cream. Light and refreshing, it’s the perfect delicate flavor with a satisfying crunch.",
  prices: [{ size: "1.41 oz", price: 1.89}, {size: "2.47 oz", price: 2.49}],
  basePrice: 1.89,
  image: "/pocky-matcha.png"
}

const pocky_strawberry = {
  name: "Pocky Strawberry",
  brand: "Pocky",
  description: "Pocky Strawberry infuses the delicious flavor of ripe strawberries into a sweet strawberry cream for the perfect combination. This flavor is described by many as tasting like “strawberry ice cream on a stick”, but without the mess!",
  prices: [{ size: "1.41 oz", price: 1.89}, {size: "2.47 oz", price: 2.49}],
  basePrice: 1.89,
  image: "/pocky-strawberry.png"
}

const all = [pocky, pocky_chocolate_banana, pocky_cookie_cream, pocky_matcha, pocky_strawberry]

module.exports = { all }
