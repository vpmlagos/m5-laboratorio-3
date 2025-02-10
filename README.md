
## INSTALACIÓN

<code>
git clone git@github.com:vpmlagos/m5-laboratorio-3.git
cd m4-l3-app <br>
npm install<br>
npm install react-router-dom<br>
npm install prop-types<br>
npm install bootstrap<br>
npm install bootstrap @popperjs/core<br>
npm install react-bootstrap-icons<br>
npm install axios
npm install react-router-dom
npm install cors
npm install express
npm install dotenv
npm install helmet
npm install express-rate-limit
npm install xss-clean
npm install bcryptjs<br>
node ./src/APIs/Login.cjs<br>
npm run dev<br>
</code>


# Credenciales

user: admin
pass: 12345

## Uso de useState para la Gestión de Estado

### PREMISA

Implementa el Hook useState para gestionar el estado en los componentes del sistema,
como:
- El manejo de formularios de pacientes o citas médicas.
- Almacenar temporalmente la información ingresada por el usuario hasta que sea
enviada o actualizada en la base de datos.

### Actividad

En el componente DoctorsManagement se gestiona el estado de la lista de médicos obtenidos desde el mock, tambien se gestiona el estado del formulario manual de doctores y los doctores agregados temporalmente.

## Uso de useEffect para la Gestión de Efectos Secundarios

### PREMISA

Utiliza useEffect para manejar efectos secundarios como:
- Realizar peticiones a la API para obtener los datos del sistema del hospital
(doctores, pacientes).
- Controlar cuándo y cómo se deben ejecutar ciertos procesos, como la
actualización automática de datos.

### Actividad

En DoctorsManagement, se utiliza useEffect para manejar efectos secundarios, también los datos se actualizan cada 10 segundos.

## Manejo de Errores en la Aplicación

### Premisa

Implementa un mecanismo para el manejo de errores y excepciones en la aplicación
React, asegurando que:
- Los errores durante las peticiones a la API se capturen y manejen
adecuadamente, mostrando mensajes claros al usuario.
- Se manejen errores comunes en la interfaz, como la validación de formularios o
la ausencia de datos requeridos.

### Actividad

Se agregan a DoctorsManagement el estado error para almacenar errores de la Api y para la validación del formulario se utiliza un mensaje por defecto debajo del campo del formulario.
