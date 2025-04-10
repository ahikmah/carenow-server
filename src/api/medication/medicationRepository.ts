import type { Medication } from "@/api/medication/medicationModel";
import {
  generateInsertSQL as insert,
  generateMultiInsertSQL as multiInsert,
  generateDeleteSQL as remove,
  generateSelectSQL as select,
  generateUpdateSQL as update,
} from "@/common/utils/crud";

export class MedicationRepository {
  async add(data: Medication, db: any): Promise<Medication | null> {
    const sql = insert("master_medication", data, ["name"]);
    const result = await db.query(sql);

    return result.rows[0] || null;
  }

  async addMany(data: Medication[], db: any): Promise<Medication[] | null> {
    const sql = multiInsert("master_medication", data, ["name"]);
    const result = await db.query(sql);

    return result.rows || null;
  }

  async findAll(db: any): Promise<Medication[]> {
    const sql = select("master_medication");
    const result = await db.query(sql);

    return result.rows;
  }

  async findByKey(key: string, value: string, db: any): Promise<Medication | null> {
    const sql = select("master_medication", ["*"], { [key]: value });
    const result = await db.query(sql);

    return result.rows[0] || null;
  }

  async updateByKey(key: string, value: string | number, data: Medication, db: any): Promise<Medication | null> {
    const sql = update("master_medication", data, { [key]: value });
    const result = await db.query(sql);

    return result.rows[0] || null;
  }

  async deleteByKey(key: string, value: string, db: any): Promise<boolean> {
    const sql = remove("master_medication", { [key]: value });
    const result = await db.query(sql);

    return result.rowCount > 0;
  }
}
