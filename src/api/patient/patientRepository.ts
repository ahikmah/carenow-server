import type { Patient } from "@/api/patient/patientModel";
import {
  generateInsertSQL as insert,
  generateDeleteSQL as remove,
  generateSelectSQL as select,
  generateUpdateSQL as update,
} from "@/common/utils/crud";

export class PatientRepository {
  async add(data: Patient, db: any): Promise<Patient | null> {
    const sql = insert("patient", data, ["name", "nik"]);
    const result = await db.query(sql);

    return result.rows[0] || null;
  }

  async findAll(db: any): Promise<Patient[]> {
    const sql = select("patient");
    const result = await db.query(sql);

    return result.rows;
  }

  async findByKey(key: string, value: string, db: any): Promise<Patient | null> {
    const sql = select("patient", ["*"], { [key]: value });
    const result = await db.query(sql);

    return result.rows[0] || null;
  }

  async updateByKey(key: string, value: string | number, data: Patient, db: any): Promise<Patient | null> {
    const sql = update("patient", data, { [key]: value });
    const result = await db.query(sql);

    return result.rows[0] || null;
  }

  async deleteByKey(key: string, value: string, db: any): Promise<boolean> {
    const sql = remove("patient", { [key]: value });
    const result = await db.query(sql);

    return result.rowCount > 0;
  }
}
