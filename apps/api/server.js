import express from "express";
import dotenv from "dotenv";
import { prisma } from "./prisma/prismaClient.js";
import cors from "cors";
import helmet from "helmet";
import router from "./routes/auth-route.js";
import cookieParser from "cookie-parser";
import mediaRoutes from "./routes/mediaRoutes.js";
dotenv.config({ path: ".env.local" });

const app = express();
const port = process.env.PORT || 3000;
console.log("clienturl", process.env.CLIENT_URL);

app.use(helmet());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: [
        "'self'",
        "data:",
        "https://res.cloudinary.com",
        "https://*.amazonaws.com",
      ],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
    },
  }),
);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", router);
app.use("/api/media", mediaRoutes);

app.listen(port, () => console.log(`listening on port ${port}`));
