import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type Patient = z.infer<typeof PatientSchema>;

export const PatientSchema = z.object({
  nik: z.string(),
  name: z.string(),
  gender: z.string(),
  dob: z.date(),
  height: z.number(),
  weight: z.number(),
  phone_number: z.string(),
  address: z.string(),
});

export const GetPatientSchema = z.object({
  body: z.object({
    nik: commonValidations.nik,
    name: commonValidations.name,
    gender: commonValidations.gender.optional(),
    dob: commonValidations.dob.optional(),
    height: commonValidations.height.optional(),
    weight: commonValidations.weight.optional(),
    phone_number: commonValidations.phone_number.optional(),
    address: commonValidations.address.optional(),
  }),
});
