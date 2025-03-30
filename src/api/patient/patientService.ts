import { StatusCodes } from "http-status-codes";

import type { Patient } from "@/api/patient/patientModel";
import { PatientRepository } from "@/api/patient/patientRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";

export class PatientService {
  private readonly patientRepository: PatientRepository;

  constructor(repository: PatientRepository = new PatientRepository()) {
    this.patientRepository = repository;
  }

  // Creates a new patient in the database
  async add(data: Patient, db: any): Promise<ServiceResponse<Patient | null>> {
    try {
      const patient = await this.patientRepository.add(data, db);

      if (!patient) {
        return ServiceResponse.failure("Patient not created", null, StatusCodes.INTERNAL_SERVER_ERROR);
      }

      return ServiceResponse.success<Patient>("Patient created", patient);
    } catch (ex) {
      const errorMessage = `Error creating patient: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while creating patient.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Retrieves all patients from the database
  async findAll(db: any): Promise<ServiceResponse<Patient[] | null>> {
    try {
      const patients = await this.patientRepository.findAll(db);
      if (!patients || patients.length === 0) {
        return ServiceResponse.failure("No Patients found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Patient[]>("Patients found", patients);
    } catch (ex) {
      const errorMessage = `Error finding all patients: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving patients.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Retrieves a patient by key from the database
  async findByKey(key: string, value: string, db: any): Promise<ServiceResponse<Patient | null>> {
    try {
      const patient = await this.patientRepository.findByKey(key, value, db);
      if (!patient) {
        return ServiceResponse.failure("Patient not found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Patient>("Patient found", patient);
    } catch (ex) {
      const errorMessage = `Error finding patient by key: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving patient.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Updates a patient in the database
  async updateByKey(
    key: string,
    value: string | number,
    data: Patient,
    db: any,
  ): Promise<ServiceResponse<Patient | null>> {
    try {
      const patient = await this.patientRepository.updateByKey(key, value, data, db);
      if (!patient) {
        return ServiceResponse.failure("Patient not updated", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Patient>("Patient updated", patient);
    } catch (ex) {
      const errorMessage = `Error updating patient: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while updating patient.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Removes a patient from the database
  async deleteByKey(key: string, value: string, db: any): Promise<ServiceResponse<boolean>> {
    try {
      const result = await this.patientRepository.deleteByKey(key, value, db);
      if (!result) {
        return ServiceResponse.failure("Patient not removed", false, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<boolean>("Patient removed", result);
    } catch (ex) {
      const errorMessage = `Error removing patient: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while removing patient.",
        false,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export const patientService = new PatientService();
