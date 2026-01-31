const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  const tables = await p.$queryRaw`SELECT name FROM sqlite_master WHERE type='table' ORDER BY name`;
  console.log('Tables in database:');
  tables.forEach(t => console.log(' -', t.name));
}

main()
  .catch(e => console.error(e))
  .finally(() => p.$disconnect());
