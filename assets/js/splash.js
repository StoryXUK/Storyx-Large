 // Get the canvas element
 const canvas = document.getElementById('output-canvas');
 const context = canvas.getContext('2d');

 // Load the images
 const image1 = new Image();
 const image2 = new Image();

 image1.src = '../assets/images/laptop.png';
 image2.src = '../assets/images/colour.png';

 // Wait for the images to load
 Promise.all([loadImage(image1), loadImage(image2)])
   .then(() => {
     // Set the canvas size to match the image size
     canvas.width = image1.width;
     canvas.height = image1.height;

     // Draw the images onto the canvas
     context.drawImage(image1, 0, 0);
     context.drawImage(image2, 0, 0);
   });

 function loadImage(image) {
   return new Promise((resolve, reject) => {
     image.onload = resolve;
     image.onerror = reject;
   });
 }