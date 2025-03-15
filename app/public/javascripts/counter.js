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
    console.log(`Counter ${index + 1} updated:`, counters[index].value);
  }

  function handleSwipe(index) {
    const swipeDistance = endY - startY;
    const swipeThreshold = 50; // Minimum swipe distance to trigger action

    if (swipeDistance < -swipeThreshold) {
      console.log(`Swipe up detected on counter ${index + 1}`);
      updateCounter(index, 1);
    } else if (swipeDistance > swipeThreshold) {
      console.log(`Swipe down detected on counter ${index + 1}`);
      updateCounter(index, -1);
    }
  }

  function setupTouchListener(counterDiv, index) {
    counterDiv.addEventListener("touchstart", (event) => {
      startY = event.touches[0].clientY;
    });

    counterDiv.addEventListener("touchend", (event) => {
      endY = event.changedTouches[0].clientY;

      // Check if it was a tap (i.e., not a swipe)
      if (Math.abs(endY - startY) < 10) {
        console.log(`Tap detected on counter ${index + 1}`);
        updateCounter(index, 1);
      } else {
        handleSwipe(index);
      }
    });
  }

  // Attach touch listeners to the entire counter divs
  setupTouchListener(document.getElementById("counter1"), 0);
  setupTouchListener(document.getElementById("counter2"), 1);

  // Reset button
  document.querySelector(".reset-button").addEventListener("touchend", () => {
    console.log("Reset button tapped");
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
