// server.js
const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const app = express();
const stripe = Stripe("sk_test_51No2Y8SDuHvFxZ42LSeXhGPqqiGrEVIlOAqY6Mbn5np1DzfN1k4KV9zopKbkcrJWJZxt9BmryqHNNV3nNIEgvZE900pG4rUahB");

app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const { cartItems } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.images], // Use valid image URLs
          },
          unit_amount: item.price * 100, // Amount in cents
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "http://localhost:3000/success", // Your success URL
      cancel_url: "http://localhost:3000/cancel",  // Your cancel URL
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create session" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
