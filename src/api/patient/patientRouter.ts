import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { patientController } from "@/api/patient/patientController";
import { CreatePatientSchema, PatientSchema } from "@/api/patient/patientModel";
import { validateRequest } from "@/common/utils/httpHandlers";

export const patientRegistry = new OpenAPIRegistry();
export const patientRouter: Router = express.Router();

patientRegistry.register("Patient", PatientSchema);

// Create a new patient
patientRegistry.registerPath({
  method: "post",
  path: "/patient",
  tags: ["Patient"],
  request: {
    body: {
      content: { "application/json": { schema: PatientSchema } },
    },
  },
  responses: createApiResponse(PatientSchema, "Success"),
});
patientRouter.post("/", validateRequest(CreatePatientSchema), patientController.add);

// Get all patient
patientRegistry.registerPath({
  method: "get",
  path: "/patient",
  tags: ["Patient"],
  responses: createApiResponse(z.array(PatientSchema), "Success"),
});
patientRouter.get("/", patientController.findAll);

// Get a patient by ID
patientRegistry.registerPath({
  method: "get",
  path: "/patient/{id}",
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
patientRouter.get("/:id", patientController.findById);

// Update a patient by ID
patientRegistry.registerPath({
  method: "patch",
  path: "/patient/{id}",
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
patientRouter.patch("/:id", patientController.updateById);

// Delete a patient by ID
patientRegistry.registerPath({
  method: "delete",
  path: "/patient/{id}",
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
patientRouter.delete("/:id", patientController.deleteById);
