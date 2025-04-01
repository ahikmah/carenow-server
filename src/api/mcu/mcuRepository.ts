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
    const sql =
      "SELECT pv.id AS visit_id, pv.date_of_treatment AS visit_date, json_build_object( 'patient_id', p.patient_sec_id, 'patient_name', p.name ) AS user_info, json_build_object( 'doctor_id', d.id, 'doctor_name', d.name, 'specialization', d.specialization ) AS doctor_info, (SELECT array_agg(mt.name) FROM treatment_detail td JOIN master_treatment mt ON mt.id = td.master_treatment_id WHERE td.patient_visit_id = pv.id) AS treatment_detail, (SELECT array_agg(mm.name) FROM medication_detail md JOIN master_medication mm ON mm.id = md.master_medication_id WHERE md.patient_visit_id = pv.id) AS medication_detail, pv.cost as cost_of_treatment FROM patient_visit pv JOIN patient p ON p.id = pv.patient_id JOIN doctor d ON d.id = pv.doctor_id order by pv.created desc;";
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
