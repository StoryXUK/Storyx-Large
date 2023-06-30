document.addEventListener('DOMContentLoaded', function() {
  var canvas = document.getElementById('constellation-canvas');
  var context = canvas.getContext('2d');
  var stars = [];
  var numStars = 40; // Adjust the number of stars as needed
  var starRadius = 2;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  createStars();
  animate();

  function createStars() {
    for (var i = 0; i < numStars; i++) {
      var x = Math.random() * canvas.width;
      var y = Math.random() * canvas.height;
      var color = getRandomColor();
      stars.push({ x: x, y: y, color: color, vx: 0.5 - Math.random(), vy: 0.5 - Math.random() });
    }
  }

  function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < stars.length; i++) {
      updateStarPosition(stars[i]);
      drawStar(stars[i].x, stars[i].y, stars[i].color);
    }

    connectStars();

    requestAnimationFrame(animate);
  }

  function updateStarPosition(star) {
    star.x += star.vx;
    star.y += star.vy;

    // Wrap the stars around the canvas edges
    if (star.x < -starRadius) {
      star.x = canvas.width + starRadius;
    } else if (star.x > canvas.width + starRadius) {
      star.x = -starRadius;
    }
    if (star.y < -starRadius) {
      star.y = canvas.height + starRadius;
    } else if (star.y > canvas.height + starRadius) {
      star.y = -starRadius;
    }
  }

  function drawStar(x, y, color) {
    context.beginPath();
    context.arc(x, y, starRadius, 0, Math.PI * 2, false);
    context.fillStyle = color;
    context.fill();
    context.closePath();
  }

  function connectStars() {
    for (var i = 0; i < stars.length; i++) {
      for (var j = i + 1; j < stars.length; j++) {
        var dx = stars[i].x - stars[j].x;
        var dy = stars[i].y - stars[j].y;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) { // Adjust the distance threshold as needed
          context.beginPath();
          context.moveTo(stars[i].x, stars[i].y);
          context.lineTo(stars[j].x, stars[j].y);
          context.strokeStyle = getRandomColor();
          context.lineWidth = 0.5;
          context.stroke();
          context.closePath();
        }
      }
    }
  }

  
  // Helper function to generate a random color
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

});


