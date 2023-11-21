const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();

// Configuración de conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mhs_db'
});

// Middleware para procesar datos de formularios
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/registro', async (req, res) => {
    // Obtén los datos del formulario desde req.body
    const {
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      cc,
      num_celular,
      fecha_nacimiento,
      correo,
      contrasena,
      confirmarContrasena,
      recordarme
    } = req.body;
  
    // Resto del código...
  
    // Inserta la información personal en la tabla CLIENTE
    const insertClienteQuery = `
      INSERT INTO CLIENTE (cc, nombre1, nombre2, apellido1, apellido2, num_celular, fecha_nacimiento)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    connection.query(
      insertClienteQuery,
      [cc, primerNombre, segundoNombre, primerApellido, segundoApellido, num_celular, fecha_nacimiento],
      (err, results) => {
        if (err) {
          console.error('Error al insertar información personal:', err);
          return res.status(500).send('Error interno del servidor');
        }
  
        // Recupera el ID del cliente recién insertado
        const idCliente = results.insertId;
  
        // Resto del código...
      }
    );
  });
  