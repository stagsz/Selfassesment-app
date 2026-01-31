import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create test organization
  const org = await prisma.organization.upsert({
    where: { id: "org-test-001" },
    update: {},
    create: {
      id: "org-test-001",
      name: "Test Organization",
    },
  });

  console.log(`✓ Organization created: ${org.id}`);

  // Create test user
  const hashedPassword = await bcryptjs.hash("Test@123456", 10);
  
  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
      passwordHash: hashedPassword,
      firstName: "Test",
      lastName: "User",
      role: "SYSTEM_ADMIN",
      organizationId: org.id,
      isActive: true,
    },
  });

  console.log(`✓ Test user created: ${user.email}`);
  console.log("Seed data completed successfully!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
