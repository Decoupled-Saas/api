import errorHandler from "@/common/middleware/errorHandler";
import rateLimiter from "@/common/middleware/rateLimiter";
import { env } from "@/common/utils/envConfig";
import { logger } from "@/common/utils/logger";
import routes from "@/routes";
import compression from "compression";
import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import morgan from "morgan";

const app: Express = express();
const morganFormat = ":method :url :status :res[content-length] - :response-time ms"; // Customize format

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Request logging
app.use(morgan(morganFormat, { stream: logger.stream }));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// @ts-ignore
app.use(compression());
app.use(cors({ origin: [env.LANDING_CORS_ORIGIN, env.DASHBOARD_CORS_ORIGIN], credentials: true }));
app.use(helmet());
app.use(rateLimiter);

// Routes
app.get("/", (req, res) => {
  res.redirect("/api/latest/docs");
});

app.use("/api", routes);

// Error handlers
app.use(errorHandler());

export { app, logger };
