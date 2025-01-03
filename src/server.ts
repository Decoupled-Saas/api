import express, {Express} from "express";
import { pino } from "pino";
import compression from "compression";
import cors from "cors";
import {env} from "@/common/utils/envConfig";
import helmet from "helmet";
import rateLimiter from "@/common/middleware/rateLimiter";

const logger = pino({ name: "server start" });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set('trust proxy', true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors({ origin: [env.LANDING_CORS_ORIGIN, env.DASHBOARD_CORS_ORIGIN], credentials: true }));
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

export { app, logger };
