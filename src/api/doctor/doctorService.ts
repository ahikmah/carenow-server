import { StatusCodes } from "http-status-codes";

import type { Doctor } from "@/api/doctor/doctorModel";
import { DoctorRepository } from "@/api/doctor/doctorRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";

export class DoctorService {
  private readonly doctorRepository: DoctorRepository;

  constructor(repository: DoctorRepository = new DoctorRepository()) {
    this.doctorRepository = repository;
  }

  // Creates a new doctor in the database
  async add(data: Doctor, db: any): Promise<ServiceResponse<Doctor | null>> {
    try {
      const doctor = await this.doctorRepository.add(data, db);

      if (!doctor) {
        return ServiceResponse.failure("Doctor not created", null, StatusCodes.INTERNAL_SERVER_ERROR);
      }

      return ServiceResponse.success<Doctor>("Doctor created", doctor);
    } catch (ex) {
      const errorMessage = `Error creating doctor: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while creating doctor.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Retrieves all doctors from the database
  async findAll(db: any): Promise<ServiceResponse<Doctor[] | null>> {
    try {
      const doctors = await this.doctorRepository.findAll(db);
      if (!doctors || doctors.length === 0) {
        return ServiceResponse.failure("No Doctors found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Doctor[]>("Doctors found", doctors);
    } catch (ex) {
      const errorMessage = `Error finding all doctors: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving doctors.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Retrieves a doctor by key from the database
  async findByKey(key: string, value: string, db: any): Promise<ServiceResponse<Doctor | null>> {
    try {
      const doctor = await this.doctorRepository.findByKey(key, value, db);
      if (!doctor) {
        return ServiceResponse.failure("Doctor not found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Doctor>("Doctor found", doctor);
    } catch (ex) {
      const errorMessage = `Error finding doctor by key: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving doctor.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Updates a doctor in the database
  async updateByKey(
    key: string,
    value: string | number,
    data: Doctor,
    db: any,
  ): Promise<ServiceResponse<Doctor | null>> {
    try {
      const doctor = await this.doctorRepository.updateByKey(key, value, data, db);
      if (!doctor) {
        return ServiceResponse.failure("Doctor not updated", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Doctor>("Doctor updated", doctor);
    } catch (ex) {
      const errorMessage = `Error updating doctor: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while updating doctor.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Removes a doctor from the database
  async deleteByKey(key: string, value: string, db: any): Promise<ServiceResponse<boolean>> {
    try {
      const result = await this.doctorRepository.deleteByKey(key, value, db);
      if (!result) {
        return ServiceResponse.failure("Doctor not removed", false, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<boolean>("Doctor removed", result);
    } catch (ex) {
      const errorMessage = `Error removing doctor: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while removing doctor.",
        false,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export const doctorService = new DoctorService();
