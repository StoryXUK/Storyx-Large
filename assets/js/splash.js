document.addEventListener('DOMContentLoaded', function() {
    var portfolioSection = document.getElementById('portfolio');
    var image = portfolioSection.querySelector('.color-splash img');
    var canvas = portfolioSection.querySelector('#color-splash-canvas');
    var context = canvas.getContext('2d');
    var observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 // Adjust the threshold as needed
    };
  
    var observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          applyColorSplash();
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    observer.observe(portfolioSection);
  
    function applyColorSplash() {
      image.onload = function() {
        canvas.width = image.width;
        canvas.height = image.height;
  
        context.drawImage(image, 0, 0);
        grayscale();
      };
  
      function grayscale() {
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
  
        for (var i = 0; i < data.length; i += 4) {
          var grayscale = data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11;
          data[i] = grayscale; // Red
          data[i + 1] = grayscale; // Green
          data[i + 2] = grayscale; // Blue
        }
  
        context.putImageData(imageData, 0, 0);
      }
    }
  });

  
  