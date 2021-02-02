'use strict';

const lotteryNumber = document.getElementById('lottery-number');
const startButton = document.getElementById('start-button');
const results = document.getElementById('results');

const fragment = document.createDocumentFragment();
let row;

for (let i = 1, len = 75; i <= len; i++) {
    if (i % 15 === 1) {
        row = document.createElement('div');
        row.classList.add('row');
    }
    
    const column = document.createElement('div');
    column.textContent = i;
    column.classList.add('column');

    row.appendChild(column);

    if (i % 15 === 0) {
        fragment.appendChild(row);
    }
}

results.appendChild(fragment);

const arr = [];
for (let j = 1, len2 = 75; j <= len2; j++) {
    arr.push(j);
}

startButton.addEventListener('click', () => {
    const randomNumber = Math.floor(Math.random() * arr.length);
    const atari = arr.splice(randomNumber, 1);

    if (arr.length === 0) {
        startButton.textContent = 'Reset';
    }

    if (atari.length === 0) {
        lotteryNumber.textContent = '?';
        startButton.textContent = 'Go!!';
        const hits = results.getElementsByClassName('column');
        Array.prototype.forEach.call(hits, hit => {
            hit.classList.remove('hit');
        });

        for (let j = 1, len2 = 75; j <= len2; j++) {
            arr.push(j);
        }

        return;
    }

    lotteryNumber.textContent = atari[0];

    const resultsChild = results.getElementsByClassName('column');
    resultsChild[atari[0] - 1].classList.add('hit');
});