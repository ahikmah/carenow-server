import { StatusCodes } from "http-status-codes";

import type { Medication } from "@/api/medication/medicationModel";
import { MedicationRepository } from "@/api/medication/medicationRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";

export class MedicationService {
  private readonly MedicationRepository: MedicationRepository;

  constructor(repository: MedicationRepository = new MedicationRepository()) {
    this.MedicationRepository = repository;
  }

  // Creates a new treatment in the database
  async add(data: Medication, db: any): Promise<ServiceResponse<Medication | null>> {
    try {
      const treatment = await this.MedicationRepository.add(data, db);

      if (!treatment) {
        return ServiceResponse.failure("Medication not created", null, StatusCodes.INTERNAL_SERVER_ERROR);
      }

      return ServiceResponse.success<Medication>("Medication created", treatment);
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

  // Retrieves all medications from the database
  async findAll(db: any): Promise<ServiceResponse<Medication[] | null>> {
    try {
      const medications = await this.MedicationRepository.findAll(db);
      if (!medications || medications.length === 0) {
        return ServiceResponse.failure("No Medications found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Medication[]>("Medications found", medications);
    } catch (ex) {
      const errorMessage = `Error finding all medications: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving medications.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Retrieves a treatment by key from the database
  async findByKey(key: string, value: string, db: any): Promise<ServiceResponse<Medication | null>> {
    try {
      const treatment = await this.MedicationRepository.findByKey(key, value, db);
      if (!treatment) {
        return ServiceResponse.failure("Medication not found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Medication>("Medication found", treatment);
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
  async updateByKey(
    key: string,
    value: string | number,
    data: Medication,
    db: any,
  ): Promise<ServiceResponse<Medication | null>> {
    try {
      const treatment = await this.MedicationRepository.updateByKey(key, value, data, db);
      if (!treatment) {
        return ServiceResponse.failure("Medication not updated", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Medication>("Medication updated", treatment);
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
  async deleteByKey(key: string, value: string, db: any): Promise<ServiceResponse<boolean>> {
    try {
      const result = await this.MedicationRepository.deleteByKey(key, value, db);
      if (!result) {
        return ServiceResponse.failure("Medication not removed", false, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<boolean>("Medication removed", result);
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

export const medicationService = new MedicationService();
