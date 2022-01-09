import client from "../database";

export type Session = {
  id: number;
  date: string;
  title: string;
  sl_id: number;
};

export class SessionModel {
  async index(): Promise<Session[]> {
    try {
      const connection = await client.connect();
      const sql = "SELECT * FROM sessions";
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Failed to get the sessions with the following error: ${error}`
      );
    }
  }
  async show(id: number): Promise<Session> {
    try {
      const connection = await client.connect();
      const sql = "SELECT * FROM sessions WHERE id=($1)";
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to get the session with the following error: ${error}`
      );
    }
  }
  async create(date: string, title: string, sl_id: string): Promise<Session> {
    try {
      const connection = await client.connect();
      const sql =
        "INSERT INTO sessions (date, title, sl_id) VALUES($1, $2, $3) RETURNING *";
      const result = await connection.query(sql, [date, title, sl_id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to add the session with the following error: ${error}`
      );
    }
  }

  async update(
    id: number,
    date: string,
    title: string,
    sl_id: string
  ): Promise<Session> {
    try {
      const connection = await client.connect();
      const sql =
        "UPDATE sessions SET date=($1), title=($2), sl_id=($3) WHERE id=($4) RETURNING *";
      const result = await connection.query(sql, [date, title, sl_id, id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to update session with the following error: ${error}`
      );
    }
  }

  async delete(id: number): Promise<Session> {
    try {
      const connection = await client.connect();
      const sql = "DELETE FROM sessions WHERE id=($1) RETURNING *";
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to delete session with the following error: ${error}`
      );
    }
  }

  async addStudent(studentId: number, sessionId: number) {
    // TODO
    // ADD FUNCTIONALITY
  }
}
