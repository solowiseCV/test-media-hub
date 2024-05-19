import express, {Router} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import errorHandler from './middlewares/error/error.middleware.js';
import database from './database/connection.js';
import baseRoute from './routes/index.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from "express-session";
import passport from "passport";
import googleAuthMiddleware from "./middlewares/authentication/googleAuthMiddleware.js";
import googleAuthRoutes from "./routes/authentication/googleAuthRoutes.js";

dotenv.config();

const app = express();
 
const router = Router();
const rootRouter = baseRoute(router);


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());


// Configuring express-session middleware
app.use(
  session({
    name: "google-auth-session",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Database connection function
// database();

// Apply Google OAuth authentication
googleAuthMiddleware(app);

// route for home page
app.get("/", (req, res) => {
  res.send("Welcome to MediaHub, Please sign up or log in to continue");
});

// Use home route for Google authentication route
app.use("/", googleAuthRoutes);


// routes
app.use("/api/v1", rootRouter);
app.use('*', (req, res) => {
    res.status(404).send('Resource URL not found');
  });


//Error middleware
app.use(errorHandler);


//Database connection function
  database();

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
     console.log(`Server running on port ${PORT} 🔥 ` );
});
