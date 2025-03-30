import type { Request, RequestHandler, Response } from "express";

import { patientService as service } from "@/api/patient/patientService";
import { tx } from "@/common/config/dbConfig";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class PatientController {
  public createPatient: RequestHandler = async (req: Request, res: Response) => {
    const payload = req.body;

    tx(async (db: any) => {
      const serviceResponse = await service.create(payload, db);
      return handleServiceResponse(serviceResponse, res);
    }, res);
  };

  public getAllPatients: RequestHandler = async (_req: Request, res: Response) => {
    tx(async (db: any) => {
      const serviceResponse = await service.findAll(db);
      return handleServiceResponse(serviceResponse, res);
    }, res);
  };

  public getPatientById: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;

    tx(async (db: any) => {
      const serviceResponse = await service.findByKey("id", id, db);
      return handleServiceResponse(serviceResponse, res);
    }, res);
  };

  public updatePatientById: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;

    tx(async (db: any) => {
      const serviceResponse = await service.update("id", id, payload, db);
      return handleServiceResponse(serviceResponse, res);
    }, res);
  };

  public deletePatientById: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;

    tx(async (db: any) => {
      const serviceResponse = await service.remove("id", id, db);
      return handleServiceResponse(serviceResponse, res);
    }, res);
  };
}

export const patientController = new PatientController();
