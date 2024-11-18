export default () => ({
  port: parseInt(process.env.PORT || '3000', 10), // Asegura que PORT siempre tenga un valor por defecto
  database: {
    type: process.env.DB_TYPE || 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10), // Lo mismo para DB_PORT
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'my_database',
  },
});
