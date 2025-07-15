const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));
// Routes

// 1. Be Polite, Greet the User
app.get("/greetings/:userName", (req, res) => {
  res.send(
    `Hello there, ${req.params.userName}! What a pleasure to serve you again!`
  );
});

// 2. Rolling the Dice
app.get("/roll/:number", (req, res) => {
  if (!Number(req.params.number)) {
    res.send("You must specify a number");
  } else {
    const result = Math.floor(Math.random() * req.params.number);
    res.send(`You rolled a ${result}`);
  }
});

//3. I Want THAT One!
const collectibles = [
  { name: "shiny ball", price: 5.95 },
  { name: "autographed picture of a dog", price: 10 },
  { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];

app.get("/collectibles/:index", (req, res) => {
  if (!collectibles[req.params.index]) {
    res.send("This item is not yet in stock. Check back soon!");
  } else {
    const item = collectibles[req.params.index];
    res.send(`The ${item.name} will set up back ${item.price}`);
  }
});
// 4. Filter Shoes by Query Parameters
const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];

app.get("/shoes", (req, res) => {
  const { type, minPrice, maxPrice } = req.query;
  if (!type || !minPrice || !maxPrice) {
    //Used OR operator so if any parameter was missing it would return the whole list
    return res.send(shoes);
  }
  const results = shoes.filter((shoe) => {
    if (
      shoe.type === type &&
      shoe.price <= maxPrice &&
      shoe.price >= minPrice
    ) {
      return shoe;
    }
  });
  res.send(results);
});

//Listen
app.listen(3000, () => {
  console.log("listening on port 3000");
});
