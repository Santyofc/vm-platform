CREATE TYPE "public"."invitation_status" AS ENUM('pending', 'accepted', 'revoked', 'expired');--> statement-breakpoint
ALTER TYPE "public"."organization_role" ADD VALUE 'viewer';--> statement-breakpoint
ALTER TYPE "public"."organization_role" ADD VALUE 'billing';--> statement-breakpoint
CREATE TABLE "org_activity_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"actor_id" uuid,
	"action" text NOT NULL,
	"entity_type" text,
	"entity_id" text,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "org_invitations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"email" text NOT NULL,
	"role" "organization_role" DEFAULT 'member' NOT NULL,
	"invited_by" uuid,
	"token" text NOT NULL,
	"status" "invitation_status" DEFAULT 'pending' NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"accepted_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "org_invitations_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "rate_limits" (
	"key" text PRIMARY KEY NOT NULL,
	"tokens" integer NOT NULL,
	"reset_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "memberships" DROP CONSTRAINT "memberships_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "memberships" ALTER COLUMN "joined_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "memberships" ALTER COLUMN "joined_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "organizations" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "organizations" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password_hash" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "memberships" ADD COLUMN "status" text DEFAULT 'active' NOT NULL;--> statement-breakpoint
ALTER TABLE "memberships" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "slug" text;--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "org_activity_logs" ADD CONSTRAINT "org_activity_logs_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "org_invitations" ADD CONSTRAINT "org_invitations_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_org_activity_logs_org_id" ON "org_activity_logs" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_org_activity_logs_actor_id" ON "org_activity_logs" USING btree ("actor_id");--> statement-breakpoint
CREATE INDEX "idx_org_activity_logs_action" ON "org_activity_logs" USING btree ("action");--> statement-breakpoint
CREATE INDEX "idx_org_activity_logs_created_at_desc" ON "org_activity_logs" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_org_activity_logs_org_created" ON "org_activity_logs" USING btree ("organization_id","created_at");--> statement-breakpoint
CREATE INDEX "idx_org_invitations_org_id" ON "org_invitations" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_org_invitations_email" ON "org_invitations" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_org_invitations_status" ON "org_invitations" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_org_invitations_token" ON "org_invitations" USING btree ("token");--> statement-breakpoint
CREATE INDEX "idx_org_invitations_expires_at" ON "org_invitations" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "idx_rate_limits_reset_at" ON "rate_limits" USING btree ("reset_at");--> statement-breakpoint
CREATE INDEX "idx_memberships_user_id" ON "memberships" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_memberships_org_id" ON "memberships" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_memberships_user_id_org_id" ON "memberships" USING btree ("user_id","organization_id");--> statement-breakpoint
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_slug_unique" UNIQUE("slug");