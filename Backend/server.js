const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Configuración para servir archivos estáticos desde la carpeta 'Public'
app.use(express.static(path.join(__dirname, '../public')));

// Ruta para servir el archivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');


// Configuración de conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
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

// Middleware para procesar datos de formularios
app.use(bodyParser.urlencoded({ extended: true }));

//Manejo del POST
app.post('/registro', (req,res) => {
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
  confirmarContrasena
} = req.body;

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

    // Inserta la información de inicio de sesión en la tabla CUENTA
    const insertCuentaQuery = `
      INSERT INTO CUENTA (CLIENTE_cc, correo_electronico, contrasena, fecha_creacion)
      VALUES (?, ?, ?, NOW())
    `;
    connection.query(
      insertCuentaQuery,
      [cc, correo, contrasena],
      (err) => {
        if (err) {
          console.error('Error al insertar información de inicio de sesión:', err);
          return res.status(500).send('Error interno del servidor');
        }

        // Éxito en ambas inserciones
        res.send('Cuenta creada exitosamente');
      }
    );
  }
);
});

// Manejo de solicitudes de favicon.ico -- Para evitar Error de favicon
app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

//-----------------------POST de login-----------------------------------------------------------------------
app.post('/login', (req, res) => {
  const { correo, contrasena } = req.body;

  // Consulta para verificar la existencia del usuario con el correo y la contraseña proporcionados
  const consultaLogin = `
    SELECT *
    FROM CUENTA
    WHERE correo_electronico = ? AND contrasena = ?
  `;

  connection.query(consultaLogin, [correo, contrasena], (err, results) => {
    if (err) {
      console.error('Error al realizar la consulta de inicio de sesión:', err);
      return res.status(500).send('Error interno del servidor');
    }

    // Verifica si se encontró un usuario con las credenciales proporcionadas
    if (results.length > 0) {
      //res.send('Inicio de sesión existoso');
      res.redirect('/index.html');//-----pruebas---------
    } else {
      res.status(401).send('Credenciales incorrectas');
    }
  });
});


// Escucha en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});

