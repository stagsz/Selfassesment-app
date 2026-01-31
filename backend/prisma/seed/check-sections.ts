import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function check() {
  const sections = await prisma.iSOStandardSection.findMany({
    orderBy: { sectionNumber: 'asc' }
  });
  console.log('Total sections:', sections.length);
  sections.slice(0, 15).forEach(s => console.log(s.sectionNumber + ': ' + s.title));
  await prisma.$disconnect();
}

check();
