$(() => {
  $(".close-side-bar-btn").on("click", () => {
    $(".side-bar").toggleClass("open closed");
  });
  $(".open-side-bar-btn").on("click", () => {
    $(".side-bar").toggleClass("open closed");
  });
});
