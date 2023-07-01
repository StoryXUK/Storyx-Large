window.addEventListener("DOMContentLoaded", function() {
  combineImages();
});

function combineImages() {
  // Create a canvas element
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  // Load the images
  var laptopImage = new Image();
  laptopImage.src = "../assets/images/laptop.png";

  var colorImage = new Image();
  colorImage.src = "../assets/images/colour.png";

  var storyxImage = new Image();
  storyxImage.src = "../assets/images/storyx.png";

  // Wait for the images to load
  Promise.all([
    new Promise((resolve, reject) => {
      laptopImage.onload = resolve;
      laptopImage.onerror = reject;
    }),
    new Promise((resolve, reject) => {
      colorImage.onload = resolve;
      colorImage.onerror = reject;
    }),
    new Promise((resolve, reject) => {
      storyxImage.onload = resolve;
      storyxImage.onerror = reject;
    })
  ])
    .then(() => {
      // Set the canvas size to accommodate all the images
      canvas.width = laptopImage.width * 2 + colorImage.width;
      canvas.height = Math.max(laptopImage.height, colorImage.height, storyxImage.height);

      // Calculate the positions for the images
      var laptopX = canvas.width / 2 - laptopImage.width / 2;
      var laptopY = canvas.height / 2 - laptopImage.height / 2;
      var colorX = laptopX + laptopImage.width;
      var storyxX = laptopX - storyxImage.width;

      // Animate the images
      var slideDistanceColor = colorX - laptopX;
      var slideSpeedColor = slideDistanceColor / 500; // Adjust the slide speed as needed

      var slideDistanceStoryx = laptopX - storyxX;
      var slideSpeedStoryx = slideDistanceStoryx / 500; // Adjust the slide speed as needed

      var slideProgressColor = 0;
      var slideProgressStoryx = 0;

      function animate() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the laptop image
        ctx.drawImage(laptopImage, laptopX, laptopY);

        // Calculate the current positions of the color and storyx images
        var currentColorX = colorX - slideProgressColor;
        var currentStoryxX = storyxX + slideProgressStoryx;

        // Draw the color image at the updated position
        ctx.drawImage(colorImage, currentColorX, laptopY);

        // Draw the storyx image at the updated position
        ctx.drawImage(storyxImage, currentStoryxX, laptopY);

        // Update the slide progress
        slideProgressColor += slideSpeedColor;
        slideProgressStoryx += slideSpeedStoryx;

        // Continue the animation until both images reach their target positions
        if (slideProgressColor <= slideDistanceColor || slideProgressStoryx <= slideDistanceStoryx) {
          requestAnimationFrame(animate);
        }
      }

      // Start the animation after a delay
      setTimeout(animate, 1000);
    })
    .catch(handleError);
}

function handleError(error) {
  console.error("Error loading images:", error);
}

