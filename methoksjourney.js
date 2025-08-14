let methok;
let coinImg;
let bgImage;
let coins = [];
let showMessage = false;
let messageTimer = 0;
let gameState = "start";
let player = { x: 20, y: 315, size: 40 };
let confetti = [];
let showConfetti = false;
let resetButton; // Declare variable for the reset button

let storyIndex = 0;
let story = [
 "Methok lived in a poor village in Tibet.",
  "She comes across a man who she helps, and in return he helps her study further.",
  "She went back to improve her village and help tibetans.",
  "Kindness has a way of coming back to you.",
  "She attended MIT and became a computer scientist.",
  "She dreamed of becoming a successful computer scientist."
];
function preload() {
  methok = loadImage("Methok.png");
  coinImg = loadImage("Coin.png");
  bgImage = loadImage("background.png"); // Use your actual background image filename
}

function setup() {
  createCanvas(600, 400); // Define the size of the canvas
  
  // Create coins positions
  coins = [
    { x: 60, y: 300, collected: false },
    { x: 270, y: 325, collected: false },
    { x: 230, y: 190, collected: false },
    { x: 200, y: 125, collected: false },
    { x: 300, y: 291, collected: false },
    { x: 200, y: 325, collected: false }
  ];

  // Create the reset button and position it at the top left
  resetButton = createButton("Reset");
  resetButton.position(10, 10); // Place the button in the top-left corner
  resetButton.mousePressed(resetGame); // Attach the reset event

  noSmooth(); // Smooth graphics are turned off for a pixelated style (optional)
}

function draw() {
  if (gameState === "start") {
    showStartScreen();
  } else if (gameState === "play") {
    image(bgImage, 0, 0, width, height); // Display background image
    drawCoins();
    drawPlayer();
    showStoryMessage();

    if (showConfetti) {
      // Generate confetti continuously
      for (let i = 0; i < 5; i++) {
        confetti.push(new ConfettiPiece(random(width), random(-50, 0)));
      }

      // Update and draw confetti
      for (let i = confetti.length - 1; i >= 0; i--) {
        confetti[i].update();
        confetti[i].draw();

        // Remove confetti if it goes off-screen to manage performance
        if (confetti[i].y > height) {
          confetti.splice(i, 1);
        }
      }

      showEndMessage(); // Show "The End" message
    }
  }
}

function showStartScreen() {
  background(50, 100, 150);
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Methok's Journey", width / 2, height / 2 - 40);
  textSize(16);
  text("Press any key to Play", width / 2, height / 2 + 20);
}

function drawPlayer() {
  let nextX = player.x;
  let nextY = player.y;

  if (keyIsDown(LEFT_ARROW)) nextX -= 2;
  if (keyIsDown(RIGHT_ARROW)) nextX += 2;
  if (keyIsDown(UP_ARROW)) nextY -= 2;
  if (keyIsDown(DOWN_ARROW)) nextY += 2;

  // Update player position
  player.x = nextX;
  player.y = nextY;

  image(methok, player.x, player.y, player.size, player.size);
}

function drawCoins() {
  let allCollected = true;

  for (let i = 0; i < coins.length; i++) {
    if (!coins[i].collected) {
      allCollected = false;
      image(coinImg, coins[i].x, coins[i].y, 30, 30);

      // Check if player collected the coin
      if (dist(player.x, player.y, coins[i].x, coins[i].y) < 30) {
        coins[i].collected = true;
        storyIndex = i;
        showMessage = true;
        messageTimer = millis();
      }
    }
  }

  if (allCollected) {
    showConfetti = true;
  }
}

function showStoryMessage() {
  if (showMessage && storyIndex < story.length) {
    fill(255);
    stroke(0);
    strokeWeight(2);
    rect(50, height - 80, width - 100, 60, 10);
    fill(0);
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text(story[storyIndex], width / 2, height - 50);

    if (millis() - messageTimer > 3000) {
      showMessage = false;
    }
  }
}

function showEndMessage() {
  fill(0); // Set the fill color to black
  textSize(32);
  textAlign(CENTER, CENTER);
  text("The End", width / 2, height / 2 - 50); // Move text slightly to the top
}

function keyPressed() {
  if (gameState === "start") {
    gameState = "play";
  }
}

function mousePressed() {
  if (gameState === "start") {
    gameState = "play";
  }
}

function resetGame() {
  gameState = "start"; // Change game state to start
  player.x = 20;
  player.y = 315;
  showConfetti = false;
  confetti = []; // Clear confetti array
  storyIndex = 0;
  showMessage = false;

  // Reset coins
  for (let i = 0; i < coins.length; i++) {
    coins[i].collected = false;
  }
}

function ConfettiPiece(x, y) {
  this.x = x;
  this.y = y;
  this.size = random(5, 10);
  this.color = color(random(255), random(255), random(255));

  this.update = function() {
    this.y += random(1, 3);
    this.x += random(-1, 1);
  };

  this.draw = function() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  };
}
