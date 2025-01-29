# 🛒 E-Commerce Backend  

Backend para una aplicación de e-commerce con autenticación, gestión de productos, carrito de compras, sistema de chat en tiempo real y notificaciones por correo.

## 🚀 Tecnologías Utilizadas
- **Node.js**  
- **Express.js**  
- **MongoDB + Mongoose**  
- **JWT (Json Web Token)**  
- **Bcrypt** (Encriptación de contraseñas)  
- **Websockets** (Comunicación en tiempo real)  
- **EJS** (Vistas)  
- **Dotenv** (Configuración externa)  
- **Nodemailer** (Correos electrónicos)
- **Multer** (Subida de archivos) 

## 📌 Funcionalidades  

### 🏪 Gestión de Productos  
- Listar todos los productos (`GET /productos`)  
- Filtrar productos por categoría (`GET /productos/:categoria`)  
- Ver detalles de un producto (`GET /productos/:id`)  
- Crear un nuevo producto (`POST /productos`)  
- Editar un producto (`PUT /productos/:id`)  
- Eliminar un producto (`DELETE /productos/:id`)  

### 🛒 Carrito de Compras  
- Agregar productos al carrito (`POST /carrito`)  
- Ver el carrito (`GET /carrito`)  
- Modificar cantidad de productos (`PUT /carrito/:id`)  
- Eliminar producto del carrito (`DELETE /carrito/:id`)  

### 📦 Órdenes de Compra  
- Crear una orden (`POST /orden`)  
- Ver todas las órdenes (`GET /orden`)  

### 🔐 Autenticación y Usuarios  
- Registro de usuario (`POST /auth/register`)  
- Login con JWT (`POST /auth/login`)  
- Ver perfil del usuario (`GET /auth/perfil`)  

### 💬 Chat en Tiempo Real  
- Enviar mensajes (`POST /chat`)  
- Ver todos los mensajes (`GET /chat`)  
- Ver mensajes por usuario (`GET /chat/:email`)  

### 📩 Notificaciones por Correo  
- Correo de confirmación tras registro  
- Correo con detalles de la orden de compra  

## 🛠 Configuración  
1. Clonar este repositorio:  
   ```sh
   git clone https://github.com/agusmando/sierraStore
