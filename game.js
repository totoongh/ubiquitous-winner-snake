const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const snake = {
    body: [{ x: 20, y: 20 }],
    direction: { x: 0, y: -1 }
};

const food = {
    x: Math.floor(Math.random() * canvas.width / 10) * 10,
    y: Math.floor(Math.random() * canvas.height / 10) * 10
};

function update() {
    const head = { x: snake.body[0].x + snake.direction.x * 10, y: snake.body[0].y + snake.direction.y * 10 };
    snake.body.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food.x = Math.floor(Math.random() * canvas.width / 10) * 10;
        food.y = Math.floor(Math.random() * canvas.height / 10) * 10;
    } else {
        snake.body.pop();
    }

    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || snake.body.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        alert('Game Over');
        snake.body = [{ x: 20, y: 20 }];
        snake.direction = { x: 0, y: -1 };
    }
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'blue';
    snake.body.forEach(segment => ctx.fillRect(segment.x, segment.y, 10, 10));

    ctx.fillStyle = 'yellow';
    ctx.fillRect(food.x, food.y, 10, 10);
}

function gameLoop() {
    update();
    render();
    setTimeout(gameLoop, 150);
}

document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'w':
            if (snake.direction.y === 0) snake.direction = { x: 0, y: -1 };
            break;
        case 's':
            if (snake.direction.y === 0) snake.direction = { x: 0, y: 1 };
            break;
        case 'a':
            if (snake.direction.x === 0) snake.direction = { x: -1, y: 0 };
            break;
        case 'd':
            if (snake.direction.x === 0) snake.direction = { x: 1, y: 0 };
            break;
    }
});

gameLoop();
