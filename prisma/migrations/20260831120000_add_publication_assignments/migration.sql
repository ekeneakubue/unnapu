-- CreateEnum
CREATE TYPE "AssessmentStatus" AS ENUM ('PENDING', 'COMPLETED');

-- CreateTable
CREATE TABLE "publication_assignments" (
    "id" TEXT NOT NULL,
    "publicationId" TEXT NOT NULL,
    "assessorId" TEXT NOT NULL,
    "status" "AssessmentStatus" NOT NULL DEFAULT 'PENDING',
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "publication_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "publication_assignments_publicationId_assessorId_key" ON "publication_assignments"("publicationId", "assessorId");

-- AddForeignKey
ALTER TABLE "publication_assignments" ADD CONSTRAINT "publication_assignments_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "publications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publication_assignments" ADD CONSTRAINT "publication_assignments_assessorId_fkey" FOREIGN KEY ("assessorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
