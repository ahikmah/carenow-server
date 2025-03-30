import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";

import { doctorRegistry } from "@/api/doctor/doctorRouter";
import { mcuRegistry } from "@/api/mcu/mcuRouter";
import { medicationRegistry } from "@/api/medication/medicationRouter";
import { patientRegistry } from "@/api/patient/patientRouter";
import { treatmentRegistry } from "@/api/treatment/treatmentRouter";

export function generateOpenAPIDocument() {
  const registry = new OpenAPIRegistry([
    doctorRegistry,
    patientRegistry,
    mcuRegistry,
    medicationRegistry,
    treatmentRegistry,
  ]);
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Swagger API",
    },
    externalDocs: {
      description: "View the raw OpenAPI Specification in JSON format",
      url: "/swagger.json",
    },
  });
}
