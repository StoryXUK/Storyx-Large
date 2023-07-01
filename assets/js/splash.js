// Get the canvas element and its 2D rendering context
var canvas = document.getElementById("fireworksCanvas");
var ctx = canvas.getContext("2d");

// Set the width and height of the canvas to match the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Function to create a firework particle
function createParticle(x, y, color) {
  return {
    x: x,
    y: y,
    color: color,
    radius: 2,
    velocity: {
      x: Math.random() * 6 - 3,
      y: Math.random() * 6 - 3
    },
    gravity: 0.05,
    opacity: 1,
    update: function() {
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      this.velocity.y += this.gravity;
      this.opacity -= 0.01;
    },
    draw: function() {
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  };
}

// Array to store the firework particles
var particles = [];

// Function to create a firework
function createFirework(x, y) {
  var colors = ["#FF4136", "#FF851B", "#FFDC00", "#2ECC40", "#0074D9", "#B10DC9"];
  var numParticles = 100;
  
  for (var i = 0; i < numParticles; i++) {
    var color = colors[Math.floor(Math.random() * colors.length)];
    var particle = createParticle(x, y, color);
    particles.push(particle);
  }
}

// Function to update and draw the particles
function updateParticles() {
  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];
    particle.update();
    
    if (particle.opacity <= 0) {
      particles.splice(i, 1);
      i--;
    }
  }
}

function drawParticles() {
  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];
    particle.draw();
  }
}

// Function to animate the fireworks
function animate() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Update and draw the particles
  updateParticles();
  drawParticles();
  
  // Request the next animation frame
  requestAnimationFrame(animate);
}

// Function to handle mouse clicks
function handleClick(event) {
  var x = event.clientX;
  var y = event.clientY;
  createFirework(x, y);
}

// Start the animation
animate();

// Add a click event listener to the document
document.addEventListener("click", handleClick);