const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',  // Cambia a '127.0.0.1' si 'localhost' no funciona
  user: 'root',       // Usuario predeterminado de XAMPP
  password: '',       // Sin contraseña por defecto en XAMPP
  database: 'mhs_db'
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

// Ejemplo de consulta
const sqlQuery = 'SELECT * FROM cliente';
connection.query(sqlQuery, (err, results, fields) => {
  if (err) {
    console.error('Error en la consulta:', err);
    return;
  }
  console.log('Resultados de la consulta:', console.table(results));
});

// Cerrar la conexión después de realizar las consultas
connection.end();
