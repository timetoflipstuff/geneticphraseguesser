let population = [];
let populationLength = 10;
let parentsNum = 2;

const phraseDisplay = document.getElementById("phraseInput");
const phrase = document.getElementById("phrase");
const generationDisplay = document.getElementById("generationCount");
let generationCount = 0;

const keys = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    ' ', '`', '~', '_', '-', '+', '=', '|', '*', '&', '^', '%', '$', '#', '@', '!', '<', '>', '.', ',', '?', ':', ';'
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
    if (parents[0] != actualPhrase) {
        draw(phraseLength, actualPhrase);
    }
}

let guessingProcess = () => {
    let guessPhrase = phraseDisplay.value;
    console.log(guessPhrase);

    if (guessPhrase) {
        setup(guessPhrase.length);
        console.log("Setup launched!");
        draw(guessPhrase.length, guessPhrase);
    } else {
        console.log("Enter something!");
    }
}
