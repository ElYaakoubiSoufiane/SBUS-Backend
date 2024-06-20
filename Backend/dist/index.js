"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const Users_1 = __importDefault(require("./routers/Users")); // Assuming this is the correct path to your userRouter
const auth_1 = __importDefault(require("./routers/auth")); // Assuming this is the correct path to your userRouter
const Cards_1 = __importDefault(require("./routers/Cards")); // Assuming this is the correct path to your userRouter
const employees_1 = __importDefault(require("./routers/employees"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Connect to MongoDB
mongoose_1.default
  .connect(process.env.DB_URL, {})
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));
// Use the userRouter for handling user-related routes
app.use("/api/users", Users_1.default);
app.use("/api/auth", auth_1.default);
app.use("/card", Cards_1.default);
app.use("/employees", employees_1.default);
app.get("/", (req, res) => {
  res.json("heello");
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
// app.use(asyncHandler);
// app.post("/createPaymentIntent", async (req, res) => {
//   const customer = await stripe.customers.create();
//   const ephemeralKey = await stripe.ephemeralKeys.create(
//     { customer: customer.id },
//     { apiVersion: "2023-10-16" }
//   );
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: 2000,
//     currency: "mad",
//     customer: customer.id,
//     // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });
//   res.json({
//     paymentIntent: paymentIntent.client_secret,
//     ephemeralKey: ephemeralKey.secret,
//     customer: customer.id,
//     publishableKey:
//       "pk_test_51Ob3OODYnDpmKN8R8iAetLdazqre5NAGycmNADOTVCFROkUY7oqGQ1gdLrP5h4lEMfytOsnxq2uQXnubpJdmFKQA005diGufQc",
//   });
// });
// Adjust the path as necessary
// async function createCardForUser(userId, cardData) {
//   // Find the user by ID
//   const user = await User.findById(userId);
//   if (!user) throw new Error('User not found');
//   // Create a new card and link it to the user
//   const card = new Card({ ...cardData, user: user._id });
//   await card.save();
//   // Add the card to the user's cards array
//   user.cards.push(card._id);
//   await user.save();
//   return card;
// }
// app.post("/getTicket", async (req, res) => {
//   res.send(req.body);
//   console.log("-------------", req.body);
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         price_data: {
//           unit_amount: 2000,
//           product_data: {
//             name: "T-shirt",
//           },
//           currency: "usd",
//         },
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     success_url: "https://example.com/success",
//     cancel_url: "https://example.com/cancel",
//   });
//   console.log(session);
// });
// const stripe = require("stripe")(
//   "sk_test_51Ob3OODYnDpmKN8R1k7V6163qlEHFmQaVRTXXgNdTJ0oN89kQByj8cij95mG9p44G8Pj4wlYFXVjciqKHXAm1Zoo00qa4uL0GD"
// );
