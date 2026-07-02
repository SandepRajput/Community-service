import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import directChatRoutes from "./src/routes/directChat.routes.js";
import communityRoutes from "./src/routes/community.routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/config/swagger.js";
import notificationRoutes from "./src/routes/notification.routes.js";

const app = express();

app.set("trust proxy", 1);
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// ─── Routes ───────────
app.use("/api/direct-chat", directChatRoutes);
app.use("/api/community", communityRoutes);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/community/notifications", notificationRoutes);

// ─── Health Check ───────
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "community-service" });
});

// ─── Global Error Handler
app.use((err, _req, res, _next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

export default app;
