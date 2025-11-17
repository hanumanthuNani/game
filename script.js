// --- Game Variables ---
let player;
const GRAVITY = 0.5;
const JUMP_POWER = 12;
const MAX_SPEED = 5;
const GROUND_Y = 350; // Y coordinate of the ground

// --- Player Object (for organization) ---
class Player {
    constructor() {
        this.x = 50;
        this.y = 50;
        this.width = 40;
        this.height = 60;
        this.velY = 0; // Vertical velocity (gravity)
        this.velX = 0; // Horizontal velocity (movement)
        this.isGrounded = false;
        this.color = [255, 100, 100]; // Reddish color
    }

    // Apply physics and check for ground collision
    update() {
        // 1. Apply Gravity
        this.velY += GRAVITY;
        this.y += this.velY;

        // 2. Horizontal Movement
        this.x += this.velX;

        // 3. Ground Collision
        if (this.y + this.height > GROUND_Y) {
            this.y = GROUND_Y - this.height;
            this.velY = 0; // Stop falling
            this.isGrounded = true;
        } else {
            this.isGrounded = false;
        }

        // 4. Friction/Deceleration
        this.velX *= 0.85; // Slow down over time
        if (abs(this.velX) < 0.1) this.velX = 0;

        // 5. Keep Player in Bounds (simple check)
        this.x = constrain(this.x, 0, width - this.width);
    }

    // Draw the player (The 'animation')
    draw() {
        fill(this.color);
        // Better visualization: change color/shape slightly when grounded
        if (this.isGrounded) {
             fill(100, 255, 100); // Green when grounded
        } else {
             fill(255, 100, 100); // Red when falling
        }
        rect(this.x, this.y, this.width, this.height);
    }
}

// --- p5.js Setup Function (Runs Once) ---
function setup() {
    // Create a canvas (game screen)
    let canvas = createCanvas(600, 400);
    canvas.parent('game-container'); // Attach canvas to the container div
    noStroke(); // No outlines for smoother look

    player = new Player();
}

// --- p5.js Draw Loop (Runs constantly - 60 times per second) ---
function draw() {
    // 1. Background
    background(50, 50, 70); // Dark blue/grey background

    // 2. Draw Ground
    fill(40, 40, 50);
    rect(0, GROUND_Y, width, height - GROUND_Y);
    
    // 3. Handle Input (Movement)
    handleInput();

    // 4. Update Game State
    player.update();

    // 5. Draw Game Elements
    player.draw();

    // 6. Draw Debug Info
    fill(255);
    textSize(12);
    text(`Grounded: ${player.isGrounded}`, 10, 20);
    text(`X Velocity: ${player.velX.toFixed(2)}`, 10, 40);
}

// --- Input Handling ---
function handleInput() {
    // Left Arrow Key
    if (keyIsDown(LEFT_ARROW)) {
        player.velX = max(player.velX - 1, -MAX_SPEED);
    }
    // Right Arrow Key
    if (keyIsDown(RIGHT_ARROW)) {
        player.velX = min(player.velX + 1, MAX_SPEED);
    }
}

// --- Jumping (Only fires once per key press) ---
function keyPressed() {
    if (keyCode === UP_ARROW || key === ' ' || keyCode === 32) { // Up Arrow or Spacebar
        if (player.isGrounded) {
            player.velY = -JUMP_POWER; // Apply upward velocity
        }
    }
}
