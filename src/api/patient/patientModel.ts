import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type Patient = z.infer<typeof PatientSchema>;

export const PatientSchema = z.object({
  id: z.string().uuid().optional(),
  nik: z.string(),
  name: z.string(),
  gender: z.string().optional(),
  dob: z.date().optional(),
  height: z.number().optional(),
  weight: z.number().optional(),
  phone_number: z.string().optional(),
  address: z.string().optional(),
});

export const CreatePatientSchema = z.object({
  body: z.object({
    nik: commonValidations.nik,
    name: commonValidations.name,
    gender: commonValidations.gender.optional(),
    dob: commonValidations.date.optional(),
    height: commonValidations.height.optional(),
    weight: commonValidations.weight.optional(),
    phone_number: commonValidations.phone_number.optional(),
    address: commonValidations.address.optional(),
  }),
});
