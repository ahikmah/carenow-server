import type { Treatment } from "@/api/treatment/treatmentModel";
import {
  generateInsertSQL as insert,
  generateMultiInsertSQL as multiInsert,
  generateDeleteSQL as remove,
  generateSelectSQL as select,
  generateUpdateSQL as update,
} from "@/common/utils/crud";

export class TreatmentRepository {
  async add(data: Treatment, db: any): Promise<Treatment | null> {
    const sql = insert("master_treatment", data, ["name"]);
    const result = await db.query(sql);

    return result.rows[0] || null;
  }

  async addMany(data: Treatment[], db: any): Promise<Treatment[] | null> {
    const sql = multiInsert("master_treatment", data, ["name"]);
    const result = await db.query(sql);

    return result.rows || null;
  }

  async findAll(db: any): Promise<Treatment[]> {
    const sql = select("master_treatment");
    const result = await db.query(sql);

    return result.rows;
  }

  async findByKey(key: string, value: string, db: any): Promise<Treatment | null> {
    const sql = select("master_treatment", ["*"], { [key]: value });
    const result = await db.query(sql);

    return result.rows[0] || null;
  }

  async updateByKey(key: string, value: string | number, data: Treatment, db: any): Promise<Treatment | null> {
    const sql = update("master_treatment", data, { [key]: value });
    const result = await db.query(sql);

    return result.rows[0] || null;
  }

  async deleteByKey(key: string, value: string, db: any): Promise<boolean> {
    const sql = remove("master_treatment", { [key]: value });
    const result = await db.query(sql);

    return result.rowCount > 0;
  }
}
