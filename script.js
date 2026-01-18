let myData;
let coef = 1; // Початковий коефіцієнт
let selectedInp = 'USD'; // Дефолтні значення
let selectedRes = 'UAH';

async function getRate() {
    let url = 'https://open.er-api.com/v6/latest/USD'; 
    let response = await fetch(url);
    let data = await response.json();
    
    let fromRate = data.rates[selectedInp]; 
    let toRate = data.rates[selectedRes]; 
    
    coef = toRate / fromRate; 
    console.log(`Курс ${selectedInp} до ${selectedRes}:`, coef);
    
    // Оновлюємо результат відразу після отримання курсу
    renderResult(); 
}

function updateSelectInp() { 
    selectedInp = document.getElementById('valutaInp').value; 
    getRate(); // Коли змінили валюту — тягнемо новий курс
}

function updateSelectRes() { 
    selectedRes = document.getElementById('valutaRes').value; 
    getRate(); // Коли змінили валюту — тягнемо новий курс
}

function renderResult() { 
    myData = document.getElementById('num1').value;
    let finalResult = (myData * coef).toFixed(2);
    document.getElementById('result').textContent = finalResult;
}

function showNum1() { 
    renderResult(); // Просто рахуємо на льоту, не смикаючи API без зупинки
}

// Викличемо один раз при завантаженні, щоб мати початковий курс
getRate();