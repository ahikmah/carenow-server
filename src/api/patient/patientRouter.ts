import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { GetPatientSchema, PatientSchema } from "@/api/patient/patientModel";
import { validateRequest } from "@/common/utils/httpHandlers";
import { patientController } from "./patientController";

export const patientRegistry = new OpenAPIRegistry();
export const patientRouter: Router = express.Router();

patientRegistry.register("Patient", PatientSchema);

// Create a new patient
patientRegistry.registerPath({
  method: "post",
  path: "/patients",
  tags: ["Patient"],
  request: {
    body: {
      content: { "application/json": { schema: PatientSchema } },
    },
  },
  responses: createApiResponse(PatientSchema, "Success"),
});
patientRouter.post("/", validateRequest(GetPatientSchema), patientController.createPatient);

// Get all patients
patientRegistry.registerPath({
  method: "get",
  path: "/patients",
  tags: ["Patient"],
  responses: createApiResponse(z.array(PatientSchema), "Success"),
});
patientRouter.get("/", patientController.getAllPatients);

// Get a patient by ID
patientRegistry.registerPath({
  method: "get",
  path: "/patients/{id}",
  tags: ["Patient"],
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: {
        type: "string",
        format: "uuid",
      },
    },
  ],
  responses: createApiResponse(PatientSchema, "Success"),
});
patientRouter.get("/:id", patientController.getPatientById);

// Update a patient by ID
patientRegistry.registerPath({
  method: "patch",
  path: "/patients/{id}",
  tags: ["Patient"],
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: {
        type: "string",
        format: "uuid",
      },
    },
  ],
  request: {
    body: {
      content: { "application/json": { schema: PatientSchema } },
    },
  },
  responses: createApiResponse(PatientSchema, "Success"),
});
patientRouter.patch("/:id", patientController.updatePatientById);

// Delete a patient by ID
patientRegistry.registerPath({
  method: "delete",
  path: "/patients/{id}",
  tags: ["Patient"],
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: {
        type: "string",
        format: "uuid",
      },
    },
  ],
  responses: createApiResponse(z.boolean(), "Success", 200),
});
patientRouter.delete("/:id", patientController.deletePatientById);
