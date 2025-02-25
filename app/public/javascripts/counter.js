document.addEventListener("DOMContentLoaded", () => {
  let startY = 0;
  let endY = 0;

  const counters = [
    { element: document.getElementById("count1"), value: 0 },
    { element: document.getElementById("count2"), value: 0 }
  ];

  function updateCounter(index, delta) {
    counters[index].value = Math.max(0, counters[index].value + delta);
    counters[index].element.textContent = counters[index].value;
  }

  function handleSwipe(index) {
    const swipeDistance = endY - startY;
    const swipeThreshold = 50; // Minimum swipe distance to trigger action

    if (swipeDistance < -swipeThreshold) {
      // Swipe up → Increment
      updateCounter(index, 1);
    } else if (swipeDistance > swipeThreshold) {
      // Swipe down → Decrement
      updateCounter(index, -1);
    }
  }

  function setupSwipeListener(counterElement, index) {
    counterElement.addEventListener("touchstart", (event) => {
      startY = event.touches[0].clientY;
    });

    counterElement.addEventListener("touchend", (event) => {
      endY = event.changedTouches[0].clientY;
      handleSwipe(index);
    });
  }

  // Attach listeners to both counters
  setupSwipeListener(document.getElementById("counter1"), 0);
  setupSwipeListener(document.getElementById("counter2"), 1);

  // Reset button
  document.querySelector(".reset-button").addEventListener("click", () => {
    counters.forEach((counter) => {
      counter.value = 0;
      counter.element.textContent = counter.value;
      counter.element.classList.add("shake");

      // Remove the shake class after animation completes
      setTimeout(() => {
        counter.element.classList.remove("shake");
      }, 500); // Match the animation duration
    });
  });

});
