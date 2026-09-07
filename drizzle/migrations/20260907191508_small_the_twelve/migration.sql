CREATE TABLE "Category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar(255) NOT NULL UNIQUE,
	"slug" varchar(255) NOT NULL UNIQUE
);
--> statement-breakpoint
CREATE TABLE "ResourceNotes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"resourceId" uuid NOT NULL UNIQUE,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"summary" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "Resource" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"title" varchar(255) NOT NULL,
	"topicId" uuid NOT NULL,
	"resourceTypeId" uuid NOT NULL,
	"url" varchar(2048) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ResourceType" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"code" varchar(255) NOT NULL UNIQUE,
	"name" varchar(255) NOT NULL UNIQUE
);
--> statement-breakpoint
CREATE TABLE "SubCategory" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"categoryId" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL UNIQUE
);
--> statement-breakpoint
CREATE TABLE "Topic" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL UNIQUE,
	"categoryId" uuid NOT NULL,
	"subCategoryId" uuid
);
--> statement-breakpoint
ALTER TABLE "ResourceNotes" ADD CONSTRAINT "ResourceNotes_resourceId_Resource_id_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_topicId_Topic_id_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_resourceTypeId_ResourceType_id_fkey" FOREIGN KEY ("resourceTypeId") REFERENCES "ResourceType"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_categoryId_Category_id_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_categoryId_Category_id_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_subCategoryId_SubCategory_id_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE RESTRICT;