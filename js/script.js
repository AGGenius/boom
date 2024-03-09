const userInput = document.getElementById('userInput');
const restartGame = document.getElementById('restart');
const countdownDom = document.getElementById('countdown');
const resultDom = document.getElementById('result');

let cpuValue;
let userNum = 1;

userInput.addEventListener('focusout', getUserValue );
userInput.addEventListener('keypress', (event) => {
    if(event.key === 'Enter') { getUserValue(); }
} );


restartGame.addEventListener('click', () => {
    location.reload();
})

setTimer();

function getUserValue() {
    userNum = +userInput.value;
    if (userNum < 1 ){
        userNum = 1;
    } else if (userNum > 3 ){
        userNum = 3;
    }
    userInput.value = userNum;
}

const randomNumber = new Promise((resolve) => {
    setTimeout(() => {
        cpuValue = Math.round((Math.random() * (3 - 1) + 1));
        resolve(cpuValue);
    }, 5000);
});


function setTimer() {
    let timer = 5;

    const timerP = document.createElement('p');
    timerP.textContent = `Cuenta atrás: 5 segundos`;
    countdownDom.appendChild(timerP);

    const countDown = setInterval(() => {
        timer--;
        timerP.textContent = `Cuenta atrás: ${timer} segundos`;
    
        if (timer <= 0) {
            clearInterval(countDown);
        }
    }, 1000);
}



randomNumber
    .then((cpuNumber) => {    
        const showFinalValues = document.createElement('p');
        const showEndText = document.createElement('p');
        showFinalValues.classList.add('showFinalValues');
        showEndText.classList.add('showEndText')

        if(userNum === cpuNumber) {
            showEndText.textContent = '¡Has salvado el mundo!';
            showEndText.style.color = '#5ad38b';
        } else {        
            showEndText.textContent = 'La bomba ha estallado';
            showEndText.style.color = 'red';
        }

        showFinalValues.textContent = `El usuario eligio el numero: ${userNum} y el correcto era: ${cpuNumber}`;
        resultDom.append(showEndText, showFinalValues);
});

