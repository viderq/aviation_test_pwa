// Получаем элементы страницы
const questionText = document.getElementById("questionText");
const answersContainer = document.querySelector(".question-card");
let nextBtn = document.getElementById("nextBtn");
let prevBtn = document.getElementById("prevBtn");
let currentQuestionEl = document.getElementById("currentQuestion");
const progress = document.querySelector(".progress");
var mode = 0;
// Массив для хранения ответов пользователя
let userAnswers = [];

// 📌 Словарь из 36 вопросов
const questions = {
    "Определите высоту по давлению на аэродроме с превышением 3563 MSL и QNH 29.96.": [{"3556 фут MSL": false}, {"3527 фут MSL": true}, {"3639 фут MSL": false}],
    "Что такое абсолютная высота?": [{"Высота над стандартной плоскостью отсчета": false}, {"Расстояние по вертикали от воздушного судна до поверхности": false}, {"Высота над средним уровнем моря": true}],
    "Что такое истинная высота?": [{"Непосредственно считываемое с высотомера значение": false}, {"Расстояние по вертикали от воздушного судна до поверхности": true}, {"Высота над стандартной плоскостью отсчета": false}],
    "Подверженность отравлению моноксидом углерода увеличивается ...": [{"с ростом высоты": true}, {"с понижением высоты": false}, {"с увеличением атмосферного давления": false}],
    "Вопрос 5": [{"Ответ 0": false}, {"Ответ 1": false}, {"Ответ 2": true}],
    "Вопрос 6": [{"Ответ A": false}, {"Ответ B": true}, {"Ответ C": false}],
    "Вопрос 7": [{"Ответ X": true}, {"Ответ Y": false}, {"Ответ Z": false}],
    "Вопрос 8": [{"Ответ 1": false}, {"Ответ 2": false}, {"Ответ 3": true}],
    "Вопрос 9": [{"Ответ A1": false}, {"Ответ A2": true}, {"Ответ A3": false}],
    "Вопрос 10": [{"Ответ 0": false}, {"Ответ 1": false}, {"Ответ 2": true}],
    "Вопрос 11": [{"Ответ A": false}, {"Ответ B": true}, {"Ответ C": false}],
    "Вопрос 12": [{"Ответ X": true}, {"Ответ Y": false}, {"Ответ Z": false}],
    "Вопрос 13": [{"Ответ 1": false}, {"Ответ 2": false}, {"Ответ 3": true}],
    "Вопрос 14": [{"Ответ A1": false}, {"Ответ A2": true}, {"Ответ A3": false}],
    "Вопрос 15": [{"Ответ 0": false}, {"Ответ 1": false}, {"Ответ 2": true}],
    "Вопрос 16": [{"Ответ A": false}, {"Ответ B": true}, {"Ответ C": false}],
    "Вопрос 17": [{"Ответ X": true}, {"Ответ Y": false}, {"Ответ Z": false}],
    "Вопрос 18": [{"Ответ 1": false}, {"Ответ 2": false}, {"Ответ 3": true}],
    "Вопрос 19": [{"Ответ A1": false}, {"Ответ A2": true}, {"Ответ A3": false}],
    "Вопрос 20": [{"Ответ 0": false}, {"Ответ 1": false}, {"Ответ 2": true}],
    "Вопрос 21": [{"Ответ A": false}, {"Ответ B": true}, {"Ответ C": false}],
    "Вопрос 22": [{"Ответ X": true}, {"Ответ Y": false}, {"Ответ Z": false}],
    "Вопрос 23": [{"Ответ 1": false}, {"Ответ 2": false}, {"Ответ 3": true}],
    "Вопрос 24": [{"Ответ A1": false}, {"Ответ A2": true}, {"Ответ A3": false}],
    "Вопрос 25": [{"Ответ 0": false}, {"Ответ 1": false}, {"Ответ 2": true}],
    "Вопрос 26": [{"Ответ A": false}, {"Ответ B": true}, {"Ответ C": false}],
    "Вопрос 27": [{"Ответ X": true}, {"Ответ Y": false}, {"Ответ Z": false}],
    "Вопрос 28": [{"Ответ 1": false}, {"Ответ 2": false}, {"Ответ 3": true}],
    "Вопрос 29": [{"Ответ A1": false}, {"Ответ A2": true}, {"Ответ A3": false}],
    "Вопрос 30": [{"Ответ 0": false}, {"Ответ 1": false}, {"Ответ 2": true}],
    "Вопрос 31": [{"Ответ A": false}, {"Ответ B": true}, {"Ответ C": false}],
    "Вопрос 32": [{"Ответ X": true}, {"Ответ Y": false}, {"Ответ Z": false}],
    "Вопрос 33": [{"Ответ 1": false}, {"Ответ 2": false}, {"Ответ 3": true}],
    "Вопрос 34": [{"Ответ A1": false}, {"Ответ A2": true}, {"Ответ A3": false}],
    "Вопрос 35": [{"Ответ 0": false}, {"Ответ 1": false}, {"Ответ 2": true}],
    "Вопрос 36": [{"Ответ A": false}, {"Ответ B": true}, {"Ответ C": false}]
};

// Преобразуем объект в массив для работы
const questionKeys = Object.keys(questions);
const totalQuestions = questionKeys.length;

// Переменные для отслеживания текущего вопроса
let currentQuestionIndex = 0;
let selectedAnswer = null;

// Логика бокового меню
const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const sidebar = document.getElementById('sidebar');

menuBtn.addEventListener('click', () => {
  sidebar.classList.add('active');
});
closeBtn.addEventListener('click', () => {
  sidebar.classList.remove('active');
});
document.addEventListener('click', (e) => {
  if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
    sidebar.classList.remove('active');
  }
});

// Функция загрузки вопроса (стандартный режим)
function loadQuestion(index) {
    const questionKey = questionKeys[index];
    questionText.textContent = questionKey;
    answersContainer.innerHTML = `<h3 id="questionText">${questionKey}</h3>`;
    questions[questionKey].forEach(answerObj => {
        const [answerText, isCorrect] = Object.entries(answerObj)[0];
        const button = document.createElement("button");
        button.textContent = answerText;
        button.classList.add("answer-option");
        button.dataset.correct = isCorrect;
        answersContainer.appendChild(button);
    });
    currentQuestionEl.textContent = index + 1;
    progress.style.width = `${((index + 1) / totalQuestions) * 100}%`;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = true;
    selectedAnswer = null;
}

// Функция загрузки вопроса (режим "Реальное тестирование")
function loadRandomQuestion(index) {
    const questionKey = window.randomQuestions[index];
    questionText.textContent = questionKey;
    answersContainer.innerHTML = `<h3 id="questionText">${questionKey}</h3>`;
    questions[questionKey].forEach(answerObj => {
        const [answerText, isCorrect] = Object.entries(answerObj)[0];
        const button = document.createElement("button");
        button.textContent = answerText;
        button.classList.add("answer-option");
        button.dataset.correct = isCorrect;
        answersContainer.appendChild(button);
    });
    document.getElementById("currentQuestion").textContent = index + 1;
    progress.style.width = `${((index + 1) / realTestTotal) * 100}%`;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = true;
    selectedAnswer = null;
}

// Загружаем первый вопрос при старте
loadQuestion(currentQuestionIndex);

// Делегирование выбора ответа
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('answer-option')) {
        const selectedOption = event.target;
        const isCorrect = selectedOption.getAttribute('data-correct') === "true";
        const questionCard = selectedOption.closest('.question-card');
        if (questionCard) {
            questionCard.querySelectorAll('.answer-option').forEach(opt => {
                opt.classList.remove('selected', 'true', 'false', 'grey');
            });
        }
        // Если режим реального тестирования, подсвечиваем серым, иначе зеленым или красным
        if (mode === 1) {
            selectedOption.classList.add('selected', 'grey');
        } else {
            selectedOption.classList.add('selected', isCorrect ? 'true' : 'false');
        }
        selectedAnswer = isCorrect;
        nextBtn.disabled = false;
        if (mode === 1) {
            const currentQuestionText = questionText.textContent;
            const answerText = selectedOption.textContent;
            userAnswers[currentQuestionText] = { [answerText]: isCorrect };
        }
    }
});

// Делегирование кнопок "Далее" и "Назад"
// Для кнопки "Далее" требуем, чтобы ответ был выбран,
// а для кнопки "Назад" работаем всегда независимо от выбранного ответа.
document.addEventListener("click", (event) => {
    if (event.target.id === "nextBtn") {
        if (mode === 0 && selectedAnswer !== null) {
            if (currentQuestionIndex + 1 < totalQuestions) {
                currentQuestionIndex++;
            } else {
                currentQuestionIndex = 0;
            }
            loadQuestion(currentQuestionIndex);
        }
        if (mode === 1 && selectedAnswer !== null) {
            if (window.currentRandomQuestionIndex + 1 < window.randomQuestions.length) {
                window.currentRandomQuestionIndex++;
            } else {
                window.currentRandomQuestionIndex = 0;
            }
            loadRandomQuestion(window.currentRandomQuestionIndex);
        }
    }
    if (event.target.id === "prevBtn") {
        if (mode === 0) {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
            } else {
                currentQuestionIndex = totalQuestions - 1;
            }
            loadQuestion(currentQuestionIndex);
        }
        if (mode === 1) {
            if (window.currentRandomQuestionIndex > 0) {
                window.currentRandomQuestionIndex--;
            } else {
                window.currentRandomQuestionIndex = window.randomQuestions.length - 1;
            }
            loadRandomQuestion(window.currentRandomQuestionIndex);
        }
    }
});

// Режимы тестирования
const realTestBtn = document.getElementById("realTestBtn");
const answersTestBtn = document.getElementById("answersTestBtn");

function getRandomQuestions() {
    const shuffledQuestions = [...questionKeys];
    shuffledQuestions.sort(() => 0.5 - Math.random());
    return shuffledQuestions.slice(0, 14);
}

const realTestTotal = 14;

function showRandomQuestions() {
    mode = 1;
    sidebar.classList.remove('active');
    const questionCounter = document.getElementById("questionCounter");
    if (questionCounter) {
        questionCounter.style.marginBottom = '-50px';
    }
    document.getElementById("questionCounter").innerHTML = `
        Вопрос <span id="currentQuestion">1</span>/<span id="finalQuestion">${realTestTotal}</span>
        <br>
        <button class="nav-button finishBtn" id="finishBtn">Закончить</button>
    `;
    const randomQuestions = getRandomQuestions();
    window.randomQuestions = randomQuestions;
    window.currentRandomQuestionIndex = 0;
    answersContainer.innerHTML = '';
    loadRandomQuestion(window.currentRandomQuestionIndex);
}

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("finishBtn")) {
        let correctAnswersCount = 0;
        Object.values(userAnswers).forEach(answer => {
            if (Object.values(answer)[0] === true) {
                correctAnswersCount++;
            }
        });
        alert(`Тест завершён! Вы правильно ответили на ${correctAnswersCount} из ${realTestTotal} вопросов.`);
    }
});

realTestBtn.addEventListener("click", showRandomQuestions);

answersTestBtn.addEventListener("click", () => {
    mode = 0;
    currentQuestionIndex = 0;
    loadQuestion(currentQuestionIndex);
    sidebar.classList.remove('active');
    document.getElementById("nav-container").innerHTML = `
      <button class="nav-button" id="prevBtn" disabled>Назад</button>
      <div id="questionCounter">
          Вопрос <span id="currentQuestion">1</span>/36
          <br>
          <button class="nav-button finishBtn" id="finishBtn" style="display: none;">Закончить</button>
      </div>
      <button class="nav-button" id="nextBtn">Далее</button>`;
    nextBtn = document.getElementById("nextBtn");
    prevBtn = document.getElementById("prevBtn");
    currentQuestionEl = document.getElementById("currentQuestion");
});
