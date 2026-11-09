const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setupDatabase() {
  let connection;
  try {
    // Connect without database first
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT) || 3306,
      multipleStatements: true
    });

    console.log('Connected to MySQL server.');

    // Create database
    const dbName = process.env.DB_NAME || 'nuveora_skin';
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    console.log(`Database ${dbName} ensured.`);

    // Use database
    await connection.query(`USE \`${dbName}\`;`);

    // Run schema
    const schemaPath = path.join(__dirname, 'database', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('Running schema.sql...');
    await connection.query(schema);
    console.log('Schema setup complete.');

  } catch (error) {
    console.error('Database setup failed:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupDatabase();
