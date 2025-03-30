import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type Doctor = z.infer<typeof DoctorSchema>;

export const DoctorSchema = z.object({
  name: z.string(),
  specialization: z.string(),
  phone_number: z.string(),
  email: z.string(),
  address: z.string(),
  avaibility: z.string(),
  yoe: z.number(),
  license_number: z.string(),
  notes: z.string(),
});

export const CreateDoctorSchema = z.object({
  body: z.object({
    name: commonValidations.name,
    specialization: z.string(),
    phone_number: commonValidations.phone_number,
    email: commonValidations.email,
    address: commonValidations.address,
    avaibility: z.string(),
    yoe: commonValidations.yoe,
    license_number: z.string(),
    notes: z.string(),
  }),
});
