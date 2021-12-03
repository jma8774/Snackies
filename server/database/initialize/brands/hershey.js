const hershey_milk = {
  name: "HERSHEY Milk Chocolate Candy Bar",
  brand: "Hershey",
  description: "There’s happy, and then there’s HERSHEY’S Happy. These HERSHEY’S Chocolate Bars makes life delicious. Unwrap a bar, break off a piece, savor and repeat.",
  prices: [{ size: "1.55 oz", price: 0.88}, {size: "2.6 oz", price: 1.48}, { size: "4.4 oz", price: 1.79}],
  basePrice: 0.88,
  image: "/hershey-milk.png"
}

const hershey_almond = {
  name: "HERSHEY Milk Chocolate with Almonds Candy Bar",
  brand: "Hershey",
  description: "These are more than just candy bars. They’re chances to stop and savor life’s sweeter side. Each bite is filled with crunchy whole almonds and classic HERSHEY’S Milk Chocolate.",
  prices: [{ size: "1.55 oz", price: 0.88}, {size: "2.6 oz", price: 1.48}, { size: "4.4 oz", price: 1.79}],
  basePrice: 0.88,
  image: "/hershey-almond.png"
}

const hershey_cookie_creme = {
  name: "HERSHEY Cookies & Creme Candy Bar",
  brand: "Hershey",
  description: "If you love chocolate (or cookies and cream ice cream), then you’ll appreciate the delicious combination of crunchy chocolate cookie bits and smooth white creme. HERSHEY'S COOKIES 'N' CREME Candy Bars pack this classic flavor combo into each delicious bite.",
  prices: [{ size: "1.55 oz", price: 0.88}, {size: "2.6 oz", price: 1.48}, { size: "4.4 oz", price: 1.79}],
  basePrice: 0.88,
  image: "/hershey-cookie-creme.png"
}

const hershey_special_dark = {
  name: "HERSHEY Special Dark Sweet Chocolate Candy Bar",
  brand: "Hershey",
  description: "When a candy bar features the words “HERSHEY’S,” and “SPECIAL” on its sleeve, you know it’s going to be awesome. That degree of pleasure is special even by HERSHEY'S high standards.",
  prices: [{ size: "1.55 oz", price: 0.88}, {size: "2.6 oz", price: 1.48}, { size: "4.4 oz", price: 1.79}],
  basePrice: 0.88,
  image: "/hershey-special-dark.png"
}

const all = [hershey_milk, hershey_almond, hershey_cookie_creme, hershey_special_dark]

module.exports = { all }
