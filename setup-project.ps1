# Crear estructura de carpetas
New-Item -ItemType Directory -Path src\config -Force
New-Item -ItemType Directory -Path src\database\entities -Force
New-Item -ItemType Directory -Path src\modules\document-intelligence\controllers -Force
New-Item -ItemType Directory -Path src\modules\document-intelligence\services -Force
New-Item -ItemType Directory -Path src\modules\document-intelligence\dtos -Force
New-Item -ItemType Directory -Path src\shared -Force

# Crear archivos vacíos
New-Item -ItemType File -Path src\main.ts -Force
New-Item -ItemType File -Path src\app.module.ts -Force
New-Item -ItemType File -Path src\config\configuration.ts -Force
New-Item -ItemType File -Path src\config\validation.ts -Force
New-Item -ItemType File -Path src\database\database.module.ts -Force
New-Item -ItemType File -Path src\database\entities\document.entity.ts -Force
New-Item -ItemType File -Path src\modules\document-intelligence\document-intelligence.module.ts -Force
New-Item -ItemType File -Path src\modules\document-intelligence\controllers\document-intelligence.controller.ts -Force
New-Item -ItemType File -Path src\modules\document-intelligence\services\document-intelligence.service.ts -Force
New-Item -ItemType File -Path src\modules\document-intelligence\services\ocr.service.ts -Force
New-Item -ItemType File -Path src\modules\document-intelligence\dtos\document.dto.ts -Force
New-Item -ItemType File -Path src\shared\logger.service.ts -Force
New-Item -ItemType File -Path Dockerfile -Force
New-Item -ItemType File -Path docker-compose.yml -Force
New-Item -ItemType File -Path .env -Force

# Inicializar el proyecto Node.js con un archivo package.json básico
npm init -y

# Instalar las dependencias del proyecto
npm install @nestjs/core @nestjs/common @nestjs/platform-express @nestjs/config tesseract.js openai class-validator class-transformer typeorm winston joi dotenv

# Instalar dependencias de desarrollo
npm install --save-dev @nestjs/testing @types/jest jest ts-jest typescript @nestjs/schematics

Write-Host "Estructura de proyecto creada exitosamente. Ahora copia y pega el contenido proporcionado en los archivos generados."
