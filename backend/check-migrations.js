const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  const migrations = await p.$queryRaw`SELECT * FROM _prisma_migrations ORDER BY finished_at`;
  console.log('Applied migrations:');
  migrations.forEach(m => console.log(` - ${m.migration_name} (${m.finished_at})`));
}

main()
  .catch(e => console.error(e))
  .finally(() => p.$disconnect());
