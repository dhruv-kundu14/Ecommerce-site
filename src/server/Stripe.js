// const express = require("express");
// const cors = require("cors");
// const Stripe = require("stripe");

// const app = express();
// const stripe = Stripe("sk_test_51No2Y8SDuHvFxZ42LSeXhGPqqiGrEVIlOAqY6Mbn5np1DzfN1k4KV9zopKbkcrJWJZxt9BmryqHNNV3nNIEgvZE900pG4rUahB"); // Replace with your Stripe secret key

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Create Stripe Checkout Session
// app.post("/create-checkout-session", async (req, res) => {
//   const { cartItems } = req.body;

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: cartItems.map((item) => ({
//         price_data: {
//           currency: "inr",
//           product_data: {
//             name: item.name,
//             images: [item.images || "placeholder.jpg"], // Image URLs
//           },
//           unit_amount: item.price * 100, // Convert price to paise (Stripe expects amounts in cents/paise)
//         },
//         quantity: item.quantity,
//       })),
//       mode: "payment",
//       success_url: "http://localhost:3000/success", // Redirect after success
//       cancel_url: "http://localhost:3000/cancel",  // Redirect after cancellation
//     });

//     res.status(200).json({ url: session.url }); // Return session URL
//   } catch (error) {
//     console.error("Error creating checkout session:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Start Server
// const PORT = 6000;
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });


const express = require('express');
const stripe = require('stripe')('sk_test_51No2Y8SDuHvFxZ42LSeXhGPqqiGrEVIlOAqY6Mbn5np1DzfN1k4KV9zopKbkcrJWJZxt9BmryqHNNV3nNIEgvZE900pG4rUahB');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  const { cartItems } = req.body;

  // Log the cart items to check the data structure
  console.log("Received cart items:", cartItems);

  // Prepare line items for Stripe checkout
  const lineItems = cartItems.map((item) => {
    console.log("Item Name:", item.name);
    console.log("Item Image URL:", item.images); // Debugging the image URL

    return {
      price_data: {
        currency: 'inr', // Use the desired currency
        product_data: {
          name: item.name,
          images: [item.images], // Ensure this is an array with a valid image URL
        },
        unit_amount: item.price * 100, // Stripe expects price in the smallest unit (e.g., cents)
      },
      quantity: item.quantity,
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment', // You can use 'subscription' for recurring payments
      success_url: 'http://localhost:3000/success', // Success URL
      cancel_url: 'http://localhost:3000/cancel', // Cancel URL
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error: ", error);
    res.status(500).send("Internal Server Error");
  }
});



app.listen(5001, () => {
  console.log('Server is running on port 5001');
});
