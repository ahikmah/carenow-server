import { z } from "zod";

export const commonValidations = {
  id: z.string().uuid("ID must be a valid UUID"),
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Email must be a valid email address"),
  gender: z.enum(["F", "M"]).describe("Gender must be either 'F' or 'M'"),
  phone_number: z.string().min(10, "Phone number must be at least 10 characters long"),
  nik: z.string().min(16, "NIK must be at least 16 characters long").max(16, "NIK must be at most 16 characters long"),
  height: z.number().min(0, "Height must be a positive number"),
  weight: z.number().min(0, "Weight must be a positive number"),
  dob: z.date().max(new Date(), "Date of birth must be in the past"),
  date: z.date().max(new Date(), "Date must be in the past"),
  address: z.string().min(5, "Address must be at least 5 characters long"),
  yoe: z.number().min(0, "Years of experience must be a positive number"),
  costPrice: z.number().min(0, "Cost price must be a positive number"),
};
