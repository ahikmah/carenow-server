import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { medicationController } from "@/api/medication/medicationController";
import { CreateMedicationSchema, MedicationSchema } from "@/api/medication/medicationModel";
import { validateRequest } from "@/common/utils/httpHandlers";

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
medicationRouter.post("/", validateRequest(CreateMedicationSchema), medicationController.add);

// Get all medication
medicationRegistry.registerPath({
  method: "get",
  path: "/medication",
  tags: ["Medication"],
  responses: createApiResponse(z.array(MedicationSchema), "Success"),
});
medicationRouter.get("/", medicationController.findAll);

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
medicationRouter.get("/:id", medicationController.findById);

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
medicationRouter.patch("/:id", medicationController.updateById);

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
medicationRouter.delete("/:id", medicationController.deleteById);
