document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.getElementById("mainImage");
  const info = document.getElementById("info");
  const detail = document.getElementById("detail");
  const thumbs = document.querySelectorAll(".thumb");

  // 音声
  let sound = null;
  try {
    sound = new Audio("sounds/click.mp3");
    sound.volume = 0.4;
  } catch (e) {}

  function playSound() {
    if (!sound) return;
    try {
      sound.currentTime = 0;
      sound.play().catch(() => {});
    } catch (e) {}
  }

  let currentIndex = 0;

  function renderFromThumb(thumb, index) {
    mainImage.classList.remove("fade-in");
    mainImage.classList.add("fade-out");

    setTimeout(() => {
      mainImage.src = thumb.src;
      mainImage.alt = thumb.dataset.label || "";

      // カウンター表示「5 / 11」
      info.innerHTML = `
        <span class="photo-label">${thumb.dataset.label || ""}</span>
        <span class="photo-counter">${index + 1} / ${thumbs.length}</span>
      `;

      detail.innerHTML = `
  <div class="detail-box">
    <strong>時間🕒</strong><span>${thumb.dataset.time || ""}</span>
    <strong>内容📌</strong><span>${thumb.dataset.item || ""}</span>
    <strong>効果✨</strong><span>${thumb.dataset.effect || ""}</span>
  </div>
`;

      mainImage.classList.remove("fade-out");
      mainImage.classList.add("fade-in");
    }, 150);

    playSound();
  }

  function goTo(index) {
    thumbs.forEach(t => t.classList.remove("active"));
    thumbs[index].classList.add("active");

    // サムネイルが見えるようにスクロール
    thumbs[index].scrollIntoView({ block: "nearest", inline: "nearest" });

    currentIndex = index;
    renderFromThumb(thumbs[index], index);
  }

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => goTo(index));
  });

  mainImage.addEventListener("click", () => {
    goTo((currentIndex + 1) % thumbs.length);
  });

  // キーボード ← → で切り替え
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") goTo((currentIndex + 1) % thumbs.length);
    if (e.key === "ArrowLeft")  goTo((currentIndex - 1 + thumbs.length) % thumbs.length);
  });

  if (thumbs.length > 0) goTo(0);
});
