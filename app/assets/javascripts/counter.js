document.addEventListener("DOMContentLoaded", function () {
  const counters = [
    { id: "counter1", span: "count1", key: "counter1", value: 0 },
    { id: "counter2", span: "count2", key: "counter2", value: 0 }
  ];

  initializeCounters();
  attachResetButtonListener();

  // Initialize all counters
  function initializeCounters() {
    counters.forEach(counter => {
      loadCounterValue(counter);
      attachSwipeEvents(counter);
      attachClickEvent(counter);
    });
  }

  // Load value from Local Storage
  function loadCounterValue(counter) {
    const savedValue = localStorage.getItem(counter.key);
    if (savedValue !== null) {
      counter.value = parseInt(savedValue);
      updateDisplay(counter);
    }
  }

  // Save value to Local Storage
  function saveCounterValue(counter) {
    localStorage.setItem(counter.key, counter.value);
  }

  // Update counter display
  function updateDisplay(counter) {
    const counterSpan = document.getElementById(counter.span);
    counterSpan.textContent = counter.value;
  }

  // Increment Counter
  function incrementCounter(counter) {
    counter.value++;
    updateDisplay(counter);
    saveCounterValue(counter);
    triggerBounce(counter.id);
  }

  // Decrement Counter (Prevent Negative)
  function decrementCounter(counter) {
    if (counter.value > 0) {
      counter.value--;
      updateDisplay(counter);
      saveCounterValue(counter);
      triggerBounce(counter.id);
    }
  }

  // Trigger Bounce Animation
  // Trigger Bounce Animation
  function triggerBounce(counterId) {
    const counterDiv = document.getElementById(counterId);

    // Remove existing animation class to restart animation
    counterDiv.classList.remove("bounce");

    // Trigger reflow to restart animation
    void counterDiv.offsetWidth;

    // Add bounce class for animation
    counterDiv.classList.add("bounce");
  }


  // Attach Swipe Events for Increment and Decrement
  function attachSwipeEvents(counter) {
    const counterDiv = document.getElementById(counter.id);

    let startY = 0;
    let endY = 0;

    counterDiv.addEventListener("touchstart", (event) => {
      startY = event.touches[0].clientY;
    });

    counterDiv.addEventListener("touchend", (event) => {
      endY = event.changedTouches[0].clientY;

      if (endY < startY) {
        // Swipe Up - Increment
        incrementCounter(counter);
      } else if (endY > startY) {
        // Swipe Down - Decrement
        decrementCounter(counter);
      }
    });
  }

  // Attach Click Event for Desktop Testing
  function attachClickEvent(counter) {
    const counterDiv = document.getElementById(counter.id);

    counterDiv.addEventListener("click", () => {
      incrementCounter(counter);
    });
  }

  // Attach Click Event to Reset Button
  function attachResetButtonListener() {
    const resetButton = document.querySelector(".reset-button");
    resetButton.addEventListener("click", () => {
      resetAllCounters();
    });
  }

  // Reset All Counters
  function resetAllCounters() {
    counters.forEach(counter => {
      counter.value = 0;
      updateDisplay(counter);
      saveCounterValue(counter);
    });
  }
});
