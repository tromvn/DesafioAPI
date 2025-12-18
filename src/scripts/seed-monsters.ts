/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module.ts';
import { MonstersService } from '../monsters/monsters.service.ts';

async function bootstrap() {
  // Obtener argumentos de la línea de comandos
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    console.error('❌ Error: Se requieren exactamente 2 argumentos');
    console.log('\nUso: npm run seed <ID_INICIO> <ID_FIN>');
    console.log('Ejemplo: npm run seed 1000 1050');
    console.log('\n⚠️  Recomendación: No usar rangos mayores a 50 IDs');
    process.exit(1);
  }

  const startId = parseInt(args[0]);
  const endId = parseInt(args[1]);

  // Validaciones
  if (isNaN(startId) || isNaN(endId)) {
    console.error('❌ Error: Los argumentos deben ser números válidos');
    process.exit(1);
  }

  if (startId > endId) {
    console.error(
      '❌ Error: El ID de inicio debe ser menor o igual al ID final',
    );
    process.exit(1);
  }

  const rangeSize = endId - startId + 1;
  if (rangeSize > 50) {
    console.warn(
      `⚠️  Advertencia: Rango de ${rangeSize} IDs es mayor al recomendado (50)`,
    );
    console.warn('   Esto puede tardar varios minutos...\n');
  }

  // Crear array de IDs
  const monsterIds = Array.from({ length: rangeSize }, (_, i) => startId + i);

  const app = await NestFactory.createApplicationContext(AppModule);
  const monstersService = app.get(MonstersService);

  console.log(
    `\n🔄 Iniciando importación de ${monsterIds.length} IDs (${startId} - ${endId})...\n`,
  );

  // Arrays para tracking
  const imported: number[] = [];
  const skipped: number[] = [];
  const notFound: number[] = [];
  const errors: Array<{ id: number; message: string }> = [];

  // Función helper para delay
  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Procesar cada ID
  for (let i = 0; i < monsterIds.length; i++) {
    const apiId = monsterIds[i];

    try {
      const monster = await monstersService.importFromExternalApi(apiId);
      console.log(
        `✓ [${i + 1}/${monsterIds.length}] Importado: ${monster.name} (ID: ${apiId})`,
      );
      imported.push(apiId);
    } catch (error) {
      if (error.status === 409) {
        // Ya existe en la BD
        console.log(`⊘ [${i + 1}/${monsterIds.length}] Ya existe: ID ${apiId}`);
        skipped.push(apiId);
      } else if (error.status === 404) {
        // No existe en la API externa
        console.log(
          `○ [${i + 1}/${monsterIds.length}] No encontrado: ID ${apiId}`,
        );
        notFound.push(apiId);
      } else {
        // Otro error
        console.log(
          `✗ [${i + 1}/${monsterIds.length}] Error: ID ${apiId} - ${error.message}`,
        );
        errors.push({ id: apiId, message: error.message });
      }
    }

    // Delay de 100ms entre peticiones para no saturar la API
    if (i < monsterIds.length - 1) {
      await delay(100);
    }
  }

  // Resumen final
  console.log('\n' + '='.repeat(50));
  console.log('📊 RESUMEN DE IMPORTACIÓN');
  console.log('='.repeat(50));
  console.log(`✓ Importados exitosamente: ${imported.length}`);
  console.log(`⊘ Ya existían en BD: ${skipped.length}`);
  console.log(`○ No encontrados en API: ${notFound.length}`);
  console.log(`✗ Errores: ${errors.length}`);
  console.log(`📋 Total procesados: ${monsterIds.length}`);
  console.log('='.repeat(50));

  // Mostrar IDs importados
  if (imported.length > 0) {
    console.log(`\n✓ IDs importados (${imported.length}):`);
    console.log(imported.join(', '));
  }

  // Mostrar errores si los hay
  if (errors.length > 0) {
    console.log(`\n✗ Errores detallados (${errors.length}):`);
    errors.forEach((err) => {
      console.log(`  - ID ${err.id}: ${err.message}`);
    });
  }

  await app.close();
}

bootstrap();
