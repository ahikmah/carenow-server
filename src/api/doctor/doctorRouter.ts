import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { DoctorSchema, GetDoctorSchema } from "@/api/doctor/doctorModel";
import { validateRequest } from "@/common/utils/httpHandlers";
import { doctorController } from "./doctorController";

export const doctorRegistry = new OpenAPIRegistry();
export const doctorRouter: Router = express.Router();

doctorRegistry.register("Doctor", DoctorSchema);

// Create a new patient
doctorRegistry.registerPath({
  method: "post",
  path: "/doctor",
  tags: ["Doctor"],
  request: {
    body: {
      content: { "application/json": { schema: DoctorSchema } },
    },
  },
  responses: createApiResponse(DoctorSchema, "Success"),
});
doctorRouter.post("/", validateRequest(GetDoctorSchema), doctorController.createDoctor);

// Get all patients
doctorRegistry.registerPath({
  method: "get",
  path: "/doctor",
  tags: ["Doctor"],
  responses: createApiResponse(z.array(DoctorSchema), "Success"),
});
doctorRouter.get("/", doctorController.getAllDoctor);

// Get a patient by ID
doctorRegistry.registerPath({
  method: "get",
  path: "/doctor/{id}",
  tags: ["Doctor"],
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
  responses: createApiResponse(DoctorSchema, "Success"),
});
doctorRouter.get("/:id", doctorController.getDoctorById);

// Update a patient by ID
doctorRegistry.registerPath({
  method: "patch",
  path: "/doctor/{id}",
  tags: ["Doctor"],
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
      content: { "application/json": { schema: DoctorSchema } },
    },
  },
  responses: createApiResponse(DoctorSchema, "Success"),
});
doctorRouter.patch("/:id", doctorController.updateDoctorById);

// Delete a patient by ID
doctorRegistry.registerPath({
  method: "delete",
  path: "/doctor/{id}",
  tags: ["Doctor"],
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
doctorRouter.delete("/:id", doctorController.deleteDoctortById);
