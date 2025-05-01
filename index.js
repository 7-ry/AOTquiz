function selectTitanImage() {
    // pick a random number out of 9
    index = Math.floor(Math.random() * 9);

    console.log(index);

    // add question title to h1
    document.querySelector(".countQuestion").textContent = "Question number " + (counter);

    // embed a titan img to img
    document.getElementById("question-titan").src = arrTitans[index];

    return index;
}


// - 1 -
function selectHumanImage() {
    counter++;
    document.querySelector(".highscore").textContent = "High Score :  " + highScore;

    selectTitanImage()

    let index2 = index

    console.log(index2);

    // define the human who matches to the titan, who cannnot be an option
    humanFromOriginalArr = arrHumans[index2];
    console.log(arrHumans[index2])

    // remove the answer human from arrHuman
    arrHumans.splice(index2, 1);

    // shuffle the order of arrHuman
    let shuffledHumanArr = shuffleArray(arrHumans);
    console.log(shuffledHumanArr)


    // select 3 wrong answer humans
    for (let i = 0; i < 3; i++) {

        // select the first human out of shuffled array and define it as chosenHuman
        let chosenHuman = shuffledHumanArr[i];
        console.log(chosenHuman)

        // create img in ul(#options) and define src as chosenHuman
        newImg = document.createElement("img");
        newImg.src = chosenHuman;
        let element = document.getElementById("options");
        element.appendChild(newImg)
        newImg.classList.add("wrong");
        newImg.addEventListener('click', handleClick, { once: true });
    }

    // create new img tag for the correct answer
    newImg = document.createElement("img");

    // apply answer image path to the img src
    newImg.src = humanFromOriginalArr;
    let element = document.getElementById("options");
    element.appendChild(newImg)
    newImg.id = "correct";


    newImg.addEventListener('click', handleClick, { once: true });

    // shuffle child nords of ul and display options randomly
    let ul = document.querySelector('ul');
    for (let i = ul.children.length; i >= 0; i--) {
        ul.appendChild(ul.children[Math.random() * i | 0]);
    }

    return index2; //<- probably unnecessary
}

// for the time when players clicked an option
function handleClick(event) {
    // Code to be executed when a click occurs
    // get the img src which is clicked and take out img file path
    let fullSrc = event.target.src;
    let selectedSrc = fullSrc.split("assets/")[1]; // "larla.jpeg"
    selectedImgSrc = "assets/" + selectedSrc;
    console.log(selectedImgSrc); // → "assets/larla.jpeg"

    evaluateAnswer(selectedImgSrc);
}

// - 2 -
// check if the clicked option matches to the answer
function evaluateAnswer(a) {
    let submitAnswer = a

    // just for debbuging
    console.log(submitAnswer)
    console.log(humanFromOriginalArr)

    // check if the answer is correct or not, and displays message and caluculate points
    const messageElement = document.querySelector(".message");

    if (submitAnswer === humanFromOriginalArr) {
        messageElement.classList.remove('hidden');
        messageElement.textContent = "Correct!"
        score += 5;

    } else {
        messageElement.classList.remove('hidden');
        messageElement.textContent = "Try again..."
        score -= 2;
    }

    console.log("this score is right before the evaluation" + score)
    document.querySelector(".score").textContent = "score :  " + score;

    showResult()
}

// - 3 -
function showResult() {
    let correctAnswer = document.getElementById("correct");
    correctAnswer.classList.add("correct")
    let wrongAnswers = document.querySelectorAll(".wrong");

    correctAnswer.removeEventListener('click', handleClick);
    for (let i = 0; i < wrongAnswers.length; i++) {
        // console.log("This is wrong answers" + wrongAnswers)
        wrongAnswers[i].removeEventListener('click', handleClick);
    }

    for (let i = 0; i < wrongAnswers.length; i++) {
        // console.log("wrong answer[i]" + wrongAnswers[i]) <- for debbug
        wrongAnswers[i].classList.add("wrong-answer")
        // console.log(wrongAnswers[i].classList); // check if "wrong", "wrong-answer" are included
    }
    showbtnToNext()
}

// - 4 -
function showbtnToNext() {
    btnToNext.classList.remove('hidden');
};


// - 5 -
function moveNext() {
    const messageElement = document.querySelector(".message");
    messageElement.classList.add('hidden');

    if (counter < 5) {
        arrHumans = ["assets/reiner.jpg",
            "assets/eren.jpg",
            "assets/ziek.jpeg",
            "assets/piek.jpeg",
            "assets/bertolt.jpg",
            "assets/annie.jpg",
            "assets/flieda.jpeg",
            "assets/porco.jpeg",
            "assets/larla.jpeg"
        ];

        let listOptions = document.querySelectorAll("#options img")
        console.log(listOptions)
        for (let option of listOptions) {
            option.parentNode.removeChild(option)
        }

        selectHumanImage();
        hiddenbtnToNext();
    } else {
        arrHumans = ["assets/reiner.jpg",
            "assets/eren.jpg",
            "assets/ziek.jpeg",
            "assets/piek.jpeg",
            "assets/bertolt.jpg",
            "assets/annie.jpg",
            "assets/flieda.jpeg",
            "assets/porco.jpeg",
            "assets/larla.jpeg"
        ];

        let listOptions = document.querySelectorAll("#options img")
        console.log(listOptions)
        for (let option of listOptions) {
            option.parentNode.removeChild(option)
        }

        hiddenbtnToNext();
        resultPage();
    }
}

function resultPage() {
    counter = 0;
    removeElements();
    if (score === 25) {
        let congratsText = document.createElement("h2")
        congratsText.innerText = "Congratulation!";
        congratsText.classList.add("question");
        let element = document.getElementById("question");
        console.log(element)
        element.appendChild(congratsText)
    }

    // show scores
    let scoreText = document.createElement("h2")
    scoreText.innerText = "Score : " + score;
    scoreText.classList.add("question");
    let element = document.getElementById("question");
    console.log(element)
    element.appendChild(scoreText)
    if (score > highScore) {
        highScore = score;
    }

    // show high score
    let highScoreText = document.createElement("h2")
    highScoreText.innerText = "High Score : " + highScore;
    highScoreText.classList.add("question");
    let element2 = document.getElementById("question");
    console.log(element2)
    element.appendChild(highScoreText)

    hiddenbtnPlayAgain();
    // hiddenbtnExit();
}

function playAgain() {
    score = 0;
    document.querySelector(".score").textContent = "score :  " + score;
    counter = 0;

    showElements()
    hidebtnExit()
    hidebtnPlayAgain()

    // // remove titan img
    // let removeTitan = document.getElementById("question-titan")
    // removeTitan.classList.remove("hidden")

    // // remove question title
    // let questionTitle = document.querySelector(".countQuestion")
    // questionTitle.classList.remove("hidden");

    // // remove human options
    // let listOptions = document.querySelectorAll("#options img")
    // console.log(listOptions)
    // for (let option of listOptions) {
    //     option.classList.remove("hidden")
    // }

    // let removeOutput = document.querySelectorAll(".output-left h2")
    // console.log(removeOutput)
    // for (let output of removeOutput) {
    //     output.classList.remove("hidden")
    // }

    let removeResults = document.querySelectorAll("#question h2")
    console.log(removeResults)
    for (let result of removeResults) {
        result.parentNode.removeChild(result)
    }

    selectHumanImage();
}

function removeElements() {
    // remove titan img
    let removeTitan = document.getElementById("question-titan")
    // removeTitan.parentNode.removeChild(removeTitan)
    removeTitan.classList.add("hidden")

    // remove question title
    let questionTitle = document.querySelector(".countQuestion")
    // questionTitle.parentNode.removeChild(questionTitle);
    questionTitle.classList.add("hidden");

    // remove human options
    let listOptions = document.querySelectorAll("#options img")
    console.log(listOptions)
    for (let option of listOptions) {
        // option.parentNode.removeChild(option)
        option.parentNode.removeChild(option)
    }

    let removeOutput = document.querySelectorAll(".output-left h2")
    console.log(removeOutput)
    for (let output of removeOutput) {
        // output.parentNode.removeChild(output)
        output.classList.add("hidden")
    }
}

function showElements() {
    // show titan img
    let removeTitan = document.getElementById("question-titan")
    // removeTitan.parentNode.removeChild(removeTitan)
    removeTitan.classList.remove("hidden")

    // show question title
    let questionTitle = document.querySelector(".countQuestion")
    // questionTitle.parentNode.removeChild(questionTitle);
    questionTitle.classList.remove("hidden");

    // // show human options
    // let listOptions = document.querySelectorAll("#options img")
    // console.log(listOptions)
    // for (let option of listOptions) {
    //     // option.parentNode.removeChild(option)
    //     option.classList.remove("hidden")
    // }

    // show outputs
    let removeOutput = document.querySelectorAll(".output-left h2")
    console.log(removeOutput)
    for (let output of removeOutput) {
        // output.parentNode.removeChild(output)
        output.classList.remove("hidden")
    }
}

const hiddenbtnToNext = function () {
    btnToNext.classList.add('hidden');
};

const hiddenbtnPlayAgain = function () {
    btnPlayAgain.classList.remove('hidden');
};

const hidebtnPlayAgain = function () {
    btnPlayAgain.classList.add('hidden');
};

const hiddenbtnExit = function () {
    btnExit.classList.remove('hidden');
};

const hidebtnExit = function () {
    btnExit.classList.add('hidden');
};


// shuffle array
function shuffleArray(array) {
    for (let i = arrHumans.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Generate random index from 0 to i
        // Swap elements at i and j
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let arrTitans = ["assets/armor-titan.jpeg",
    "assets/attack-titan.jpeg",
    "assets/beast-titan.jpeg",
    "assets/cart-titan.jpeg",
    "assets/colossal-titan.jpeg",
    "assets/female-titan.jpeg",
    "assets/founder-titan.jpeg",
    "assets/jaw-titan.jpeg",
    "assets/warhammer-titan.jpeg"
];

let arrHumans = ["assets/reiner.jpg",
    "assets/eren.jpg",
    "assets/ziek.jpeg",
    "assets/piek.jpeg",
    "assets/bertolt.jpg",
    "assets/annie.jpg",
    "assets/flieda.jpeg",
    "assets/porco.jpeg",
    "assets/larla.jpeg"
];


// let wrongAnswers;
// let correctAnswer;
let newImg;
let humanFromOriginalArr;
let selectedImgSrc;
let counter = 0;
let index;
let highScore = 0;

// let i = selectTitanImage();
let score = 0;
let j = selectHumanImage();
document.body.classList.add('backGroundBody');
let btnToNext = document.querySelector('.next');
let btnPlayAgain = document.querySelector('.playAgain');
let btnExit = document.querySelector('.exit');