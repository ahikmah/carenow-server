import { StatusCodes } from "http-status-codes";

import type { Treatment } from "@/api/treatment/treatmentModel";
import { TreatmentRepository } from "@/api/treatment/treatmentRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";

export class TreatmentService {
  private readonly TreatmentRepository: TreatmentRepository;

  constructor(repository: TreatmentRepository = new TreatmentRepository()) {
    this.TreatmentRepository = repository;
  }

  // Creates a new treatment in the database
  async create(data: Treatment, db: any): Promise<ServiceResponse<Treatment | null>> {
    try {
      const treatment = await this.TreatmentRepository.add(data, db);

      if (!treatment) {
        return ServiceResponse.failure("Treatment not created", null, StatusCodes.INTERNAL_SERVER_ERROR);
      }

      return ServiceResponse.success<Treatment>("Treatment created", treatment);
    } catch (ex) {
      const errorMessage = `Error creating treatment: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while creating treatment.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Retrieves all patients from the database
  async findAll(db: any): Promise<ServiceResponse<Treatment[] | null>> {
    try {
      const patients = await this.TreatmentRepository.findAll(db);
      if (!patients || patients.length === 0) {
        return ServiceResponse.failure("No Patients found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Treatment[]>("Patients found", patients);
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

  // Retrieves a treatment by key from the database
  async findByKey(key: string, value: string, db: any): Promise<ServiceResponse<Treatment | null>> {
    try {
      const treatment = await this.TreatmentRepository.findByKey(key, value, db);
      if (!treatment) {
        return ServiceResponse.failure("Treatment not found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Treatment>("Treatment found", treatment);
    } catch (ex) {
      const errorMessage = `Error finding treatment by key: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving treatment.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Updates a treatment in the database
  async update(
    key: string,
    value: string | number,
    data: Treatment,
    db: any,
  ): Promise<ServiceResponse<Treatment | null>> {
    try {
      const treatment = await this.TreatmentRepository.edit(key, value, data, db);
      if (!treatment) {
        return ServiceResponse.failure("Treatment not updated", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Treatment>("Treatment updated", treatment);
    } catch (ex) {
      const errorMessage = `Error updating treatment: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while updating treatment.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Removes a treatment from the database
  async remove(key: string, value: string, db: any): Promise<ServiceResponse<boolean>> {
    try {
      const result = await this.TreatmentRepository.delete(key, value, db);
      if (!result) {
        return ServiceResponse.failure("Treatment not removed", false, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<boolean>("Treatment removed", result);
    } catch (ex) {
      const errorMessage = `Error removing treatment: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while removing treatment.",
        false,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export const treatmentService = new TreatmentService();
