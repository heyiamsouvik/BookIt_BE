const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const userApis = require("./routes/user.routes.js");
const adminApis = require("./routes/admin.routes.js");
const experienceApis = require("./routes/experience.routes.js");
const bookingRoutes = require("./routes/booking.routes.js");
const validateRoutes = require("./routes/promo.routes.js");
const slotRoutes = require("./routes/slot.routes");


// Load environment variables from .env file
dotenv.config();

// Validate required env vars
const FE_LINK = process.env.FE_WEBSITE_LINK;
const PORT = process.env.PORT || 6060;

if (!FE_LINK) {
  throw new Error("Missing FE_WEBSITE_LINK in .env");
}

const app = express();

// Middleware
app.use(cors({
  origin: FE_LINK,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());



//DataBase Connection
connectDB();

// Routes
app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

//user login & reg 
app.use("/api/v1/user", userApis); //ok

// for adminm use
app.use("/api/v1/admin", adminApis); 


app.use("/api/v1/experience",experienceApis ); //ok


app.use("/api/v1/slot", slotRoutes);

app.use("/api/v1/booking", bookingRoutes);


app.use("/api/v1/promo", validateRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});