import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type Medication = z.infer<typeof MedicationSchema>;

export const MedicationSchema = z.object({
  name: z.string(),
});

export const GetMedicationSchema = z.object({
  body: z.object({
    name: commonValidations.name,
  }),
});
