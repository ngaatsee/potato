let methok;
let coinImg;
let bgImage;
let coins = [];
let showMessage = false;
let messageTimer = 0;

let gameState = "start";
let player = { x: 20, y: 315, size: 40 };

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

  coins = [
    { x: 60, y: 300, collected: false },
    { x: 270, y: 325, collected: false },
    { x: 230, y: 190, collected: false },
    { x: 200, y: 125, collected: false },
    { x: 300, y: 291, collected: false },
    { x: 200, y: 325, collected: false }
  ];

  noSmooth();  // Smooth graphics are turned off for a pixelated style (optional)
}

function draw() {
  if (gameState === "start") {
    showStartScreen();
  } else if (gameState === "play") {
    image(bgImage, 0, 0, width, height); // Display background image
    drawCoins();
    drawPlayer();
    showStoryMessage();
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
  for (let i = 0; i < coins.length; i++) {
    if (!coins[i].collected) {
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
