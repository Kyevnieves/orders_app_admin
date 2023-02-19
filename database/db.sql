---- CREAR TABLA USUARIOS
CREATE DATABASE database_orders;
USE database_orders;
CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    companyname VARCHAR(100) NULL,
    companyrif VARCHAR(100) NULL,
    companyaddress VARCHAR(100) NULL,
    companyphone VARCHAR(100) NULL,
    companyemail VARCHAR(100) NULL,
    companylogo VARCHAR(250) NULL
)

USE database_orders;
ALTER TABLE users
ADD PRIMARY KEY (id);

USE database_orders;
ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

USE database_orders;
DESCRIBE users;


---- CREANDO USUARIOS CON PERMISOS SUPERUSUARIO
ALTER TABLE `users` ADD `superuser` BOOLEAN NOT NULL AFTER `idorder`;
UPDATE `users` SET `superuser` = '1' WHERE `users`.`id` = 1;



---- CREAR TABLA PRODUCTOS
USE database_orders;
CREATE TABLE products(
    id INT(11) NOT NULL,
    productname VARCHAR(100) NOT NULL,
    productcod VARCHAR(100) NOT NULL,
    productprice VARCHAR(100) NOT NULL,
    productimg VARCHAR(300) NOT NULL,
)

USE database_orders;
ALTER TABLE products
ADD PRIMARY KEY (id);

USE database_orders;
ALTER TABLE products
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

USE database_orders;
DESCRIBE products;

---- CREAR CORRELATIVO DE PEDIDOS PARA USUARIOS
USE database_orders;
ALTER TABLE `users` ADD `idorder` INT NOT NULL AFTER `companylogo`;


---- CREAR TABLA PEDIDOS
USE database_orders;
CREATE TABLE orders(
    id INT(11) NOT NULL,
    companyid INT(11) NOT NULL,
    pedido VARCHAR(1000) NOT NULL,
    procesado BOOLEAN NULL,
    enviado BOOLEAN NULL,
)

USE database_orders;
ALTER TABLE orders
ADD PRIMARY KEY (id);

USE database_orders;
ALTER TABLE orders
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

USE database_orders;
DESCRIBE orders;

---- CURRENT TIMESTAMP EN TABLA ORDENES
ALTER TABLE `orders` ADD `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER `enviado`;
---- CREAR CORRELATIVO DE PEDIDOS PARA USUARIOS
ALTER TABLE `orders` ADD `idcorrelativo` INT NOT NULL AFTER `companyid`;
---- AUMENTAR TAMAÑO DE CARACTERES SOPORTADOS POR COLUMA PEDIDO
ALTER TABLE `orders` CHANGE `pedido` `pedido` VARCHAR(3001) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL;



---- CAMBIAR ESTADO DE ORDEN A ENVIADO EN BASE A LOS IDS EN IN
UPDATE `orders`
   SET `enviado` = NOT `enviado`
 WHERE `id` IN(7,8,9)

---- CAMBIAR ESTADO DE ORDEN A PROCESADO EN BASE A LOS IDS EN IN
UPDATE `orders`
   SET `procesado` = NOT `procesado`
 WHERE `id` IN(7,8,9)
