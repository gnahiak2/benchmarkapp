const button = document.querySelector<HTMLButtonElement>("#start");
const results = document.querySelector<HTMLPreElement>("#results");

button?.addEventListener("click", () => {
  results!.textContent = "Benchmark starting...";
});
