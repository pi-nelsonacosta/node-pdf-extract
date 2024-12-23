# node-pdf-extract

Este proyecto es una aplicación que permite extraer datos de un PDF y almacenarlos en una base de datos. El objetivo es facilitar la extracción de datos de documentos PDF para la gestión de información en una aplicación.

## Requerimientos

- Node.js
- NPM
- MySQL
- MongoDB

## Instalación

1. Clonar el repositorio en tu computadora.
2. Abrir una terminal en la carpeta del proyecto.
3. Ejecutar el siguiente comando para instalar las dependencias necesarias:

```bash
npm install
```

4. Crear un archivo `.env` en la carpeta del proyecto con las siguientes variables de entorno:

```bash
DB_HOST=localhost
DB_USER=user
DB_PASSWORD=password
DB_DATABASE=document_db 
DB_PORT=3306
```

5. Ejecutar el siguiente comando para crear la base de datos y la tabla correspondiente:    

```bash
npm run db:migrate
```

6. Ejecutar el siguiente comando para inicializar la base de datos y crear la tabla correspondiente:    

```bash
npm run db:seed
```

7. Ejecutar el siguiente comando para iniciar el servidor de Node.js:

```bash
npm start
```

## Uso

Para utilizar el servidor de Node.js, abra una terminal en la carpeta del proyecto y ejecutar el siguiente comando:

```bash
npm run dev
```

Este comando iniciará el servidor de Node.js en modo de desarrollo. Puedes acceder a la aplicación en la dirección `http://localhost:3000/`.

## Ejecucion de Docker Compose

Para ejecutar el proyecto en un entorno de desarrollo, puedes utilizar Docker Compose. Sigue estos pasos:

1. Abre una terminal en la carpeta del proyecto.
2. Ejecuta el siguiente comando para iniciar el servidor de Node.js en modo de desarrollo:

```bash
docker-compose up
```

Este comando iniciará el servidor de Node.js en modo de desarrollo y creará los contenedores necesarios para el funcionamiento del proyecto.

3. Abre una segunda terminal en la carpeta del proyecto.
4. Ejecuta el siguiente comando para iniciar la base de datos y crear la tabla correspondiente:

```bash
docker-compose exec app npm run db:seed
```

5. Ejecuta el siguiente comando para iniciar el servidor de Node.js en modo de desarrollo:

```bash
docker-compose exec app npm run dev
```

Este comando iniciará el servidor de Node.js en modo de desarrollo y creará los contenedores necesarios para el funcionamiento del proyecto.

## Contribuciones

Si deseas contribuir al proyecto, puedes hacerlo de varias maneras:

- Reportando errores o sugiriendo mejoras en la documentación.
- Haciendo solicitudes de funcionalidades o parches.
- Contribuyendo código.

Si deseas contribuir código, sigue estos pasos:

1. Abre una terminal en la carpeta del proyecto.
2. Ejecuta el siguiente comando para clonar el repositorio:

```bash
git clone https://github.com/your-username/node-pdf-extract.git
```

3. Abre una segunda terminal en la carpeta del proyecto.
4. Ejecuta el siguiente comando para instalar las dependencias necesarias:

```bash
npm install
```

5. Ejecuta el siguiente comando para crear la base de datos y la tabla correspondiente:

```bash
npm run db:migrate
```

6. Ejecuta el siguiente comando para inicializar la base de datos y crear la tabla correspondiente:

```bash
npm run db:seed
```

7. Ejecuta el siguiente comando para iniciar el servidor de Node.js:

```bash
npm start
```             

## Licencia 

Este proyecto está licenciado bajo la licencia MIT. Puedes encontrar más información sobre la licencia en el archivo `LICENSE`. 
