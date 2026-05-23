import { generateUploadUrl } from "../controllers/mediaController.js";
import { requiredAuth } from "../middlewares/authMiddleware.js";
import { apiLimiter } from "../middlewares/rate-limiter.js";
import router from "./auth-route.js";

router.post(
  "/generate-upload-url",
  apiLimiter, // unlimited presigned url upload nahi kar paoge babu
  requiredAuth, // Bina authenticate huye media upload nahi kar paoge
  generateUploadUrl,
);

export default router;
