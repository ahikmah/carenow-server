import type { Doctor } from "@/api/doctor/doctorModel";
import {
  generateInsertSQL as insert,
  generateDeleteSQL as remove,
  generateSelectSQL as select,
  generateUpdateSQL as update,
} from "@/common/utils/crud";

export class DoctorRepository {
  async addDoctor(data: Doctor, db: any): Promise<Doctor | null> {
    const sql = insert("doctor", data, [
      "name",
      "specialization",
      "phone_number",
      "email",
      "address",
      "avaibility",
      "yoe",
      "license_number",
    ]);
    const result = await db.query(sql);

    return result.rows[0] || null;
  }

  async findAllDoctor(db: any): Promise<Doctor[]> {
    const sql = select("doctor");
    const result = await db.query(sql);

    return result.rows;
  }

  async findByKey(key: string, value: string, db: any): Promise<Doctor | null> {
    const sql = select("doctor", ["*"], { [key]: value });
    const result = await db.query(sql);

    return result.rows[0] || null;
  }

  async updateDoctor(key: string, value: string | number, data: Doctor, db: any): Promise<Doctor | null> {
    const sql = update("doctor", data, { [key]: value });
    const result = await db.query(sql);

    return result.rows[0] || null;
  }

  async removeDoctor(key: string, value: string, db: any): Promise<boolean> {
    const sql = remove("doctor", { [key]: value });
    const result = await db.query(sql);

    return result.rowCount > 0;
  }
}
