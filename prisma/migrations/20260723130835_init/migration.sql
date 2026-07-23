-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "setor" DECIMAL(12,2) NOT NULL,
    "sisa" DECIMAL(12,2) NOT NULL,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pocket" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "total" DECIMAL(12,2) NOT NULL,
    "spent" DECIMAL(12,2) NOT NULL,
    "icon" TEXT NOT NULL DEFAULT 'Wallet',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pocket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "time" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pocket" TEXT NOT NULL,
    "dicatat" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_name_key" ON "Member"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Pocket_name_key" ON "Pocket"("name");

-- CreateIndex
CREATE INDEX "Transaction_type_idx" ON "Transaction"("type");

-- CreateIndex
CREATE INDEX "Transaction_pocket_idx" ON "Transaction"("pocket");

-- CreateIndex
CREATE INDEX "Transaction_dicatat_idx" ON "Transaction"("dicatat");

-- CreateIndex
CREATE INDEX "Transaction_createdAt_idx" ON "Transaction"("createdAt");
