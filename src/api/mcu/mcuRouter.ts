import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { mcuController } from "@/api/mcu/mcuController";
import { CreateMcuSchema, McuGetResponseSchema, McuSchema } from "@/api/mcu/mcuModel";
import { validateRequest } from "@/common/utils/httpHandlers";

export const mcuRegistry = new OpenAPIRegistry();
export const mcuRouter: Router = express.Router();

mcuRegistry.register("Mcu", McuSchema);

// Create a new mcu
mcuRegistry.registerPath({
  method: "post",
  path: "/mcu",
  tags: ["Mcu"],
  request: {
    body: {
      content: { "application/json": { schema: McuSchema } },
    },
  },
  responses: createApiResponse(McuSchema, "Success"),
});
mcuRouter.post("/", validateRequest(CreateMcuSchema), mcuController.add);

// Get all mcu
mcuRegistry.registerPath({
  method: "get",
  path: "/mcu",
  tags: ["Mcu"],
  responses: createApiResponse(z.array(McuGetResponseSchema), "Success"),
});
mcuRouter.get("/", mcuController.findAll);

// // Get a mcu by ID
// mcuRegistry.registerPath({
//   method: "get",
//   path: "/mcu/{id}",
//   tags: ["Mcu"],
//   parameters: [
//     {
//       name: "id",
//       in: "path",
//       required: true,
//       schema: {
//         type: "string",
//         format: "uuid",
//       },
//     },
//   ],
//   responses: createApiResponse(McuSchema, "Success"),
// });

// mcuRouter.get("/:id", mcuController.findById);

// // Delete a mcu by ID
// mcuRegistry.registerPath({
//   method: "delete",
//   path: "/mcu/{id}",
//   tags: ["Mcu"],
//   parameters: [
//     {
//       name: "id",
//       in: "path",
//       required: true,
//       schema: {
//         type: "string",
//         format: "uuid",
//       },
//     },
//   ],
//   responses: createApiResponse(McuSchema, "Success"),
// });
// mcuRouter.delete("/:id", mcuController.deleteById);
