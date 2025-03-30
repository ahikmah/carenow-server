import type { Request, RequestHandler, Response } from "express";

import { medicationService as service } from "@/api/medication/medicationService";
import { tx } from "@/common/config/dbConfig";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class MedicationController {
  public createMedication: RequestHandler = async (req: Request, res: Response) => {
    const payload = req.body;

    tx(async (db: any) => {
      const serviceResponse = await service.create(payload, db);
      return handleServiceResponse(serviceResponse, res);
    }, res);
  };

  public getAllMedication: RequestHandler = async (_req: Request, res: Response) => {
    tx(async (db: any) => {
      const serviceResponse = await service.findAll(db);
      return handleServiceResponse(serviceResponse, res);
    }, res);
  };

  public getMedicationById: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;

    tx(async (db: any) => {
      const serviceResponse = await service.findByKey("id", id, db);
      return handleServiceResponse(serviceResponse, res);
    }, res);
  };

  public updateMedicationById: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;

    tx(async (db: any) => {
      const serviceResponse = await service.update("id", id, payload, db);
      return handleServiceResponse(serviceResponse, res);
    }, res);
  };

  public deleteMedicationById: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;

    tx(async (db: any) => {
      const serviceResponse = await service.remove("id", id, db);
      return handleServiceResponse(serviceResponse, res);
    }, res);
  };
}

export const treatmentController = new MedicationController();
