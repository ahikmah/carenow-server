import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";

import { openAPIRouter } from "@/api-docs/openAPIRouter";
import { doctorRouter } from "@/api/doctor/doctorRouter";
import { mcuRouter } from "@/api/mcu/mcuRouter";
import { medicationRouter } from "@/api/medication/medicationRouter";
import { patientRouter } from "@/api/patient/patientRouter";
import { treatmentRouter } from "@/api/treatment/treatmentRouter";

import errorHandler from "@/common/middleware/errorHandler";
import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/common/middleware/requestLogger";
import { env } from "@/common/utils/envConfig";

const logger = pino({ name: "server start" });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

// Routes
app.use("/doctor", doctorRouter);
app.use("/patient", patientRouter);
app.use("/medication", medicationRouter);
app.use("/treatment", treatmentRouter);
app.use("/mcu", mcuRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
