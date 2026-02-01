-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "assessment_templates" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "organizationId" TEXT NOT NULL,
    CONSTRAINT "assessment_templates_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "iso_standard_sections" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sectionNumber" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parentId" TEXT,
    CONSTRAINT "iso_standard_sections_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "iso_standard_sections" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'VIEWER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLoginAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "organizationId" TEXT NOT NULL,
    CONSTRAINT "users_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "assessments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "auditType" TEXT NOT NULL DEFAULT 'INTERNAL',
    "scope" TEXT,
    "objectives" TEXT,
    "overallScore" REAL,
    "sectionScores" TEXT,
    "scheduledDate" DATETIME,
    "dueDate" DATETIME,
    "completedDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "organizationId" TEXT NOT NULL,
    "leadAuditorId" TEXT NOT NULL,
    "templateId" TEXT,
    "previousAssessmentId" TEXT,
    CONSTRAINT "assessments_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "assessments_leadAuditorId_fkey" FOREIGN KEY ("leadAuditorId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "assessments_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "assessment_templates" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "assessments_previousAssessmentId_fkey" FOREIGN KEY ("previousAssessmentId") REFERENCES "assessments" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "assessment_team_members" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "role" TEXT NOT NULL DEFAULT 'AUDITOR',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assessmentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "assessment_team_members_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "assessments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "assessment_team_members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "audit_questions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "questionNumber" TEXT NOT NULL,
    "questionText" TEXT NOT NULL,
    "guidance" TEXT,
    "score1Criteria" TEXT,
    "score2Criteria" TEXT,
    "score3Criteria" TEXT,
    "standardReference" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sectionId" TEXT,
    CONSTRAINT "audit_questions_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "iso_standard_sections" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "question_responses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "score" INTEGER,
    "justification" TEXT,
    "isDraft" BOOLEAN NOT NULL DEFAULT true,
    "actionProposal" TEXT,
    "conclusion" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "assessmentId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sectionId" TEXT,
    CONSTRAINT "question_responses_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "assessments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "question_responses_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "audit_questions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "question_responses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "question_responses_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "iso_standard_sections" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "evidence" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "description" TEXT,
    "uploadedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "responseId" TEXT NOT NULL,
    "uploadedById" TEXT NOT NULL,
    CONSTRAINT "evidence_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "question_responses" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "evidence_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "non_conformities" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "identifiedDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rootCause" TEXT,
    "rootCauseMethod" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "assessmentId" TEXT NOT NULL,
    "responseId" TEXT,
    CONSTRAINT "non_conformities_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "assessments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "non_conformities_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "question_responses" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "corrective_actions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "priority" TEXT NOT NULL DEFAULT 'MEDIUM',
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "targetDate" DATETIME,
    "completedDate" DATETIME,
    "verifiedDate" DATETIME,
    "effectivenessNotes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "nonConformityId" TEXT NOT NULL,
    "assignedToId" TEXT,
    "verifiedById" TEXT,
    CONSTRAINT "corrective_actions_nonConformityId_fkey" FOREIGN KEY ("nonConformityId") REFERENCES "non_conformities" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "corrective_actions_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "corrective_actions_verifiedById_fkey" FOREIGN KEY ("verifiedById") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "assessment_templates_organizationId_idx" ON "assessment_templates"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "iso_standard_sections_sectionNumber_key" ON "iso_standard_sections"("sectionNumber");

-- CreateIndex
CREATE INDEX "iso_standard_sections_parentId_idx" ON "iso_standard_sections"("parentId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_organizationId_idx" ON "users"("organizationId");

-- CreateIndex
CREATE INDEX "assessments_organizationId_idx" ON "assessments"("organizationId");

-- CreateIndex
CREATE INDEX "assessments_templateId_idx" ON "assessments"("templateId");

-- CreateIndex
CREATE INDEX "assessments_previousAssessmentId_idx" ON "assessments"("previousAssessmentId");

-- CreateIndex
CREATE INDEX "assessment_team_members_assessmentId_idx" ON "assessment_team_members"("assessmentId");

-- CreateIndex
CREATE INDEX "assessment_team_members_userId_idx" ON "assessment_team_members"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "assessment_team_members_assessmentId_userId_key" ON "assessment_team_members"("assessmentId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "audit_questions_questionNumber_key" ON "audit_questions"("questionNumber");

-- CreateIndex
CREATE INDEX "audit_questions_sectionId_idx" ON "audit_questions"("sectionId");

-- CreateIndex
CREATE INDEX "question_responses_assessmentId_idx" ON "question_responses"("assessmentId");

-- CreateIndex
CREATE INDEX "question_responses_sectionId_idx" ON "question_responses"("sectionId");

-- CreateIndex
CREATE UNIQUE INDEX "question_responses_assessmentId_questionId_key" ON "question_responses"("assessmentId", "questionId");

-- CreateIndex
CREATE INDEX "evidence_responseId_idx" ON "evidence"("responseId");

-- CreateIndex
CREATE INDEX "evidence_uploadedById_idx" ON "evidence"("uploadedById");

-- CreateIndex
CREATE INDEX "non_conformities_assessmentId_idx" ON "non_conformities"("assessmentId");

-- CreateIndex
CREATE INDEX "non_conformities_responseId_idx" ON "non_conformities"("responseId");

-- CreateIndex
CREATE INDEX "corrective_actions_nonConformityId_idx" ON "corrective_actions"("nonConformityId");

-- CreateIndex
CREATE INDEX "corrective_actions_assignedToId_idx" ON "corrective_actions"("assignedToId");

-- CreateIndex
CREATE INDEX "corrective_actions_verifiedById_idx" ON "corrective_actions"("verifiedById");
