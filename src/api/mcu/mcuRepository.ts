import type { Mcu, McuMedication, McuTreatment, McuTreatmentSchema } from "@/api/mcu/mcuModel";
import {
  generateInsertSQL as insert,
  generateMultiInsertSQL as multiInsert,
  generateDeleteSQL as remove,
  generateSelectSQL as select,
  generateUpdateSQL as update,
} from "@/common/utils/crud";

export class McuRepository {
  async insert(data: Mcu, db: any): Promise<Mcu | null> {
    const sql = insert("patient_visit", data, ["patient_id", "date_of_treatment", "cost", "doctor_id"]);
    const result = await db.query(sql);

    return result.rows[0] || null;
  }

  async insertMany(
    table: string,
    data: McuTreatment[] | McuMedication[],
    reqFields: string[],
    db: any,
  ): Promise<Mcu[] | null> {
    const sql = multiInsert(table, data, ["patient_visit_id", ...reqFields]);
    const result = await db.query(sql);

    return result.rows || null;
  }

  async findAll(db: any): Promise<Mcu[]> {
    const sql = select("patient_visit");
    const result = await db.query(sql);

    return result.rows;
  }

  async findByKey(key: string, value: string, db: any): Promise<Mcu | null> {
    const sql = select("patient_visit", ["*"], { [key]: value });
    const result = await db.query(sql);

    return result.rows[0] || null;
  }

  async updateByKey(key: string, value: string | number, data: Mcu, db: any): Promise<Mcu | null> {
    const sql = update("patient_visit", data, { [key]: value });
    const result = await db.query(sql);

    return result.rows[0] || null;
  }

  async deleteByKey(key: string, value: string, db: any): Promise<boolean> {
    const sql = remove("patient_visit", { [key]: value });
    const result = await db.query(sql);

    return result.rowCount > 0;
  }
}
