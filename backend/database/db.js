import mysql from "mysql2";

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "farm_management",
  port: process.env.DB_PORT || 3307,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Failed to connect to MySQL:", err.message);
    process.exit(1); // stop the server if DB connection fails
  }
  console.log("✅ Connected to MySQL!");
});

export default db;
