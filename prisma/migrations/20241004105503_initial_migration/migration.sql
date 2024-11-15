-- CreateTable
CREATE TABLE "Contact" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255),
    "description" VARCHAR(255),
    "avatar" VARCHAR(255),
    "contactInfo" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);
