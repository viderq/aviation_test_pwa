    // Получаем элементы страницы
const questionText = document.getElementById("questionText");
const answersContainer = document.querySelector(".question-card");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const currentQuestionEl = document.getElementById("currentQuestion");
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

// 📌 Преобразуем объект в массив для работы
const questionKeys = Object.keys(questions);
const totalQuestions = questionKeys.length;

// 📌 Переменная для отслеживания текущего вопроса
let currentQuestionIndex = 0;
let selectedAnswer = null;

// 📌 Функция для загрузки текущего вопроса
function loadQuestion(index) {
    const questionKey = questionKeys[index]; // Получаем ключ текущего вопроса
    questionText.textContent = questionKey; // Устанавливаем текст вопроса

    // 📌 Очищаем старые ответы
    answersContainer.innerHTML = `<h3 id="questionText">${questionKey}</h3>`;

    // 📌 Добавляем новые варианты ответов
    questions[questionKey].forEach(answerObj => {
        const [answerText, isCorrect] = Object.entries(answerObj)[0]; // Получаем текст ответа и его правильность
        const button = document.createElement("button");
        button.textContent = answerText;
        button.classList.add("answer-option");
        button.dataset.correct = isCorrect; // Сохраняем информацию о правильности ответа


        button.addEventListener("click", () => {
        document.querySelectorAll(".answer-option").forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");
        selectedAnswer = isCorrect;
        nextBtn.disabled = false;

    // Если ответ правильный, увеличиваем счетчик правильных ответов
    if (isCorrect) {
        correctAnswersCount++;
    }
});


        answersContainer.appendChild(button);
    });

    // 📌 Обновляем прогресс и номер вопроса
    currentQuestionEl.textContent = index + 1;
    progress.style.width = `${((index + 1) / totalQuestions) * 100}%`;

    // 📌 Блокируем кнопку "Назад" на первом вопросе
    prevBtn.disabled = index === 0;
    nextBtn.disabled = true;
}

// 📌 Обработчик кнопки "Далее"
nextBtn.addEventListener("click", () => {
    console.log(mode);
    if (mode == 0){
        if (selectedAnswer !== null) {
            // Если текущий вопрос последний, сбрасываем его на первый
            if (currentQuestionIndex + 1 < totalQuestions) {
                currentQuestionIndex++;  // Переходим к следующему вопросу
            } else {
                currentQuestionIndex = 0;  // Сброс на первый вопрос
            }
            loadQuestion(currentQuestionIndex); // Загружаем новый вопрос
        }
       }
});

// 📌 Обработчик кнопки "Назад"
prevBtn.addEventListener("click", () => {
    if (mode == 0){
        if (selectedAnswer !== null) {
            // Если текущий вопрос первый, сбрасываем его на последний
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;  // Переходим к предыдущему вопросу
            } else {
                currentQuestionIndex = totalQuestions - 1;  // Переход к последнему вопросу
            }
            loadQuestion(currentQuestionIndex); // Загружаем новый вопрос
        }
    }
});

// 📌 Функция для загрузки текущего вопроса
function loadQuestion(index) {
    const questionKey = questionKeys[index];  // Получаем ключ текущего вопроса
    questionText.textContent = questionKey;  // Устанавливаем текст вопроса

    // 📌 Очищаем старые ответы
    answersContainer.innerHTML = `<h3 id="questionText">${questionKey}</h3>`;

    // 📌 Добавляем новые варианты ответов
    questions[questionKey].forEach(answerObj => {
        const [answerText, isCorrect] = Object.entries(answerObj)[0];  // Получаем текст ответа и его правильность
        const button = document.createElement("button");
        button.textContent = answerText;
        button.classList.add("answer-option");
        button.dataset.correct = isCorrect;  // Сохраняем информацию о правильности ответа

        button.addEventListener("click", () => {
            document.querySelectorAll(".answer-option").forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
            selectedAnswer = isCorrect;
            nextBtn.disabled = false;
        });

        answersContainer.appendChild(button);
    });

    // 📌 Обновляем прогресс и номер вопроса
    currentQuestionEl.textContent = index + 1;  // Номер текущего вопроса
    progress.style.width = `${((index + 1) / totalQuestions) * 100}%`;  // Обновляем прогресс-бар

    // 📌 Блокируем кнопку "Назад" на первом вопросе
    prevBtn.disabled = index === 0;
    nextBtn.disabled = true;
}



// 📌 Показываем первый вопрос при загрузке страницы
loadQuestion(currentQuestionIndex);


// Логика для бокового меню
const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const sidebar = document.getElementById('sidebar');

menuBtn.addEventListener('click', () => {
  sidebar.classList.add('active'); // Открываем меню
});

closeBtn.addEventListener('click', () => {
  sidebar.classList.remove('active'); // Закрываем меню
});

// Если нужно закрывать меню при клике вне его:
document.addEventListener('click', (e) => {
  if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
    sidebar.classList.remove('active');
  }
});

// 📌 Функция для обновления прогресса
function updateProgress(questionNumber) {
    const progressPercent = ((questionNumber) / totalQuestions) * 100;  // Перерасчет прогресса
    progress.style.width = `${progressPercent}%`;  // Обновляем ширину прогресс-бара
    currentQuestion.textContent = questionNumber;  // Обновляем текст с номером вопроса
}

document.querySelectorAll('.answer-option').forEach(option => {
    option.addEventListener('click', function () {
        let isCorrect = this.getAttribute('data-correct') === "true";

        // Убираем выделение со всех ответов
        document.querySelectorAll('.answer-option').forEach(opt => {
            opt.classList.remove('selected', 'true', 'false');
        });

        // Добавляем соответствующий класс к выбранному ответу
        this.classList.add('selected', isCorrect ? 'true' : 'false');
    });
});

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('answer-option')) {
        let selectedOption = event.target;
        let isCorrect = selectedOption.getAttribute('data-correct') === "true";

        // Получаем контейнер текущего вопроса
        let questionCard = selectedOption.closest('.question-card');

        // Сбрасываем все классы внутри текущего вопроса
        questionCard.querySelectorAll('.answer-option').forEach(opt => {
            opt.classList.remove('selected', 'true', 'false');
        });

        // Добавляем соответствующий класс к выбранному ответу
        selectedOption.classList.add('selected', isCorrect ? 'true' : 'false');
    }
});

// Получаем элементы страницы
const realTestBtn = document.getElementById("realTestBtn");

// Функция для случайного выбора 14 вопросов
function getRandomQuestions() {
    const shuffledQuestions = [...questionKeys];  // Создаем копию массива ключей
    shuffledQuestions.sort(() => 0.5 - Math.random());  // Перемешиваем вопросы
    return shuffledQuestions.slice(0, 14);  // Возвращаем первые 14 вопросов
}

// Объявляем переменную для количества вопросов в режиме "Реальное тестирование"
const realTestTotal = 14;  // Общее количество вопросов для режима "Реальное тестирование"

function showRandomQuestions() {

    mode = 1
    console.log(mode);

    // Закрываем меню
    sidebar.classList.remove('active');

    // Изменяем margin-bottom у questionCounter при нажатии
    questionCounter.style.marginBottom = '-50px';

    // Обновляем счетчик вопросов для режима "Реальное тестирование"
    document.getElementById("questionCounter").innerHTML = `
        Вопрос <span id="currentQuestion">1</span>/${realTestTotal}
        <br>
        <button class="nav-button" id="finishBtn">Закончить</button>
    `;

    // Получаем элемент "Закончить" и вешаем обработчик
    const finishBtn = document.getElementById("finishBtn");
    finishBtn.addEventListener("click", () => {
    // Показываем результат
        alert(`Тест завершён! Вы правильно ответили на ${correctAnswersCount} из ${realTestTotal} вопросов.`);
    });

    // Получаем 14 случайных вопросов
    const randomQuestions = getRandomQuestions();

    // Сохраняем массив случайных вопросов в глобальной переменной
    window.randomQuestions = randomQuestions;

    // Устанавливаем индекс текущего вопроса
    window.currentRandomQuestionIndex = 0;

    // Очищаем контейнер для вопросов
    answersContainer.innerHTML = '';

    // Загружаем первый случайный вопрос
    loadRandomQuestion(window.currentRandomQuestionIndex);
}

// Функция для загрузки случайного вопроса
function loadRandomQuestion(index) {
    const questionKey = window.randomQuestions[index];  // Получаем ключ текущего случайного вопроса
    questionText.textContent = questionKey;  // Устанавливаем текст вопроса

    // Очищаем старые ответы
    answersContainer.innerHTML = `<h3 id="questionText">${questionKey}</h3>`;

    // Добавляем новые варианты ответов
    questions[questionKey].forEach(answerObj => {
        const [answerText, isCorrect] = Object.entries(answerObj)[0];  // Получаем текст ответа и его правильность
        const button = document.createElement("button");
        button.textContent = answerText;
        button.classList.add("answer-option");
        button.dataset.correct = isCorrect;  // Сохраняем информацию о правильности ответа

        button.addEventListener("click", () => {
            document.querySelectorAll(".answer-option").forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
            selectedAnswer = isCorrect;
            nextBtn.disabled = false;

            // 📌 Сохранение ответа в словарь
            const questionKey = questionText.textContent; // Текущий вопрос
            userAnswers[questionKey] = { [answerText]: isCorrect };
        });


        answersContainer.appendChild(button);
    });

    // Обновляем прогресс и номер вопроса (используем переменную realTestTotal)
    document.getElementById("currentQuestion").textContent = index + 1;
    progress.style.width = `${((index + 1) / realTestTotal) * 100}%`;

    // Блокируем кнопку "Назад" на первом вопросе
    prevBtn.disabled = index === 0;
    nextBtn.disabled = true;
}

// Обработчик кнопки "Далее" для случайных вопросов
nextBtn.addEventListener("click", () => {
    console.log(mode);
    if (mode == 1){
        if (selectedAnswer !== null) {
            // Переходим к следующему вопросу
            if (window.currentRandomQuestionIndex + 1 < window.randomQuestions.length) {
                window.currentRandomQuestionIndex++;  // Переходим к следующему вопросу
            } else {
                window.currentRandomQuestionIndex = 0;  // Сброс на первый вопрос
            }
            loadRandomQuestion(window.currentRandomQuestionIndex); // Загружаем новый вопрос

        }
    }
});

// Обработчик кнопки "Назад" для случайных вопросов
prevBtn.addEventListener("click", () => {
    if (mode == 1){

        if (selectedAnswer !== null) {
            // Переходим к предыдущему вопросу
            if (window.currentRandomQuestionIndex > 0) {
                window.currentRandomQuestionIndex--;  // Переходим к предыдущему вопросу
            } else {
                window.currentRandomQuestionIndex = window.randomQuestions.length - 1;  // Переход к последнему вопросу
            }
            loadRandomQuestion(window.currentRandomQuestionIndex); // Загружаем новый вопрос
        }
    }
});


// Обработчик для кнопки realTestBtn, который запускает режим "Реальное тестирование"
realTestBtn.addEventListener("click", showRandomQuestions);