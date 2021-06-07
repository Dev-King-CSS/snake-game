//Hello everyone, Let's start!

//This updates the position of our snake!
let inputDirection = { x: 0, y: 0 }

//Game constant variables
const foodSound = new Audio("audios/food.mp3")
const moveSound = new Audio("audios/move.mp3")
const gameOverSound = new Audio("audios/gameover.mp3")

//Some hardcoded variables
let speed = 7 //You can keep this anything you want!
let score = 0
let lastDrawTime = 0
let snakeArray = [{ x: 13, y: 15 }]

//The default position of apple at starting
let apple = { x: 6, y: 7 }

//This is the function where we handle animation frames of the game
function main(time) {
  window.requestAnimationFrame(main)

  //Making the body of snake constantly updating
  if ((time - lastDrawTime) / 1000 < 1 / speed) {
    return
  }
  lastDrawTime = time
  //Starting the game engine as soon as the above things return a favourable
  //condition!
  gameEngine()
}

//Creating the colliding logic here!
function isCollide(snake) {
  //If you collide yourself
  for (let i = 1; i < snakeArray.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true
    }
  }
  //If you collide the wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true
  }

  //If both the things are not happening,
  return false
}

//Creating the engine for our game :D
function gameEngine() {
  //If the snake is colliding it's body or hitting the wall, then
  //show the game-over prompt and reset the score
  if (isCollide(snakeArray)) {
    gameOverSound.play()
    inputDirection = { x: 0, y: 0 }
    prompt(`GAME OVER! You died with a score of ${score} points`)
    snakeArray = [{ x: 13, y: 15 }]
    score = 0
  }

  //If you have eaten the food, increment the score and regenarate the food and
  //randomise it's position!
  if (snakeArray[0].y === apple.y && snakeArray[0].x === apple.x) {
    foodSound.play()
    score += 1 //or score = score + 1
    if (score > highscoreval) {
      highscore = score
      localStorage.setItem("highscore", JSON.stringify(highscoreval))
      highscoreBox.innerHTML = `High Score: ${highscore}`
    }
    score.innerHTML = `Score: ${score}`
    snakeArray.unshift({
      x: snakeArray[0].x + inputDirection.x,
      y: snakeArray[0].y + inputDirection.y,
    })

    //again some hardcoded variables
    let a = 2
    let b = 16
    apple = {
      x: Math.floor(a + (b - a) * Math.random()),
      y: Math.floor(a + (b - a) * Math.random()),
    }
  }

  //Moving the snake as we press the keyboard
  for (let i = snakeArray.length - 2; i >= 0; i--) {
    snakeArray[i + 1] = { ...snakeArray[i] }
  }
  snakeArray[0].x += inputDirection.x
  snakeArray[0].y += inputDirection.y

  //Display the snake here!
  board.innerHTML = ""
  snakeArray.forEach((e, index) => {
    snakeElement = document.createElement("div")
    snakeElement.style.gridRowStart = e.y
    snakeElement.style.gridColumnStart = e.x

    if (index === 0) {
      snakeElement.classList.add("head")
    } else {
      snakeElement.classList.add("snake")
    }
    board.appendChild(snakeElement)
  })
  //Display the food here
  foodElement = document.createElement("div")
  foodElement.style.gridRowStart = apple.y
  foodElement.style.gridColumnStart = apple.x
  foodElement.classList.add("apple")
  board.appendChild(foodElement)
}

//Requesting the browser to handle the animation of this game
window.requestAnimationFrame(main)

//When a user click WASD or Arrow keys, then the snake should move
window.addEventListener("keydown", e => {
  //Playing the moving sound here
  moveSound.play()

  //Adding a switch case to get the value of the key pressed
  switch (e.key) {
    //If a key is pressed
    case "a":
      inputDirection.x = -1
      inputDirection.y = 0
      break

    //If w key is pressed
    case "w":
      inputDirection.x = 0
      inputDirection.y = -1
      break

    //If s key is pressed
    case "s":
      inputDirection.x = 0
      inputDirection.y = 1
      break

    //If d key is pressed
    case "d":
      inputDirection.x = 1
      inputDirection.y = 0
      break
    //If up key is pressed
    case "ArrowUp":
      inputDirection.x = 0
      inputDirection.y = -1
      break

    //If down key is pressed
    case "ArrowDown":
      inputDirection.x = 0
      inputDirection.y = 1
      break

    //If right key is pressed
    case "ArrowRight":
      inputDirection.x = 1
      inputDirection.y = 0
      break

    //If left key is pressed
    case "ArrowLeft":
      inputDirection.x = -1
      inputDirection.y = 0
      break
  }
})

//Creating a highscore variable which will update
//whenever the user crosses the previous highscore
let highscore = localStorage.getItem("highscore")

//If the highscore is null (means the game is played for the first time), then
//set it to 0
if (highscore === null) {
  //Tip: You can name a variable without any keyword before it also! :O
  highscoreval = 0
  localStorage.setItem("highscore", JSON.stringify(highscoreval))
} else {
  //If it's not the case, then update highscore as the score goes increasing the
  //highscore
  highscoreval = JSON.parse(highscore)
  highscoreBox.innerHTML = `High Score: ${highscore}`
}
