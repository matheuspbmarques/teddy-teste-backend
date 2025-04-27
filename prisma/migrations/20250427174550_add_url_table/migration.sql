-- CreateTable
CREATE TABLE "urls" (
    "id" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "shortened" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL,
    "update_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "urls_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "urls" ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
