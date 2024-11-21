const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// JSON faylidan savollarni o'qish funksiyasi
const extractQuestionsFromJson = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf8'); // Faylni yuklash
    return JSON.parse(content); // JSON formatidan obyektga o'tkazish
};

// Tasodifiy savollarni tanlash funksiyasi (25 ta savol)
const getRandomQuestions = (questions, count = 25) => {
    const shuffled = questions.sort(() => 0.5 - Math.random()); // Savollarni aralashtirish
    return shuffled.slice(0, count); // 25 ta tasodifiy savolni tanlash
};

// API: Test savollarini qaytarish
router.get('/', (req, res) => {
    const testFilePath = path.join(__dirname, '../data/test.json'); // JSON faylining yo'li
    const questions = extractQuestionsFromJson(testFilePath);
    const randomQuestions = getRandomQuestions(questions); // Tasodifiy 25 ta savolni olish
    res.json(randomQuestions); // Natijani qaytarish
});

// API: Test natijalarini tekshirish
router.post('/submit', (req, res) => {
    const userAnswers = req.body.answers; // { 1: "a", 2: "b" }
    
    const testFilePath = path.join(__dirname, '../data/test.json'); // JSON faylini qayta o'qing
    const questions = extractQuestionsFromJson(testFilePath); // Savollarni olish
    const randomQuestions = getRandomQuestions(questions); // Tasodifiy 25 ta savolni olish

    let score = 0;

    // Foydalanuvchi javoblarini tekshirish
    randomQuestions.forEach(q => {
        if (userAnswers[q.id] === q.answer) { // Agar foydalanuvchi javobi to'g'ri bo'lsa
            score++;
        }
    });

    res.json({ score }); // Natijani qaytarish (faqat to'g'ri javoblar soni)
});

module.exports = router;
