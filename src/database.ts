import { Pool } from "pg";

const client = new Pool({
    host: "127.0.0.1",
    user: "",
    password: "",
    database: ""
});

export default client;