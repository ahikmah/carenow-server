import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type Mcu = z.infer<typeof McuTableSchema>;
export type MappedMcu = z.infer<typeof MappedMcuSchema>;
export type McuTreatment = z.infer<typeof McuTreatmentSchema>;
export type McuMedication = z.infer<typeof McuMedicationSchema>;

export const MappedMcuSchema = z.object({
  patientData: z.object({
    name: z.string(),
    nik: z.string(),
  }),

  mcuData: z.object({
    date_of_treatment: z.string(),
    cost: z.number(),
    doctor_id: z.string(),
  }),

  treatmentData: z.array(z.string()),
  medicationData: z.array(z.string()),
});

export const McuTableSchema = z.object({
  id: z.string().uuid().optional(),
  date_of_treatment: z.string(),
  cost: z.number(),
  doctor_id: z.string(),
  patient_id: z.string(),
});

export const McuSchema = z.object({
  patient_name: z.string(),
  patient_id: z.string(),
  date_of_treatment: z.string(),
  treatment_description: z.array(z.string()),
  medication_prescribed: z.array(z.string()),
  cost_of_treatment: z.number(),
  doctor_id: z.string().uuid(),
});

export const McuGetResponseSchema = z.object({
  visit_id: z.string().uuid(),
  visit_date: z.string(),
  user_info: z.object({
    patient_id: z.string().uuid(),
    patient_name: z.string(),
  }),
  doctor_info: z.object({
    doctor_id: z.string().uuid(),
    doctor_name: z.string(),
    specialization: z.string(),
  }),
  treatment_detail: z.array(z.string()),
  medication_detail: z.array(z.string()),
});

export const McuTreatmentSchema = z.object({
  master_treatment_id: z.string().uuid(),
  patient_visit_id: z.string().uuid(),
});

export const McuMedicationSchema = z.object({
  master_medication_id: z.string().uuid(),
  patient_visit_id: z.string().uuid(),
});

export const CreateMcuSchema = z.object({
  body: z.object({
    patient_name: commonValidations.name,
    patient_id: commonValidations.nik,
    date_of_treatment: z.string(),
    treatment_description: z.array(z.string()),
    medication_prescribed: z.array(z.string()),
    cost_of_treatment: commonValidations.costPrice,
    doctor_id: commonValidations.id,
  }),
});
