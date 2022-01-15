import client from "../database";
import bcrypt from "bcrypt";
export type Lead = {
  id: number;
  name: string;
  email: string;
  password: string;
};

const { PEPPER, SALT_ROUNDS } = process.env;

export class LeadModel {
  async index(): Promise<Lead[]> {
    try {
      const connection = await client.connect();
      const sql = "SELECT * FROM session_leads";
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Failed to get the session leads with the following error: ${error}`
      );
    }
  }
  async show(id: number): Promise<Lead> {
    try {
      const connection = await client.connect();
      const sql = "SELECT * FROM session_leads WHERE id=($1)";
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to get the session lead with the following error: ${error}`
      );
    }
  }

  async create(name: string, email: string, password: string): Promise<Lead> {
    try {
      const connection = await client.connect();
      const sql = "INSERT INTO session_leads (name, email, password) VALUES($1, $2, $3) RETURNING *";
      const hash = bcrypt.hashSync(password + PEPPER, parseInt(String(SALT_ROUNDS)));
      const result = await connection.query(sql, [name, email, hash]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Failed to add the session lead with the following error: ${error}`);
    }
  }

  async update(id: number, name: string): Promise<Lead> {
    try {
      const connection = await client.connect();
      const sql =
        "UPDATE session_leads SET name=($1) WHERE id=($2) RETURNING *";
      const result = await connection.query(sql, [name, id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to update session lead with the following error: ${error}`
      );
    }
  }

  async delete(id: number): Promise<Lead> {
    try {
      const connection = await client.connect();
      const sql = "DELETE FROM session_leads WHERE id=($1) RETURNING *";
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to delete session lead with the following error: ${error}`
      );
    }
  }

  async authenticate(email: string, password: string): Promise<Lead | null> {
    const conn = await client.connect();
    const sql = "SELECT * FROM session_leads WHERE email=($1)";
    const result = await conn.query(sql, [email]);
    if (result.rows.length) {
      const lead = result.rows[0];
      if (bcrypt.compareSync(password + PEPPER, lead.password)) {
        return lead;
      }
    }
    return null;
  }
}
