import type { Request, RequestHandler, Response } from "express";

import { doctorService as service } from "@/api/doctor/doctorService";
import { tx } from "@/common/config/dbConfig";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class DoctorController {
  public createDoctor: RequestHandler = async (req: Request, res: Response) => {
    const payload = req.body;

    tx(async (db: any) => {
      const serviceResponse = await service.create(payload, db);
      return handleServiceResponse(serviceResponse, res);
    }, res);
  };

  public getAllDoctor: RequestHandler = async (_req: Request, res: Response) => {
    tx(async (db: any) => {
      const serviceResponse = await service.findAll(db);
      return handleServiceResponse(serviceResponse, res);
    }, res);
  };

  public getDoctorById: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;

    tx(async (db: any) => {
      const serviceResponse = await service.findByKey("id", id, db);
      return handleServiceResponse(serviceResponse, res);
    }, res);
  };

  public updateDoctorById: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;

    tx(async (db: any) => {
      const serviceResponse = await service.update("id", id, payload, db);
      return handleServiceResponse(serviceResponse, res);
    }, res);
  };

  public deleteDoctortById: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;

    tx(async (db: any) => {
      const serviceResponse = await service.remove("id", id, db);
      return handleServiceResponse(serviceResponse, res);
    }, res);
  };
}

export const doctorController = new DoctorController();
