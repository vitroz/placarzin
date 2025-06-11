let startY = 0;

document.addEventListener("DOMContentLoaded", () => {
  let endY = 0;
  let timerInterval = null;
  let startTime = null;

  document.addEventListener("touchstart", function (e) {
    startY = e.touches[0].clientY;
  }, { passive: false });

  document.addEventListener("touchmove", function (e) {
    if (window.scrollY === 0 && e.touches[0].clientY > startY) {
      e.preventDefault();
    }
  }, { passive: false });

  const clockElement = document.getElementById("clock");

  const counters = [
    { element: document.getElementById("count1"), value: 0 },
    { element: document.getElementById("count2"), value: 0 }
  ];

  function updateCounter(index, delta) {
    counters[index].value = Math.max(0, counters[index].value + delta);
    counters[index].element.textContent = counters[index].value;
    console.log(`Counter ${index + 1} updated:`, counters[index].value);

    checkTimer();
  }

  function checkTimer() {
    const anyActive = counters.some(counter => counter.value > 0);

    if (anyActive && !timerInterval) {
      startTimer();
    } else if (!anyActive) {
      stopTimer();
    }
  }

  function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 50);
  }

  function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    clockElement.textContent = "00:00:00";
  }

  function updateTimer() {
    const elapsedTime = Date.now() - startTime;

    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);

    clockElement.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(2, "0")}`;
  }

  function handleSwipe(index) {
    const swipeDistance = endY - startY;
    const swipeThreshold = 50;

    if (swipeDistance < -swipeThreshold) {
      updateCounter(index, 1);
    } else if (swipeDistance > swipeThreshold) {
      updateCounter(index, -1);
    }
  }

  function setupTouchListener(counterDiv, index) {
    counterDiv.addEventListener("touchstart", (event) => {
      if (event.target.closest(".floating-arrow-btn")) return;
      startY = event.touches[0].clientY;
    });

    counterDiv.addEventListener("touchend", (event) => {
      if (event.target.closest(".floating-arrow-btn")) return;
      endY = event.changedTouches[0].clientY;

      if (Math.abs(endY - startY) < 10) {
        updateCounter(index, 1);
      } else {
        handleSwipe(index);
      }
    });
  }

  document.querySelector("#counter1 .floating-arrow-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    updateCounter(0, -1);
  });

  document.querySelector("#counter2 .floating-arrow-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    updateCounter(1, -1);
  });

  setupTouchListener(document.getElementById("counter1"), 0);
  setupTouchListener(document.getElementById("counter2"), 1);

  document.querySelector(".reset-button").addEventListener("touchend", () => {
    counters.forEach((counter) => {
      counter.value = 0;
      counter.element.textContent = counter.value;
      counter.element.classList.add("shake");

      setTimeout(() => {
        counter.element.classList.remove("shake");
      }, 500);
    });

    checkTimer();
  });
});
