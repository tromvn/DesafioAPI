# Ragnarok API 🎮

API REST para gestionar información de monstruos del juego Ragnarok Online. Consume datos de una API pública y permite operaciones CRUD avanzadas.

## 🚀 Tecnologías

- **Node.js** v18+
- **NestJS** - Framework backend
- **TypeScript** - Tipado estático
- **MongoDB** + **Mongoose** - Base de datos NoSQL
- **Axios** - Cliente HTTP para APIs externas
- **class-validator** - Validación de datos

## 📋 Características

- ✅ CRUD completo de monstruos
- ✅ Importación desde API pública de Ragnarok
- ✅ Script de carga masiva configurable
- ✅ Validación de datos
- ✅ Manejo de errores HTTP
- ✅ Conexión a MongoDB

## 📁 Estructura del Proyecto

src/
├── common/
│ └── helpers/ # Utilidades compartidas
├── monsters/
│ ├── dto/ # Data Transfer Objects
│ ├── schemas/ # Schemas de MongoDB
│ ├── monsters.controller.ts
│ ├── monsters.service.ts
│ └── monsters.module.ts
├── scripts/ # Scripts de utilidad
└── app.module.ts # Módulo principal
text


## 🛠️ Instalación

### 1. Clonar el repositorio
```bash
git clone <tu-repositorio>
cd desafio-api

2. Instalar dependencias
bash

npm install

3. Configurar variables de entorno

Crea un archivo .env en la raíz:
env

MONGODB_URI=mongodb://localhost:27017/ragnarok
PORT=3000

4. Iniciar MongoDB
bash

# Si usas Docker
docker-compose up -d mongodb

# Si tienes MongoDB instalado localmente
# Asegúrate de que el servicio esté corriendo

🚀 Uso
Modo desarrollo
bash

npm run start:dev

Modo producción
bash

npm run build
npm run start:prod

Importar datos iniciales
bash

# Importar un rango de monstruos (recomendado: máximo 50 IDs)
npm run seed 1000 1050

# Ejemplo de uso
npm run seed 1001 1020

📡 Endpoints
Monstruos
Método	Endpoint	Descripción
GET	/monsters	Listar todos los monstruos
GET	/monsters/:id	Obtener un monstruo por ID de MongoDB
POST	/monsters	Crear un monstruo manualmente
PUT	/monsters/:id	Actualizar un monstruo
DELETE	/monsters/:id	Eliminar un monstruo
POST	/monsters/import/:apiId	Importar de API externa
Importación desde API pública

La API consume datos de: https://ragnapi.com/api/v1/re-newal/monsters/[monster_id]

Ejemplo de petición:
bash

curl -X POST http://localhost:3000/monsters/import/1002

Respuesta exitosa:
json

{
  "_id": "60daa0cfd8debd76e414e03d",
  "apiId": 1002,
  "name": "Poring",
  "level": 1,
  "hp": 50,
  "baseExp": 2,
  "jobExp": 1,
  "drops": [
    {"itemName": "Jellopy", "chance": 70},
    {"itemName": "Apple", "chance": 10}
  ],
  "createdAt": "2024-12-13T02:30:00.000Z",
  "updatedAt": "2024-12-13T02:30:00.000Z"
}

🧪 Testing
1. Verificar que el servidor funciona
bash

curl http://localhost:3000/monsters

2. Crear un monstruo manualmente
bash

curl -X POST http://localhost:3000/monsters \
  -H "Content-Type: application/json" \
  -d '{
    "apiId": 9999,
    "name": "Monstruo de prueba",
    "level": 10,
    "hp": 100
  }'

3. Importar desde API externa
bash

curl -X POST http://localhost:3000/monsters/import/1004

4. Usar Postman/Insomnia

Importa la colección de Postman (si la creas) o usa los ejemplos anteriores.
🔄 Git Workflow

Usamos un flujo de trabajo basado en Git Flow:
text

main (producción)
  ↓
development (integración)
  ↓
feature/* (nuevas funcionalidades)
fix/* (correcciones de bugs)
release/* (preparación de releases)

Convención de commits

    feat: Nueva funcionalidad

    fix: Corrección de bugs

    docs: Documentación

    refactor: Refactorización

    test: Tests

    chore: Tareas de mantenimiento

Ejemplo de workflow
bash

# Crear nueva funcionalidad
git checkout development
git checkout -b feature/nueva-funcionalidad

# Trabajar, hacer commits...
git add .
git commit -m "feat: descripción de la funcionalidad"

# Merge a development
git checkout development
git merge feature/nueva-funcionalidad
git branch -d feature/nueva-funcionalidad

🐳 Docker (Opcional)
Docker Compose para desarrollo
bash

# Levantar MongoDB
docker-compose up -d mongodb

# Levantar la aplicación
npm run start:dev

Dockerizar la aplicación
bash

# Construir la imagen
docker build -t ragnarok-api .

# Ejecutar el contenedor
docker run -p 3000:3000 --env-file .env ragnarok-api

📊 Script de Importación

El script de importación maneja diferentes casos:

    ✓ Importado exitosamente

    ⊘ Ya existe en la base de datos

    ○ No encontrado en la API externa

    ✗ Error al procesar

Ejemplo de uso:
bash

npm run seed 1000 1020

Consejo: Limita los rangos a 50 IDs máximo para evitar saturar la API externa.
🤝 Contribuir

    Fork el proyecto

    Crea una rama (git checkout -b feature/AmazingFeature)

    Commit tus cambios (git commit -m 'feat: Add AmazingFeature')

    Push a la rama (git push origin feature/AmazingFeature)

    Abre un Pull Request