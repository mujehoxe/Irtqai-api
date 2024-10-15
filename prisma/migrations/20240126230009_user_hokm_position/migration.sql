-- CreateTable
CREATE TABLE "UserHokmPosition" (
    "userId" TEXT NOT NULL,
    "hokmName" TEXT NOT NULL,
    "position" TEXT NOT NULL DEFAULT 'النظري',

    CONSTRAINT "UserHokmPosition_pkey" PRIMARY KEY ("userId","hokmName")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserHokmPosition_userId_hokmName_key" ON "UserHokmPosition"("userId", "hokmName");

-- AddForeignKey
ALTER TABLE "UserHokmPosition" ADD CONSTRAINT "UserHokmPosition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHokmPosition" ADD CONSTRAINT "UserHokmPosition_hokmName_fkey" FOREIGN KEY ("hokmName") REFERENCES "hokm"("hokmName") ON DELETE CASCADE ON UPDATE CASCADE;
