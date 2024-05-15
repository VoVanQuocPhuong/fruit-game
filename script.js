const gameContainer = document.getElementById('game-container');
const basket = document.getElementById('basket');
const scoreDisplay = document.getElementById('score-value');

let score = 0;

gameContainer.addEventListener('mousemove', moveBasket);

function moveBasket(event) {
    const x = event.clientX - gameContainer.getBoundingClientRect().left;
    const basketWidth = basket.offsetWidth;
    const containerWidth = gameContainer.offsetWidth;

    // Đảm bảo giỏ không di chuyển ra ngoài biên
    if (x - basketWidth / 2 < 0) {
        basket.style.left = '0px';
    } else if (x + basketWidth / 2 > containerWidth) {
        basket.style.left = `${containerWidth - basketWidth}px`;
    } else {
        basket.style.left = `${x - basketWidth / 2}px`;
    }
}

function createFruit() {
    const fruits = ['apple', 'orange', 'banana', 'watermelon'];
    const fruit = document.createElement('div');
    const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];

    fruit.classList.add('fruit', randomFruit);
    fruit.style.left = `${Math.random() * (gameContainer.offsetWidth - 30)}px`;

    gameContainer.appendChild(fruit);

    // Set up the falling animation
    setTimeout(() => {
        fruit.style.top = '100%';
    }, 0);

    // Check for collision with the basket periodically
    const collisionInterval = setInterval(() => {
        const fruitRect = fruit.getBoundingClientRect();
        const basketRect = basket.getBoundingClientRect();

        if (fruitRect.bottom >= basketRect.top &&
            fruitRect.top <= basketRect.bottom &&
            fruitRect.left <= basketRect.right &&
            fruitRect.right >= basketRect.left) {
            score++;
            scoreDisplay.textContent = score;
            fruit.remove();
            clearInterval(collisionInterval); // Stop checking for collision once caught
        }
    }, 100);

    // Remove the fruit after it falls out of the game container
    fruit.addEventListener('transitionend', () => {
        fruit.remove();
        clearInterval(collisionInterval); // Stop checking for collision if it falls out
    });
}

function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = `${Math.random() * (gameContainer.offsetWidth - 30)}px`;

    gameContainer.appendChild(obstacle);

    // Set up the falling animation
    setTimeout(() => {
        obstacle.style.top = '100%';
    }, 0);

    // Check for collision with the basket periodically
    const collisionInterval = setInterval(() => {
        const obstacleRect = obstacle.getBoundingClientRect();
        const basketRect = basket.getBoundingClientRect();

        if (obstacleRect.bottom >= basketRect.top &&
            obstacleRect.top <= basketRect.bottom &&
            obstacleRect.left <= basketRect.right &&
            obstacleRect.right >= basketRect.left) {
            score--;
            scoreDisplay.textContent = score;
            obstacle.remove();
            clearInterval(collisionInterval); // Stop checking for collision once hit
        }
    }, 100);

    // Remove the obstacle after it falls out of the game container
    obstacle.addEventListener('transitionend', () => {
        obstacle.remove();
        clearInterval(collisionInterval); // Stop checking for collision if it falls out
    });
}

// Set intervals to create fruits and obstacles
setInterval(createFruit, 1000);
setInterval(createObstacle, 3000);