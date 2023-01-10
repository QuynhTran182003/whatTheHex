const DIFFICULTY = [2, 3, 4, 5, 6, 7, 8, 9, 10, 48];

function renderColorsListDiv(colorsList) {
	const colorsListDiv = document.querySelector('.colorsList');
	colorsListDiv.innerHTML = colorsList
		.map((color) => {
			return `<div class='color' style='background-color: #${color}'>#${color}</div>`;
		})
		.join('');
}

function getRandHex(count) {
	const list = [];
	for (let i = 0; i < count; i++) {
		list.push(Math.floor(Math.random() * 16777215).toString(16));
	}
	return list;
}

function start() {
	const guessColorDiv = document.querySelector('.guessColor');
	const difficultyDiv = document.querySelector('.difficulty');
	const colorsListDiv = document.querySelector('.colorsList');
	const notificationDiv = document.querySelector('.notification');
	//set default difficulty
	let currDifficulty = 5;

	//get random colors list to guess base on difficulty
	let colorsList = getRandHex(currDifficulty);
	let isWin = false;

	difficultyDiv.innerHTML = `<p>DIFFICULTY: ${DIFFICULTY.map(
		(d) => `<span class='button'> ${d}</span>`
	).join('')}</p>`;

	const buttons = document.querySelectorAll('.button');

	// difficulty buttons onClick
	buttons.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			currDifficulty = +e.target.textContent;
			colorsList = getRandHex(currDifficulty);
			renderColorsListDiv(colorsList);
			guessColorDiv.textContent = `#${
				colorsList[Math.floor(Math.random() * currDifficulty)]
			}`;
		});
	});
	//guessColorDiv.textContent = `#${randHex}`;

	renderColorsListDiv(colorsList);

	//get random color to guess
	guessColorDiv.textContent = `#${
		colorsList[Math.floor(Math.random() * currDifficulty)]
	}`;

	//color onClick
	colorsListDiv.addEventListener('click', (e) => {
		if (e.target.classList.contains('color')) {
			if (isWin) return;

			//when the color is correct
			if (guessColorDiv.textContent == e.target.textContent) {
				isWin = true;
				notificationDiv.innerHTML =
					'<h2>Correct!</h2><button class="restartBtn">New game</button>';
				guessColorDiv.style.color = `${e.target.textContent}`;
			} else {
				notificationDiv.innerHTML = `<h2>TRY AGAIN. THAT COLOR WAS <span style='color: ${
					e.target.textContent
				}'>${e.target.textContent.toUpperCase()}<span>!</h2>`;

				//remove selected color
				colorsList = colorsList.filter((color) => {
					return color !== e.target.textContent.slice(1);
				});

				console.log(colorsList);
				renderColorsListDiv(colorsList);
			}
		}
	});

	//restart button onClick
	notificationDiv.addEventListener('click', (e) => {
		if (e.target.classList.contains('restartBtn')) {
			console.log('clicked');
			isWin = false;
			colorsList = getRandHex(currDifficulty);
			renderColorsListDiv(colorsList);
			guessColorDiv.textContent = `#${
				colorsList[Math.floor(Math.random() * currDifficulty)]
			}`;
			notificationDiv.innerHTML = '<h2>GUESS THE COLOR</h2>';
			guessColorDiv.style.color = '#000';
		}
	});
}

start();
