document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.querySelector(".menu-icon");
  const menuDropdown = document.querySelector(".menu-dropdown");
  const searchButton = document.querySelector(".search-button");
  const searchInput = document.querySelector(".search-container input");
  const container = document.querySelector(".container");

  // Toggle Menu Dropdown
  menuIcon.addEventListener("click", function (event) {
    event.stopPropagation();
    menuDropdown.classList.toggle("show");
  });

  // Close menu if clicked outside
  document.addEventListener("click", function (event) {
    if (
      !menuIcon.contains(event.target) &&
      !menuDropdown.contains(event.target)
    ) {
      menuDropdown.classList.remove("show");
    }
  });

  // Search Functionality
  searchButton.addEventListener("click", function () {
    const query = searchInput.value.trim();
    if (query) {
      alert("Searching for: " + query); // Replace this with actual search logic
    }
  });

  // Image Upload & Removal Functionality
  const addImageCard = document.querySelector(".add-image-card");

  addImageCard.addEventListener("click", function () {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.style.display = "none";

    fileInput.addEventListener("change", function () {
      if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
          const newImageCard = document.createElement("div");
          newImageCard.classList.add("image-card");

          const img = document.createElement("img");
          img.src = e.target.result;
          img.alt = "Uploaded Image";
          img.loading = "lazy";

          // Create delete button (bin icon)
          const deleteBtn = document.createElement("div");
          deleteBtn.classList.add("delete-btn");
          deleteBtn.innerHTML = "🗑️";

          // Remove Image on Bin Click
          deleteBtn.addEventListener("click", function (event) {
            event.stopPropagation(); // Prevent accidental clicks on the image
            if (confirm("Do you want to remove this image?")) {
              newImageCard.remove();
            }
          });

          newImageCard.appendChild(img);
          newImageCard.appendChild(deleteBtn);
          container.insertBefore(newImageCard, addImageCard);
        };

        reader.readAsDataURL(file);
      }
    });

    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
  });

  // Attach Delete Button to Existing Images
  document.querySelectorAll(".image-card").forEach((card) => {
    if (!card.querySelector(".delete-btn")) {
      const deleteBtn = document.createElement("div");
      deleteBtn.classList.add("delete-btn");
      deleteBtn.innerHTML = "🗑️";

      deleteBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        if (confirm("Do you want to remove this image?")) {
          card.remove();
        }
      });

      card.appendChild(deleteBtn);
    }
  });
});
