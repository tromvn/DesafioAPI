db = db.getSiblingDB('ragnarok');

// Crear usuario para la aplicación
db.createUser({
  user: 'app_user',
  pwd: 'app_password',
  roles: [
    {
      role: 'readWrite',
      db: 'ragnarok',
    },
  ],
});

// Crear colección inicial
db.createCollection('monsters');
db.monsters.createIndex({ apiId: 1 }, { unique: true });