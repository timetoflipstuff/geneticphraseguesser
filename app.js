let populationLength = 100;
let parentsNum = 10;
let mutationChance = 0.2;
// Edit the parameters above to tweak the performance of the algorithm
let population = [];
let isGuessing = false;
let guessPhrase = '';
let generationCount = 0;

const phraseDisplay = document.getElementById("phraseInput");
const phrase = document.getElementById("phrase");
const generationDisplay = document.getElementById("generationCount");
const codeDisplay = document.getElementById("codeDisplay");

const keys = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    ' ', '.', '?', '!', ',',
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'I'
    //'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    //'`', '~', '_', '-', '+', '=', '|', '*', '&', '^', '%', '$', '#', '@', '!', '<', '>', '.', ',', '?', ':', ';', "'",
]

let clearPop = () => {
    for (let i = 0; i < populationLength; i++) {
        population[i] = '';
    }
}

let setup = phraseLength => {
    clearPop();
    for (let i = 0; i < populationLength; i++) {
        for (let j = 0; j < phraseLength; j++) {
            population[i] += keys[Math.floor((Math.random()*keys.length))];
        }
    }
}

let draw = (phraseLength, actualPhrase) => {
    generationCount++;
    // Find fitness of each element
    let fitness = []
    for (let i = 0; i < populationLength; i++) {
        fitness[i] = 0;
        for (let j = 0; j < phraseLength; j++) {
            if (population[i][j] == actualPhrase[j]) {
                fitness[i]++;
            }
        }
    }
    // Take 2 most fitting samples
    let parents = [];
    let totalFitness = 0;
    fitness.forEach(item => {
        totalFitness += item;
    })
    for (i = 0; i < parentsNum; i++) {
        if (totalFitness == 0) {
            let index = Math.floor((Math.random()*population.length));
            let parent = population[index];
            population.splice(index, 1);
            fitness.splice(index, 1);
            parents.push(parent);
        } else {
            let maxFitness = Math.max(...fitness);
            parents.push(population[fitness.indexOf(maxFitness)]);
            population.splice(fitness.indexOf(maxFitness), 1);
            fitness.splice(fitness.indexOf(maxFitness), 1);
            totalFitness -= maxFitness;
        }
    }
    console.log("Parents: " + parents);
    // Display the first parent and generation number on the HTML document
    phrase.innerText = parents[0];
    generationDisplay.innerText = "Generation: " + generationCount;
    // Create a new population
    clearPop();
    for (i = 0; i < populationLength; i++) {
        for (j = 0; j < phraseLength; j++) {
            ((Math.random() * 100) > 1) ? population[i] += parents[Math.floor(Math.random()*parentsNum)][j] : population[i] += keys[Math.floor((Math.random()*keys.length))];
        }
    }
}

let guessPress = () => {
    if (phraseDisplay.value.length>0) {
        isGuessing = true;
        guessPhrase = phraseDisplay.value;
        setup(guessPhrase.length);
        console.log("Setup launched!");
        
        console.log(guessPhrase);
    } else {
        phrase.innerText = "Enter something!";
    }
}

window.setInterval(function(){
    if (isGuessing == true) { 
        draw(guessPhrase.length, guessPhrase);
        if (phrase.innerText == guessPhrase) {
            isGuessing = false;
        }
        //Display the output in the codeDisplay div
        phrase.innerText.length > 40 ? codeDisplay.children[codeDisplay.children.length-1].textContent = phrase.innerText.substring(0, 40) + '...' : codeDisplay.children[codeDisplay.children.length-1].textContent = phrase.innerText;
        for (i = 0; i < codeDisplay.children.length-1; i++) {
            codeDisplay.children[i].textContent = codeDisplay.children[i+1].textContent;
        }
    }
}, 1);

