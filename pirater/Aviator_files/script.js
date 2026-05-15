var isLoading = false;
var isReturningToInitialState = false;
let lastButtonClickTime = 0;
const cooldown = 600000; // 10 minutes in milliseconds
function goBack() {
  window.location.href = 'index.html';
}
function generateRandomNumber() {



    if (isLoading || isReturningToInitialState) {
            return; // Если загрузка уже идет или возвращение идет, игнорируем нажатие кнопки
        }

        isLoading = true;

        document.querySelector('.bar').style.width = '0%'; // Сбрасываем ширину полосы загрузки
        setTimeout(function() {
            document.querySelector('.bar').style.width = '100%'; // Устанавливаем ширину на 100%
            setTimeout(function() {
                document.querySelector('.bar').style.width = '0%'; // Сбрасываем ширину обратно на 0% через 2 секунды
                isReturningToInitialState = true;
                isLoading = false; // Разблокируем кнопку après le retour à l'état initial
            }, 11000); // Réinitialisation de la barre après 11 secondes
            setTimeout(function() {
                isReturningToInitialState = false;
            }, 22000); // Réinitialisation du flag après 22 secondes
            setTimeout(showText, 10000); // Affichage du texte après 10 secondes
        }, 100); 
}

function getRan(min, max) {
    return Math.random() * (max - min) + min;
}


function pad(number) {
    return (number < 10 ? '0' : '') + number;
}


function showText() {
    let now = new Date();
    
    // Heure de début : Heure actuelle + aléatoire entre 2 et 3 minutes
    let startTime = new Date(now.getTime());
    let randomOffset = getRan(2, 3); 
    startTime.setMinutes(startTime.getMinutes() + randomOffset);
    
    // Heure de fin : Heure de début + intervalle FIXE de 1 minute
    let endTime = new Date(startTime.getTime());
    endTime.setMinutes(endTime.getMinutes() + 1);

    let hours = pad(startTime.getHours());
    let minutes = pad(startTime.getMinutes());
    let seconds = pad(startTime.getSeconds());
    
    let hours1 = pad(endTime.getHours());
    let minutes1 = pad(endTime.getMinutes());
    let seconds1 = pad(endTime.getSeconds());

    let timeText = `${hours}:${minutes}:${seconds}-${hours1}:${minutes1}:${seconds1}`;
    document.getElementById("time").textContent = timeText;
    localStorage.setItem('timeText', timeText);

    // Coefficients : Min 10.01x, Max 25.99x
    let randomNumber1 = getRan(10.01, 15.00).toFixed(2);
    let randomNumber2 = getRan(15.01, 25.99).toFixed(2);
    let randomNumber3 = getRan(86, 97).toFixed(0);
    let resultText = `${randomNumber1}Х - ${randomNumber2}Х`;
    document.getElementById("result").textContent = resultText;
    localStorage.setItem('resultText', resultText);

    let chanceText = `${randomNumber3}%`;
    document.getElementById("chance").textContent = chanceText;
    localStorage.setItem('chanceText', chanceText);

}


function restoreState(){
    if(localStorage.getItem('timeText')){
        document.getElementById("time").textContent = localStorage.getItem('timeText');
    }
    if(localStorage.getItem('resultText')){
        document.getElementById("result").textContent = localStorage.getItem('resultText');
    }
    if(localStorage.getItem('chanceText')){
        document.getElementById("chance").textContent = localStorage.getItem('chanceText');
    }
}

// Appel de restoreState au chargement de la page
document.addEventListener("DOMContentLoaded", restoreState);



let countdown;
let timerRunning = false; 
const timerDisplay = document.getElementById('timers');
const startButton = document.getElementById('startButton');

function saveTimerState(timeLeft) {
  localStorage.setItem('timeLeft', timeLeft);
  localStorage.setItem('timestamp', Date.now());
}

function clearTimerState() {
  localStorage.removeItem('timeLeft');
  localStorage.removeItem('timestamp');
}

function startTimer(duration) {
  let timeLeft = duration;

  countdown = setInterval(function() {
    let minutes = parseInt(timeLeft / 60, 10);
    let seconds = parseInt(timeLeft % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timerDisplay.textContent = minutes + ":" + seconds;

    if (--timeLeft < 0) {
      clearInterval(countdown);
      timerDisplay.textContent = '';
      startButton.removeAttribute('disabled'); 
     
      timerRunning = false; 
      clearTimerState();
    } else {
      saveTimerState(timeLeft);
    }
  },1000);
}

function restoreTimer() {
  let savedTimeLeft = localStorage.getItem('timeLeft');
  let savedTimestamp = localStorage.getItem('timestamp');

  if (savedTimeLeft && savedTimestamp) {
    let currentTime = Date.now();
    let elapsedTime = Math.floor((currentTime - savedTimestamp) / 1000); 
    let timeLeft = savedTimeLeft - elapsedTime;

    if (timeLeft > 0) {
      startTimer(timeLeft);
      timerRunning = true;
      startButton.setAttribute('disabled', 'true'); 
     
      timerDisplay.style.display = 'block'; 
    } else {
      clearTimerState();
    }
  }
}

function initializeTimer() {
  startButton.addEventListener('click', function() {
    if (countdown) {
      clearInterval(countdown);
      timerDisplay.textContent = '';
      timerRunning = false; 
      clearTimerState();
    }

    if (!timerRunning) {
      let duration = 60; 

      startButton.setAttribute('disabled', 'true'); 
    

      timerDisplay.style.display = 'none'; 

      // Apparition du timer après 10 secondes
      setTimeout(() => {
        startTimer(duration);
        timerDisplay.style.display = 'block'; 
        timerRunning = true; 
      }, 9100); 
    }
  });

  restoreTimer(); 
}

initializeTimer();
