import type { Request, RequestHandler, Response } from "express";

import { mcuService as service } from "@/api/mcu/mcuService";
import { tx } from "@/common/config/dbConfig";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class McuController {
  public add: RequestHandler = async (req: Request, res: Response) => {
    const payload = req.body;

    const patientData = {
      patient_sec_id: payload.patient_id,
      name: payload.patient_name,
    };

    const mcuData = {
      date_of_treatment: payload.date_of_treatment,
      cost: payload.cost_of_treatment,
      doctor_id: payload.doctor_id,
    };

    const treatmentData = payload.treatment_description;

    const medicationData = payload.medication_prescribed;

    const data = {
      patientData,
      mcuData,
      treatmentData,
      medicationData,
    };

    tx(async (db: any) => {
      const serviceResponse = await service.add(data, db);
      return handleServiceResponse(serviceResponse, res);
    }, res);
  };

  public findAll: RequestHandler = async (_req: Request, res: Response) => {
    tx(async (db: any) => {
      const serviceResponse = await service.findAll(db);
      return handleServiceResponse(serviceResponse, res);
    }, res);
  };

  public findById: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;

    tx(async (db: any) => {
      const serviceResponse = await service.findByKey("id", id, db);
      return handleServiceResponse(serviceResponse, res);
    }, res);
  };

  public updateById: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;

    tx(async (db: any) => {
      const serviceResponse = await service.updateByKey("id", id, payload, db);
      return handleServiceResponse(serviceResponse, res);
    }, res);
  };

  public deleteById: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;

    tx(async (db: any) => {
      const serviceResponse = await service.deleteByKey("id", id, db);
      return handleServiceResponse(serviceResponse, res);
    }, res);
  };
}

export const mcuController = new McuController();
