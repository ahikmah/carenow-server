import { StatusCodes } from "http-status-codes";

import type { MappedMcu, Mcu, McuMedication, McuTreatment } from "@/api/mcu/mcuModel";
import { McuRepository } from "@/api/mcu/mcuRepository";
import { PatientRepository } from "@/api/patient/patientRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";

export class McuService {
  private readonly mcuRepository: McuRepository;
  private readonly patientRepository!: PatientRepository;

  constructor(
    repository: McuRepository = new McuRepository(),
    patientRepository: PatientRepository = new PatientRepository(),
  ) {
    this.patientRepository = patientRepository;
    this.mcuRepository = repository;
  }

  // Creates a new mcu in the database
  async add(data: MappedMcu, db: any): Promise<ServiceResponse<Mcu | null>> {
    try {
      // Check if patient exists
      let patient = await this.patientRepository.findByKey("patient_sec_id", data.patientData.patient_sec_id, db);

      // Create patient if not exists
      if (!patient) {
        patient = await this.patientRepository.add(data.patientData, db);
      }

      // Early return if patient not created
      if (!patient) {
        return ServiceResponse.failure("Patient not created", null, StatusCodes.INTERNAL_SERVER_ERROR);
      }

      // Create mcu
      const mcuData = {
        ...data.mcuData,
        patient_id: patient.id,
      } as Mcu;

      const mcu = await this.mcuRepository.insert(mcuData, db);

      // Early return if mcu not created
      if (!mcu) {
        return ServiceResponse.failure("Mcu not created", null, StatusCodes.INTERNAL_SERVER_ERROR);
      }

      // Insert treatment_detail tb
      const treatmentData = data.treatmentData.map((treatment) => ({
        master_treatment_id: treatment,
        patient_visit_id: mcu.id,
      }));
      await this.mcuRepository.insertMany(
        "treatment_detail",
        treatmentData as McuTreatment[],
        ["master_treatment_id"],
        db,
      );

      // Insert medication_detail tb
      const medicationData = data.medicationData.map((medication) => ({
        master_medication_id: medication,
        patient_visit_id: mcu.id,
      }));
      await this.mcuRepository.insertMany(
        "medication_detail",
        medicationData as McuMedication[],
        ["master_medication_id"],
        db,
      );

      return ServiceResponse.success<Mcu>("Mcu created", mcu);
    } catch (ex) {
      const errorMessage = `Error creating mcu: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occurred while creating mcu.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  // Retrieves all mcus from the database
  async findAll(db: any): Promise<ServiceResponse<Mcu[] | null>> {
    try {
      const mcus = await this.mcuRepository.findAll(db);
      if (!mcus || mcus.length === 0) {
        return ServiceResponse.failure("No Mcus found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Mcu[]>("Mcus found", mcus);
    } catch (ex) {
      const errorMessage = `Error finding all mcus: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving mcus.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Retrieves a mcu by key from the database

  async findByKey(key: string, value: string, db: any): Promise<ServiceResponse<Mcu | null>> {
    try {
      const mcu = await this.mcuRepository.findByKey(key, value, db);
      if (!mcu) {
        return ServiceResponse.failure("Mcu not found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Mcu>("Mcu found", mcu);
    } catch (ex) {
      const errorMessage = `Error finding mcu by key: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving mcu.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Updates a mcu in the database
  async updateByKey(key: string, value: string | number, data: Mcu, db: any): Promise<ServiceResponse<Mcu | null>> {
    try {
      const mcu = await this.mcuRepository.updateByKey(key, value, data, db);
      if (!mcu) {
        return ServiceResponse.failure("Mcu not updated", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Mcu>("Mcu updated", mcu);
    } catch (ex) {
      const errorMessage = `Error updating mcu: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occurred while updating mcu.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  // Removes a mcu from the database
  async deleteByKey(key: string, value: string, db: any): Promise<ServiceResponse<boolean>> {
    try {
      const result = await this.mcuRepository.deleteByKey(key, value, db);
      if (!result) {
        return ServiceResponse.failure("Mcu not removed", false, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<boolean>("Mcu removed", true);
    } catch (ex) {
      const errorMessage = `Error removing mcu: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occurred while removing mcu.", false, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

export const mcuService = new McuService();
