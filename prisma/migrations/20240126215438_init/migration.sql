-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "currentLevel" INTEGER NOT NULL DEFAULT 1,
    "khatmaProgress" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fav_reader" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "hokm" (
    "hokmName" TEXT NOT NULL,
    "arabicName" TEXT NOT NULL,
    "passPoint" INTEGER NOT NULL DEFAULT 50,

    CONSTRAINT "hokm_pkey" PRIMARY KEY ("hokmName")
);

-- CreateTable
CREATE TABLE "hokmLevel" (
    "type" TEXT NOT NULL,
    "hokmLevelId" SERIAL NOT NULL,
    "details" TEXT,
    "hokmName" TEXT NOT NULL,
    "tajweedVerseId" TEXT,
    "videoUrl" TEXT,

    CONSTRAINT "hokmLevel_pkey" PRIMARY KEY ("hokmLevelId")
);

-- CreateTable
CREATE TABLE "Verse" (
    "verseId" TEXT NOT NULL,
    "chapitre_num" INTEGER NOT NULL,
    "verse_num" INTEGER NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Verse_pkey" PRIMARY KEY ("verseId")
);

-- CreateTable
CREATE TABLE "TajweedVerse" (
    "tajweedVerseId" TEXT NOT NULL,
    "hokmName" TEXT NOT NULL,
    "chapitre_num" INTEGER NOT NULL,
    "verse_num" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,

    CONSTRAINT "TajweedVerse_pkey" PRIMARY KEY ("tajweedVerseId")
);

-- CreateTable
CREATE TABLE "QuizResponse" (
    "quizzId" INTEGER NOT NULL,
    "audio_url" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "QuizResponse_pkey" PRIMARY KEY ("quizzId","userId")
);

-- CreateTable
CREATE TABLE "Quizz" (
    "quizzId" SERIAL NOT NULL,
    "point" INTEGER NOT NULL,
    "chapitre_num" INTEGER NOT NULL,
    "verse_num" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "hokmName" TEXT NOT NULL,

    CONSTRAINT "Quizz_pkey" PRIMARY KEY ("quizzId")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "achievementId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("achievementId")
);

-- CreateTable
CREATE TABLE "_AchievementToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "QuizResponse_quizzId_userId_key" ON "QuizResponse"("quizzId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "_AchievementToUser_AB_unique" ON "_AchievementToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_AchievementToUser_B_index" ON "_AchievementToUser"("B");

-- AddForeignKey
ALTER TABLE "hokmLevel" ADD CONSTRAINT "hokmLevel_hokmName_fkey" FOREIGN KEY ("hokmName") REFERENCES "hokm"("hokmName") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hokmLevel" ADD CONSTRAINT "hokmLevel_tajweedVerseId_fkey" FOREIGN KEY ("tajweedVerseId") REFERENCES "TajweedVerse"("tajweedVerseId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TajweedVerse" ADD CONSTRAINT "TajweedVerse_hokmName_fkey" FOREIGN KEY ("hokmName") REFERENCES "hokm"("hokmName") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizResponse" ADD CONSTRAINT "QuizResponse_quizzId_fkey" FOREIGN KEY ("quizzId") REFERENCES "Quizz"("quizzId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizResponse" ADD CONSTRAINT "QuizResponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quizz" ADD CONSTRAINT "Quizz_hokmName_fkey" FOREIGN KEY ("hokmName") REFERENCES "hokm"("hokmName") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AchievementToUser" ADD CONSTRAINT "_AchievementToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Achievement"("achievementId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AchievementToUser" ADD CONSTRAINT "_AchievementToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
