window.onload = () => {
  const ALPHABET = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];

  const CATEGORIES = [
    ['everton', 'liverpool', 'swansea', 'chelsea', 'hull', 'manchester-city', 'newcastle-united'],
    ['alien', 'dirty-harry', 'gladiator', 'finding-nemo', 'jaws'],
    ['manchester', 'milan', 'madrid', 'amsterdam', 'prague'],
  ]; // Array of topics
  const HINTS = [
    [
      'Based in Mersyside',
      'Based in Mersyside',
      'First Welsh team to reach the Premier Leauge',
      'Owned by A russian Billionaire',
      'Once managed by Phil Brown',
      '2013 FA Cup runners up',
      "Gazza's first club",
    ],
    ['Science-Fiction horror film', '1971 American action film', 'Historical drama', 'Anamated Fish', 'Giant great white shark'],
    ['Northern city in the UK', 'Home of AC and Inter', 'Spanish capital', 'Netherlands capital', 'Czech Republic capital'],
  ];

  let chosenCategory; // Selected catagory
  let word; // Selected word
  let guess; // guess
  let guesses = []; // Stored guesses
  let lives; // Lives
  let counter; // Count correct gusses
  let space; // Number of spaces in word '-'
  let misses;
  let correctDOM;
  let lettersDOM;

  // Get elements
  const livesDOM = document.getElementById('mylives');
  const missesDOM = document.getElementById('misses');
  const hintDOM = document.getElementById('hint');
  const clueDOM = document.getElementById('clue');
  const myButtonsDOM = document.getElementById('buttons');

  // create ALPHABET ul
  const initButtons = () => {
    lettersDOM = document.createElement('ul');
    lettersDOM.id = 'alphabet';

    ALPHABET.forEach((item) => {
      listDOM = document.createElement('li');
      listDOM.innerHTML = item;
      bindGuessEvents();
      lettersDOM.appendChild(listDOM);
      myButtonsDOM.appendChild(lettersDOM);
    });
  };

  // Select Catagory
  const showSelectCat = () => {
    const catagoryNameDOM = document.getElementById('catagoryName');
    if (chosenCategory === CATEGORIES[0]) {
      catagoryNameDOM.innerHTML = 'The Chosen Category Is Premier League Football Teams';
    } else if (chosenCategory === CATEGORIES[1]) {
      catagoryNameDOM.innerHTML = 'The Chosen Category Is Films';
    } else if (chosenCategory === CATEGORIES[2]) {
      catagoryNameDOM.innerHTML = 'The Chosen Category Is Cities';
    }
  };

  // Create guesses ul
  const initWordDOM = () => {
    wordHolderDOM = document.getElementById('hold');
    correctDOM = document.createElement('ul');

    for (let i = 0; i < word.length; i++) {
      correctDOM.setAttribute('id', 'my-word');
      guessDOM = document.createElement('li');
      guessDOM.setAttribute('class', 'guess');
      if (word[i] === '-') {
        guessDOM.innerHTML = '-';
        space = 1;
      } else {
        guessDOM.innerHTML = '_';
      }

      guesses.push(guessDOM);
      wordHolderDOM.appendChild(correctDOM);
      correctDOM.appendChild(guessDOM);
    }
  };

  // Animate man
  const hangManAnimate = () => {
    const drawMe = lives;
    drawArray[drawMe]();
  };

  // Hangman
  const initCanvas = () => {
    myStickmanDOM = document.getElementById('stickman');
    context = myStickmanDOM.getContext('2d');
    context.beginPath();
    context.strokeStyle = '#fff';
    context.lineWidth = 2;
  };

  const head = () => {
    myStickmanDOM = document.getElementById('stickman');
    context = myStickmanDOM.getContext('2d');
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const youWin = () => {
    context.font = '30px HelveticaNeue-Light';
    context.fillStyle = 'green';
    context.textAlign = 'center';
    context.fillText('You Win!', 220, myStickmanDOM.height / 2);
  };

  const gameOver = () => {
    context.font = '30px HelveticaNeue-Light';
    context.fillStyle = 'red';
    context.textAlign = 'center';
    context.fillText('Game Over!', 220, myStickmanDOM.height / 2);
  };

  const draw = ($pathFromx, $pathFromy, $pathTox, $pathToy) => {
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke();
  };

  const frame1 = () => {
    draw(0, 150, 150, 150);
  };

  const frame2 = () => {
    draw(10, 0, 10, 600);
  };

  const frame3 = () => {
    draw(0, 5, 70, 5);
  };

  const frame4 = () => {
    draw(60, 5, 60, 15);
  };

  const torso = () => {
    draw(60, 36, 60, 70);
  };

  const rightArm = () => {
    draw(60, 46, 100, 55);
  };

  const leftArm = () => {
    draw(60, 46, 20, 55);
  };

  const rightLeg = () => {
    draw(60, 70, 100, 100);
  };

  const leftLeg = () => {
    draw(60, 70, 20, 100);
  };

  const drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1];

  // Show lives
  const updateCommentsAndResults = () => {
    if (lives < 1) {
      gameOver();
    } else if (counter + space === guesses.length) {
      youWin();
    }

    livesDOM.innerHTML = 'You have ' + lives + ' lives';
    livesDOM.style.color = 'white';
  };

  // Show Misses
  const updateMisses = () => {
    if (Array.isArray(misses) && misses.length > 0) {
      missesDOM.innerHTML = 'Missed guesses: ' + misses.join(', ');
    }
  };

  // OnClick Function
  const bindGuessEvents = () => {
    listDOM.onclick = (e) => {
      if (lives <= 0) return;
      let guess = e.target.textContent;
      e.target.className = 'activited';
      e.stopPropagation();
      for (let i = 0; i < word.length; i++) {
        if (word[i] === guess) {
          guesses[i].innerHTML = guess;
          counter += 1;
        }
      }
      let j = word.indexOf(guess);
      if (j === -1) {
        lives -= 1;
        misses.push(guess);
        misses.sort();
        hangManAnimate();
      }
      updateMisses();
      updateCommentsAndResults();
    };
  };

  // Play
  const play = () => {
    chosenCategory = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    word = word.replace(/\s/g, '-');
    console.log(word);
    misses = [];

    guesses = [];
    lives = 10;
    counter = 0;
    space = 0;
    initButtons();
    initWordDOM();
    initCanvas();
    updateCommentsAndResults();
    updateMisses();
    showSelectCat();
  };

  play();

  // Hint

  hintDOM.onclick = () => {
    let catagoryIndex = CATEGORIES.indexOf(chosenCategory);
    let hintIndex = chosenCategory.indexOf(word);
    clueDOM.innerHTML = 'Clue: - ' + HINTS[catagoryIndex][hintIndex];
  };

  // Reset

  document.getElementById('reset').onclick = () => {
    correctDOM.parentNode.removeChild(correctDOM);
    lettersDOM.parentNode.removeChild(lettersDOM);
    clueDOM.innerHTML = '';
    missesDOM.innerHTML = '';
    context.clearRect(0, 0, 400, 400);
    play();
  };
};
