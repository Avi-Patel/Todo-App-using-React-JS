let timeoutId;

export const showSnackbar = (message) => {
  let snackbar = document.querySelector("[data-id=snackbar]");
  snackbar.textContent = message;

  snackbar.classList.add("show");

  timeoutId = setTimeout(() => {
    if (prevTimeoutId === timeoutId) {
      snackbar.classList.toggle("show");
    }
  }, 3000);
  const prevTimeoutId = timeoutId;
};
