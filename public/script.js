document.addEventListener('DOMContentLoaded', async () => {
    const testContainer = document.getElementById('test-container');
    const submitButton = document.getElementById('submit-test');
    const modal = document.getElementById('result-modal');
    const closeModal = document.querySelector('.close');
    const resultMessage = document.getElementById('result-message');

    // Backenddan savollarni olish
    const questions = await fetch('/api/test')
        .then(res => res.json())
        .catch(err => console.error(err));

    // Savollarni ko'rsatish
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';

        questionDiv.innerHTML = `
            <h3>${index + 1}. ${q.question}</h3>
            <label><input type="radio" name="question-${q.id}" value="a">a) ${q.options.a}</label><br>
            <label><input type="radio" name="question-${q.id}" value="b">b) ${q.options.b}</label><br>
            <label><input type="radio" name="question-${q.id}" value="c">c) ${q.options.c}</label><br>
            <label><input type="radio" name="question-${q.id}" value="d">d) ${q.options.d}</label>
        `;
        testContainer.appendChild(questionDiv);
    });

    // Testni yuborish
    submitButton.addEventListener('click', async () => {
        const answers = {};
        questions.forEach(q => {
            const selected = document.querySelector(`input[name="question-${q.id}"]:checked`);
            if (selected) {
                answers[q.id] = selected.value;
            }
        });

        const result = await fetch('/api/test/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answers })
        }).then(res => res.json());

        // Foydalanuvchining natijasini ko'rsatish
        resultMessage.textContent = `Siz ${result.score} ta savolni to'g'ri javob berdingiz.`;
        modal.style.display = 'block';
    });

    // Modalni yopish
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Modal tashqarisini bosganda yopish
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});