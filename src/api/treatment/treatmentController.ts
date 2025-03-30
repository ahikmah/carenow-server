import type { Request, RequestHandler, Response } from "express";

import { treatmentService as service } from "@/api/treatment/treatmentService";
import { tx } from "@/common/config/dbConfig";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class TreatmentController {
  public add: RequestHandler = async (req: Request, res: Response) => {
    const payload = req.body;

    tx(async (db: any) => {
      const serviceResponse = await service.add(payload, db);
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

export const treatmentController = new TreatmentController();
