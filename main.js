const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');


const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
};

//handling events
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value; //if + not used, length is string, to convert to number user unary operator + or use parseInt
    // console.log(value);
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

//copy password to clipboard
clipboardEl.addEventListener('click',() => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password){
        return;
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard!');
});

//generate password function

function generatePassword(lower, upper, number, symbol, length){
    //1. initialise password variable
    //2. filter out unchecked types
    //3. loop over the length call generator function for each type
    //4. add final password to pw var and return

    let generatedPassword = '';
    const typeCount = lower + upper + number + symbol;
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]); //without curly braces they are just true/false values, but with curly braces it is an array of objects

    //if all are unchecked return empty string
    if(typeCount === 0){
        return '';
    }

    for(let i = 0; i < length; i += typeCount){
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        })
    }
    const finalPassword = generatedPassword.slice(0,length);
    // console.log(finalPassword);
    return finalPassword;
}

//generator functions

//https://josephcardillo.medium.com/using-math-random-in-javascript-c49eff920b11#:~:text=In%20JavaScript%2C%20to%20get%20a,random()%20function.&text=If%20you%20want%20a%20random,then%20round%20up%20or%20down.
function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
// console.log(String.fromCharCode(97));
// console.log(Math.floor(Math.random() * 26) + 97);

function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random()*26) +65);
}

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random()*26) +48);
}

function getRandomSymbol(){
    const symbols = '!@#$%^&*()_{}[]/.,<>'
    return symbols[Math.floor(Math.random()*symbols.length)];
}