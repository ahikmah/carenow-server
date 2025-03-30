export function generateInsertSQL(tableName: string, data: Record<string, any>, requiredFields: string[]) {
  // Initialize arrays for columns and values
  const columns: string[] = [];
  const values: string[] = [];

  // Loop through the data to construct columns and values
  for (const [key, value] of Object.entries(data)) {
    if (requiredFields.includes(key) || value !== undefined) {
      columns.push(key); // Add column name
      // Check if the value is null or undefined and handle accordingly
      if (value === null || value === undefined) {
        values.push("NULL");
      } else if (typeof value === "string") {
        // Escape single quotes for strings and wrap the value in quotes
        values.push(`'${value.replace(/'/g, "''")}'`);
      } else {
        // For non-string values, directly add them (e.g., numbers, booleans, dates)
        values.push(value.toString());
      }
    }
  }

  // If no columns were added, return null (no data to insert)
  if (columns.length === 0) {
    throw new Error("No valid data provided for insert.");
  }

  // Build and return the SQL query
  const sql = `INSERT INTO ${tableName} (${columns.join(", ")}) VALUES (${values.join(", ")}) RETURNING *;`;
  return sql;
}

export function generateSelectSQL(
  tableName: string,
  fields: string[] = ["*"], // Default is to select all fields
  conditions?: Record<string, any>, // Optional conditions for filtering the records
) {
  // Sanitize fields to avoid SQL injection, except for the wildcard "*"
  const sanitizedFields = fields.map((field) => (field === "*" ? "*" : field.replace(/[^a-zA-Z0-9_]/g, ""))).join(", ");

  // Start building the SQL query
  let sql = `SELECT ${sanitizedFields} FROM ${tableName}`;

  // If conditions are provided, add the WHERE clause
  if (conditions && Object.keys(conditions).length > 0) {
    const conditionClauses: string[] = [];

    // Loop through the conditions and create the WHERE clause
    for (const [key, value] of Object.entries(conditions)) {
      if (value === null) {
        conditionClauses.push(`${key} IS NULL`);
      } else if (typeof value === "string") {
        // Escape single quotes in string values
        conditionClauses.push(`${key} = '${value.replace(/'/g, "''")}'`);
      } else {
        // For numbers or other types, add directly
        conditionClauses.push(`${key} = ${value}`);
      }
    }

    // Add the WHERE clause to the SQL
    sql += ` WHERE ${conditionClauses.join(" AND ")}`;
  }

  return sql;
}

export function generateUpdateSQL(
  tableName: string,
  data: Record<string, any>,
  conditions: Record<string, any>, // Now we support dynamic conditions as well
) {
  // Initialize array for the SET clause
  const setClause: string[] = [];

  // Loop through the data to create SET expressions for only provided fields
  for (const [key, value] of Object.entries(data)) {
    // Only add fields that have values (not undefined or null)
    if (value !== undefined && value !== null) {
      // Check if the value is a string and escape quotes
      if (typeof value === "string") {
        setClause.push(`${key} = '${value.replace(/'/g, "''")}'`);
      } else {
        // For non-string values, directly add them (e.g., numbers, booleans, dates)
        setClause.push(`${key} = ${value}`);
      }
    }
  }

  // If no valid fields to update, throw an error
  if (setClause.length === 0) {
    throw new Error("No valid data provided to update.");
  }

  // Now build the WHERE clause from dynamic conditions
  const conditionClauses: string[] = [];
  for (const [key, value] of Object.entries(conditions)) {
    if (value === null) {
      conditionClauses.push(`${key} IS NULL`);
    } else if (typeof value === "string") {
      conditionClauses.push(`${key} = '${value.replace(/'/g, "''")}'`);
    } else {
      conditionClauses.push(`${key} = ${value}`);
    }
  }

  // If no conditions are provided, throw an error (update should be performed with conditions)
  if (conditionClauses.length === 0) {
    throw new Error("No conditions provided for the update.");
  }

  // Build the final SQL query
  const sql = `UPDATE ${tableName} SET ${setClause.join(", ")} WHERE ${conditionClauses.join(" AND ")} RETURNING *;`;
  return sql;
}

export function generateDeleteSQL(
  tableName: string,
  conditions?: Record<string, any>, // Optional conditions for filtering the records
) {
  // Start building the SQL query
  let sql = `DELETE FROM ${tableName}`;

  // If conditions are provided, add the WHERE clause
  if (conditions && Object.keys(conditions).length > 0) {
    const conditionClauses: string[] = [];

    // Loop through the conditions and create the WHERE clause
    for (const [key, value] of Object.entries(conditions)) {
      if (value === null) {
        conditionClauses.push(`${key} IS NULL`);
      } else if (typeof value === "string") {
        // Escape single quotes in string values
        conditionClauses.push(`${key} = '${value.replace(/'/g, "''")}'`);
      } else {
        // For numbers or other types, add directly
        conditionClauses.push(`${key} = ${value}`);
      }
    }

    // Add the WHERE clause to the SQL
    sql += ` WHERE ${conditionClauses.join(" AND ")} RETURNING *;`;
  }

  return sql;
}
