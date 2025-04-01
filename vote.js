document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".image-card").forEach((card) => {
    const imageId = card.dataset.imageId;
    const likeCountSpan = card.querySelector(".like-count");
    const likeButton = card.querySelector(".like-button");

    let storedLikes = localStorage.getItem(`likes_${imageId}`) || "0";
    likeCountSpan.textContent = `${storedLikes} ❤️`;

    likeButton.addEventListener("click", function () {
      let likes = parseInt(localStorage.getItem(`likes_${imageId}`) || "0");
      let liked = likeButton.classList.contains("liked");

      if (liked) {
        likes--;
        likeButton.textContent = "❤️ Like";
      } else {
        likes++;
        likeButton.textContent = "❤️ Unlike";
      }

      localStorage.setItem(`likes_${imageId}`, likes);
      likeCountSpan.textContent = `${likes} ❤️`;
      likeButton.classList.toggle("liked");
    });
  });
});
