import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { treatmentController } from "@/api/treatment/treatmentController";
import { CreateTreatmentSchema, TreatmentSchema } from "@/api/treatment/treatmentModel";
import { validateRequest } from "@/common/utils/httpHandlers";

export const treatmentRegistry = new OpenAPIRegistry();
export const treatmentRouter: Router = express.Router();

treatmentRegistry.register("Treatment", TreatmentSchema);

// Create a new treatment
treatmentRegistry.registerPath({
  method: "post",
  path: "/treatment",
  tags: ["Treatment"],
  request: {
    body: {
      content: { "application/json": { schema: TreatmentSchema } },
    },
  },
  responses: createApiResponse(TreatmentSchema, "Success"),
});
treatmentRouter.post("/", validateRequest(CreateTreatmentSchema), treatmentController.add);

// Get all treatments
treatmentRegistry.registerPath({
  method: "get",
  path: "/treatment",
  tags: ["Treatment"],
  responses: createApiResponse(z.array(TreatmentSchema), "Success"),
});
treatmentRouter.get("/", treatmentController.findAll);

// Get a treatment by ID
treatmentRegistry.registerPath({
  method: "get",
  path: "/treatment/{id}",
  tags: ["Treatment"],
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
  responses: createApiResponse(TreatmentSchema, "Success"),
});
treatmentRouter.get("/:id", treatmentController.findById);

// Update a treatment by ID
treatmentRegistry.registerPath({
  method: "patch",
  path: "/treatment/{id}",
  tags: ["Treatment"],
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
      content: { "application/json": { schema: TreatmentSchema } },
    },
  },
  responses: createApiResponse(TreatmentSchema, "Success"),
});
treatmentRouter.patch("/:id", treatmentController.updateById);

// Delete a treatment by ID
treatmentRegistry.registerPath({
  method: "delete",
  path: "/treatment/{id}",
  tags: ["Treatment"],
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
treatmentRouter.delete("/:id", treatmentController.deleteById);
