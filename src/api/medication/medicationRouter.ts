import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { GetMedicationSchema, MedicationSchema } from "@/api/medication/medicationModel";
import { validateRequest } from "@/common/utils/httpHandlers";
import { treatmentController } from "./medicationController";

export const medicationRegistry = new OpenAPIRegistry();
export const medicationRouter: Router = express.Router();

medicationRegistry.register("Medication", MedicationSchema);

// Create a new medication
medicationRegistry.registerPath({
  method: "post",
  path: "/medication",
  tags: ["Medication"],
  request: {
    body: {
      content: { "application/json": { schema: MedicationSchema } },
    },
  },
  responses: createApiResponse(MedicationSchema, "Success"),
});
medicationRouter.post("/", validateRequest(GetMedicationSchema), treatmentController.createMedication);

// Get all medication
medicationRegistry.registerPath({
  method: "get",
  path: "/medication",
  tags: ["Medication"],
  responses: createApiResponse(z.array(MedicationSchema), "Success"),
});
medicationRouter.get("/", treatmentController.getAllMedication);

// Get a medication by ID
medicationRegistry.registerPath({
  method: "get",
  path: "/medication/{id}",
  tags: ["Medication"],
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
  responses: createApiResponse(MedicationSchema, "Success"),
});
medicationRouter.get("/:id", treatmentController.getAllMedication);

// Update a medication by ID
medicationRegistry.registerPath({
  method: "patch",
  path: "/medication/{id}",
  tags: ["Medication"],
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
      content: { "application/json": { schema: MedicationSchema } },
    },
  },
  responses: createApiResponse(MedicationSchema, "Success"),
});
medicationRouter.patch("/:id", treatmentController.updateMedicationById);

// Delete a medication by ID
medicationRegistry.registerPath({
  method: "delete",
  path: "/medication/{id}",
  tags: ["Medication"],
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
medicationRouter.delete("/:id", treatmentController.deleteMedicationById);
