import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type Treatment = z.infer<typeof TreatmentSchema>;

export const TreatmentSchema = z.object({
  name: z.string(),
});

export const CreateTreatmentSchema = z.object({
  body: z.object({
    name: commonValidations.name,
  }),
});
