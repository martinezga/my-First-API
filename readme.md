# Delilah Restó

_Una API RESTful para restaurantes que gestiona el sistema de pedidos online._

## A comenzar! 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

---
### **Pre-requisitos** 📋

_Debes tener instalado:_

* **Node.js** https://nodejs.org/es/download/

* **XAMPP** https://www.apachefriends.org/es/download.html

* **Postman** https://www.postman.com/downloads/ 

---
### **Instalación** 🔧

_Sigue este paso a paso para tener un entorno de desarrollo ejecutándose._

**1.** Clona o descarga el repositorio en tu máquina

**2.** Abre XAMPP y presiona 'Start' en las opciones 'Apache' y MySQL'

**3.** Ingresa al panel de gestión de la base de datos en: http://localhost/phpmyadmin/

**4.** Para crear la base de datos y las tablas ingresa a la opción 'Importar' y selecciona el archivo 'database.sql' que está dentro del repositorio

**5.** Abre tu terminal y ubícate en la carpeta 'api'

**6.** Ejecuta en el terminal 'npm install' para que puedan correr los módulos o dependencias usados en este proyecto. Si crees que ya lo tienes instalado verifícalo escribiendo 'npm --version'

**7.** Pon en funcionamiento el servidor ejecutando en el terminal 'node server.js'. Si todo salió bien observarás el siguiente mensaje:
```
Connection has been established successfully.
Server init
```
**8.** Para probar los endpoints abre Postman, dale al botón 'Importar' y selecciona el archivo 'delilah-resto-endpoints.postman_collection.json'

**9.** Comienza creando un usuario administrador, logueate y copia el token devuelto, sin las comillas, para acceder a otros endpoints.

**10.** Crea uno o tantos productos desees y voilá! Ya puedes crear una orden con los productos que creaste.

---
## A continuación todos los endopoints y que hacen ⚙️

### **Método GET**

/products --- _De acceso público._ --- Devuelve la lista de productos disponibles.

/products/:productId --- _De acceso público._ --- Devuelve un producto por ID.

/customers --- _Accede un administrador logueado._ --- Devuelve la lista de usuarios registrados.

/orders --- _Accede un administrador logueado._ --- Devuelve la lista de pedidos realizados.

/orders/:userId --- _Accede un usuario logueado._ --- Devuelve los pedidos realizados por el usuario logueado.

### **Método POST**

/products --- _Accede un administrador logueado._ --- Crea un nuevo producto.
```
{
	"productName": "Banana Split",
	"price": 20,
	"units": 15
}
```

/customers --- _De acceso público._ --- Crea un nuevo usuario. En userRole escribe 0 y si la cuenta es de un administrador escribe 1.
```
{
    "username": "Black-Pand4",
    "fullname": "Black Panda",
    "email": "blackpanda@gmail.com",
    "phone": 157445879,
    "address": "True 2588, 1627",
    "password": "098pa0475ad",
    "userRole": 1
}
```
/login --- _De acceso público._ --- Devuelve un token necesario para acceder a otros endpoints.
```
{
	"username": "Black-Pand4",
	"password": "098pa0475ad"
}
```

/orders --- _Accede un usuario logueado._ --- Crea un nuevo pedido.
```
{
	"paymentType": "Cash",
	"date": "2020-05-13",
	"time": "14:07:00",
	"productId": [1, 2],
	"quantity": [2, 3]
}
```

### **Método PUT**

/products/:productId --- _Accede un administrador logueado._ --- Actualiza el precio y cantidad de un producto.
```
{
	"price": 100,
	"units": 25
}
```
/customers/:email --- _Accede un usuario logueado._ --- Actualiza el nombre, teléfono y dirección de un usuario acorde al correo insertado.
```
{
    "fullname": "Big Cat Lover",
    "phone": 1144665502,
    "address": "Love 780, 5588"
}
```
/orders/:orderId --- _Accede un administrador logueado._ --- Actualiza el estado de un pedido. Por defecto las ordenes están en 'Confirmed' y sólo pueden ser 4 opciones, escritas del siguiente modo: 'Confirmed', 'Preparing', 'Sending', 'Delivered'
```
{
	"orderStatus": "Sending"
}
```

### **Método DELETE**

/products/:productId --- _Accede un administrador logueado._ --- Borra un producto por ID.

/orders/:orderId --- _Accede un administrador logueado._ --- Borra un pedido por el ID.

---
## Construido con 🛠️

_En este proyecto se usó:_

* [Express](https://www.npmjs.com/package/express) - Framework web de node.
* [Sequelize](https://www.npmjs.com/package/sequelize) - Dependencia para conectar Node con una base de datos.
* [mysql2](https://www.npmjs.com/package/mysql2) - Dependencia para usar mysql en Node.
* [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken) - Dependencia que genera un token de acceso seguro.
* [Nodemon](https://www.npmjs.com/package/nodemon) - Herramienta que automáticamente reinicia el servidor al hacer cambios.
* [Swagger](https://swagger.io/) - Herramienta para diseñar la documentación de una API.
---
## Documentación 📖

Puedes encontrar la documentación en: \documentation\index.html

---
## Expresiones de Gratitud 🎁

* Gracias a mis compañeros de curso y mentores de @Acámica y @Globant
* Si te gustó, coméntalo. 📢

---
⌨️ con ❤️ por [martinezga](https://github.com/martinezga) 😊
