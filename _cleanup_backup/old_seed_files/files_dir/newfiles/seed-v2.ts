/**
 * Prisma Seed File for ISO 9001:2015 Self-Assessment Platform
 * 
 * SCORING SCALE: 0-5
 * 0 = Not Applicable (N/A)
 * 1 = Non-compliant
 * 2 = Initial
 * 3 = Developing
 * 4 = Established
 * 5 = Optimizing
 * 
 * Usage:
 *   npx prisma db seed
 */

import { PrismaClient } from '@prisma/client';
import { standardSections, auditQuestions } from './iso9001-seed-data-v2';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting ISO 9001:2015 seed (0-5 scoring scale)...\n');

  // Clear existing data
  console.log('🗑️  Clearing existing data...');
  await prisma.auditQuestion.deleteMany();
  await prisma.standardSection.deleteMany();

  // Seed StandardSections
  console.log('📚 Seeding StandardSections...');
  const sectionMap = new Map<string, number>();

  for (const section of standardSections) {
    const created = await prisma.standardSection.create({
      data: {
        sectionNumber: section.sectionNumber,
        title: section.title,
        description: section.description,
      },
    });
    sectionMap.set(section.sectionNumber, created.id);
    console.log(`   ✓ ${section.sectionNumber} - ${section.title}`);
  }

  console.log(`\n✅ Created ${standardSections.length} StandardSections\n`);

  // Seed AuditQuestions
  console.log('❓ Seeding AuditQuestions (0-5 scale)...');
  let questionCount = 0;

  for (const question of auditQuestions) {
    const sectionId = sectionMap.get(question.sectionNumber);
    
    if (!sectionId) {
      console.warn(`   ⚠️ Section not found for: ${question.sectionNumber}`);
      continue;
    }

    await prisma.auditQuestion.create({
      data: {
        sectionId: sectionId,
        standardReference: question.standardReference,
        standardText: question.standardText,
        auditQuestion: question.auditQuestion,
        score0Criteria: question.score0Criteria,
        score1Criteria: question.score1Criteria,
        score2Criteria: question.score2Criteria,
        score3Criteria: question.score3Criteria,
        score4Criteria: question.score4Criteria,
        score5Criteria: question.score5Criteria,
      },
    });
    questionCount++;
  }

  console.log(`\n✅ Created ${questionCount} AuditQuestions\n`);

  // Summary
  console.log('═══════════════════════════════════════════════════════════');
  console.log('  ISO 9001:2015 SEED COMPLETE (0-5 SCORING SCALE)');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`  StandardSections: ${standardSections.length}`);
  console.log(`  AuditQuestions:   ${questionCount}`);
  console.log('');
  console.log('  SCORING SCALE:');
  console.log('  0 = Not Applicable (N/A)');
  console.log('  1 = Non-compliant - No evidence');
  console.log('  2 = Initial - Awareness but no formal implementation');
  console.log('  3 = Developing - Partially implemented, inconsistent');
  console.log('  4 = Established - Fully implemented, consistent');
  console.log('  5 = Optimizing - Exceeds requirements, continual improvement');
  console.log('═══════════════════════════════════════════════════════════\n');

  // Print clause breakdown
  console.log('📊 Questions per Clause:');
  const clauseCounts = auditQuestions.reduce((acc, q) => {
    const mainClause = q.sectionNumber.split('.')[0];
    acc[mainClause] = (acc[mainClause] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  Object.entries(clauseCounts).forEach(([clause, count]) => {
    const section = standardSections.find(s => s.sectionNumber === clause);
    console.log(`   Clause ${clause} (${section?.title}): ${count} questions`);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
