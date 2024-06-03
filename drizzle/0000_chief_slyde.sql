DO $$ BEGIN
 CREATE TYPE "public"."userRole" AS ENUM('Łatwy', 'Średni', 'Trudny', 'Expert');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question" (
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"quizId" varchar NOT NULL,
	CONSTRAINT "question_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quiz" (
	"id" varchar PRIMARY KEY NOT NULL,
	"slug" varchar,
	"title" varchar NOT NULL,
	"description" varchar NOT NULL,
	"quizLevel" "userRole" DEFAULT 'Łatwy' NOT NULL,
	CONSTRAINT "quiz_id_unique" UNIQUE("id"),
	CONSTRAINT "quiz_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question" ADD CONSTRAINT "question_quizId_quiz_id_fk" FOREIGN KEY ("quizId") REFERENCES "public"."quiz"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
