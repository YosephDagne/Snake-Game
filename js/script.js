//***********************************************************************************//
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

// Canvas scale
const scale = 20;
const rows = Math.floor(canvas.height / scale);
const columns = Math.floor(canvas.width / scale);

// Initial snake setup
let snake = [
  {
    x: Math.floor(Math.random() * columns) * scale,
    y: Math.floor(Math.random() * rows) * scale,
  },
];

// Initial food setup
let food = generateFood();

// Initial direction
let d = "right";

// Add event listener for arrow keys
document.addEventListener("keydown", direction);

function direction(event) {
  const key = event.keyCode;
  if (key === 37 && d !== "right") {
    d = "left";
  } else if (key === 38 && d !== "down") {
    d = "up";
  } else if (key === 39 && d !== "left") {
    d = "right";
  } else if (key === 40 && d !== "up") {
    d = "down";
  }
}

// Start game loop
let playGame = setInterval(draw, 100);

function draw() {
  // Clear canvas
  ctx.fillStyle = "#000"; // Black background
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "#39ff14"; // Bright green snake
    ctx.strokeStyle = "#006400"; // Dark green border
    ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
    ctx.strokeRect(snake[i].x, snake[i].y, scale, scale);
  }

  // Draw the food
  ctx.fillStyle = "#ff4136"; // Red food
  ctx.strokeStyle = "#800000"; // Dark red border
  ctx.fillRect(food.x, food.y, scale, scale);
  ctx.strokeRect(food.x, food.y, scale, scale);

  // Old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // Update head position based on direction
  if (d === "left") snakeX -= scale;
  if (d === "up") snakeY -= scale;
  if (d === "right") snakeX += scale;
  if (d === "down") snakeY += scale;

  // Wrap around canvas edges
  if (snakeX >= canvas.width) snakeX = 0;
  if (snakeY >= canvas.height) snakeY = 0;
  if (snakeX < 0) snakeX = canvas.width - scale;
  if (snakeY < 0) snakeY = canvas.height - scale;

  // Check if snake eats the food
  if (snakeX === food.x && snakeY === food.y) {
    food = generateFood(); // Generate new food
  } else {
    // Remove the last part of the snake
    snake.pop();
  }

  // Create new head
  const newHead = { x: snakeX, y: snakeY };

  // Check for collision with itself
  if (eatSelf(newHead, snake)) {
    clearInterval(playGame); // Stop the game
    alert("Game Over! Your score: " + (snake.length - 1));
    return;
  }

  // Add the new head to the snake
  snake.unshift(newHead);
}

function generateFood() {
  let newFood;
  let isOnSnake;

  do {
    isOnSnake = false;
    newFood = {
      x: Math.floor(Math.random() * columns) * scale,
      y: Math.floor(Math.random() * rows) * scale,
    };

    // Ensure the food does not spawn on the snake
    for (let part of snake) {
      if (part.x === newFood.x && part.y === newFood.y) {
        isOnSnake = true;
        break;
      }
    }
  } while (isOnSnake);

  return newFood;
}

function eatSelf(head, array) {
  for (let i = 1; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}
//*****************************************************************//
