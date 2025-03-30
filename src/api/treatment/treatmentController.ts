import type { Request, RequestHandler, Response } from "express";

import { treatmentService as service } from "@/api/treatment/treatmentService";
import { tx } from "@/common/config/dbConfig";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class TreatmentController {
  public createTreatment: RequestHandler = async (req: Request, res: Response) => {
    const payload = req.body;

    tx(async (db: any) => {
      const serviceResponse = await service.create(payload, db);
      return handleServiceResponse(serviceResponse, res);
    }, res);
  };

  public getAllTreatment: RequestHandler = async (_req: Request, res: Response) => {
    tx(async (db: any) => {
      const serviceResponse = await service.findAll(db);
      return handleServiceResponse(serviceResponse, res);
    }, res);
  };

  public getTreatmentById: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;

    tx(async (db: any) => {
      const serviceResponse = await service.findByKey("id", id, db);
      return handleServiceResponse(serviceResponse, res);
    }, res);
  };

  public updateTreatmentById: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;

    tx(async (db: any) => {
      const serviceResponse = await service.update("id", id, payload, db);
      return handleServiceResponse(serviceResponse, res);
    }, res);
  };

  public deleteTreatmentById: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;

    tx(async (db: any) => {
      const serviceResponse = await service.remove("id", id, db);
      return handleServiceResponse(serviceResponse, res);
    }, res);
  };
}

export const treatmentController = new TreatmentController();
