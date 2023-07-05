// Define the canvas element and its dimensions
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define an array to store the fireworks
let fireworks = [];

// Function to create a firework
function createFirework() {
  const firework = {
    x: Math.random() * canvas.width, // x position
    y: canvas.height, // y position (starting from the bottom)
    color: getRandomColor(), // random color
    velocity: {
      x: Math.random() * 4 - 2, // random horizontal velocity (-2 to 2)
      y: Math.random() * -10 - 10 // random vertical velocity (-10 to -20)
    },
    gravity: 0.2 // gravity to pull the firework downwards
  };
  
  fireworks.push(firework);
}

// Function to update and draw the fireworks
function updateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < fireworks.length; i++) {
    const firework = fireworks[i];
    
    // Update the firework's position and velocity
    firework.x += firework.velocity.x;
    firework.y += firework.velocity.y;
    firework.velocity.y += firework.gravity;
    
    // Draw the firework as a circle
    ctx.beginPath();
    ctx.arc(firework.x, firework.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = firework.color;
    ctx.fill();
    
    // Remove the firework if it goes offscreen or falls to the ground
    if (firework.y >= canvas.height || firework.velocity.y >= 0) {
      fireworks.splice(i, 1);
    }
  }
  
  requestAnimationFrame(updateFireworks);
}

// Function to generate a random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Trigger the creation of a firework on mouse click
document.addEventListener('click', createFirework);

// Start the animation loop
updateFireworks();
