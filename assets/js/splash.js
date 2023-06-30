document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById('constellation-canvas');
    var context = canvas.getContext('2d');
    var stars = [];
    var numStars = 100; // Adjust the number of stars as needed
  
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    createStars();
    animate();
  
    function createStars() {
      for (var i = 0; i < numStars; i++) {
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;
        var dx = (Math.random() - 0.5) * 2; // Random velocity in x direction
        var dy = (Math.random() - 0.5) * 2; // Random velocity in y direction
        stars.push({ x: x, y: y, dx: dx, dy: dy });
      }
    }
  
    function animate() {
      context.clearRect(0, 0, canvas.width, canvas.height);
  
      for (var i = 0; i < stars.length; i++) {
        updateStarPosition(stars[i]);
        drawStar(stars[i].x, stars[i].y);
      }
  
      connectStars();
  
      requestAnimationFrame(animate);
    }
  
    function updateStarPosition(star) {
      star.x += star.dx;
      star.y += star.dy;
  
      // Wrap the stars around the canvas edges
      if (star.x < 0) {
        star.x = canvas.width;
      } else if (star.x > canvas.width) {
        star.x = 0;
      }
      if (star.y < 0) {
        star.y = canvas.height;
      } else if (star.y > canvas.height) {
        star.y = 0;
      }
    }
  
    function drawStar(x, y) {
      context.beginPath();
      context.arc(x, y, 2, 0, Math.PI * 2, false);
      context.fillStyle = '#000000'; // Set the fill color to black
      context.fill();
      context.closePath();
    }
  
    function connectStars() {
      for (var i = 0; i < stars.length; i++) {
        for (var j = i + 1; j < stars.length; j++) {
          var dx = stars[i].x - stars[j].x;
          var dy = stars[i].y - stars[j].y;
          var distance = Math.sqrt(dx * dx + dy * dy);
  
          if (distance < 150) { // Adjust the distance threshold as needed
            context.beginPath();
            context.moveTo(stars[i].x, stars[i].y);
            context.lineTo(stars[j].x, stars[j].y);
            context.strokeStyle = '#000000'; // Set the stroke color to black
            context.lineWidth = 0.5; // Adjust the line width as needed
            context.stroke();
            context.closePath();
          }
        }
      }
    }
  });
  
  

  document.addEventListener('DOMContentLoaded', function() {
    var curtainContainer = document.querySelector('.curtain-container');
    var curtain = document.querySelector('.curtain');
  
    curtainContainer.addEventListener('click', function() {
      curtain.classList.toggle('curtain-open');
    });
  });
  