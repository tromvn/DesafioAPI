# Ragnarok API

API REST para gestionar información de monstruos del juego Ragnarok Online.

## Instalación
```bash
npm install
```

## Configuración

Crea un archivo `.env` en la raíz:
```
MONGODB_URI=mongodb://localhost:27017/ragnarok
PORT=3000
```

## Ejecutar la aplicación
```bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm run build
npm run start:prod
```

## Cargar datos iniciales

Para importar monstruos desde la API pública, usa el siguiente comando:
```bash
npm run seed  
```

**Ejemplos:**
```bash
# Importar monstruos del 1000 al 1050
npm run seed 1000 1050

# Importar monstruos del 1200 al 1250
npm run seed 1200 1250
```

**Recomendaciones:**
- No usar rangos mayores a 50 IDs para evitar saturar la API externa
- Algunos IDs no existen en la API (aparecerán como "No encontrado")
- Los monstruos duplicados se omitirán automáticamente

**Salida del script:**
- `✓` Monstruo importado exitosamente
- `⊘` Monstruo ya existe en la base de datos
- `○` ID no encontrado en la API externa
- `✗` Error al procesar el ID

## Endpoints disponibles

### Monsters

- `GET /monsters` - Listar todos los monstruos
- `GET /monsters/:id` - Obtener un monstruo por ID
- `POST /monsters` - Crear un monstruo manualmente
- `PUT /monsters/:id` - Actualizar un monstruo
- `DELETE /monsters/:id` - Eliminar un monstruo
- `POST /monsters/import/:apiId` - Importar un monstruo desde la API externa

## Tecnologías

- NestJS
- MongoDB
- Mongoose
- TypeScript