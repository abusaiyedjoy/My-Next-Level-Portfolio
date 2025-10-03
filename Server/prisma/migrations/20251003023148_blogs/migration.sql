/*
  Warnings:

  - You are about to drop the column `date` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the `Education` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Skill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SocialLinks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Education" DROP CONSTRAINT "Education_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Skill" DROP CONSTRAINT "Skill_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SocialLinks" DROP CONSTRAINT "SocialLinks_userId_fkey";

-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "date";

-- DropTable
DROP TABLE "public"."Education";

-- DropTable
DROP TABLE "public"."Skill";

-- DropTable
DROP TABLE "public"."SocialLinks";

-- DropTable
DROP TABLE "public"."User";

-- DropEnum
DROP TYPE "public"."SkillCategory";
