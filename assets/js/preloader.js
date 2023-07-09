window.addEventListener("load", function() {
    var preloader = document.getElementById("preloader");
    var content = document.getElementById("content");
    
    setTimeout(function() {
      preloader.classList.add("hidden");
      content.classList.add("show");
      content.style.left = "0";
      document.body.style.overflow = "auto";
    }, 3000); // Adjust the delay as needed
  });