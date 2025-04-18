document.addEventListener("DOMContentLoaded", () => {
  let startY = 0;
  let endY = 0;
  let timerInterval = null;
  let startTime = null;

  const clockElement = document.getElementById("clock");

  const counters = [
    { element: document.getElementById("count1"), value: 0 },
    { element: document.getElementById("count2"), value: 0 }
  ];

  const modal = document.getElementById("trophy-modal");
  const modalYes = document.getElementById("modal-yes");
  const modalNo = document.getElementById("modal-no");
  const trophyButton = document.querySelector(".trophy-button");

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
      startY = event.touches[0].clientY;
    });

    counterDiv.addEventListener("touchend", (event) => {
      endY = event.changedTouches[0].clientY;

      if (Math.abs(endY - startY) < 10) {
        updateCounter(index, 1);
      } else {
        handleSwipe(index);
      }
    });
  }

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

  trophyButton.addEventListener("click", () => {
    modal.classList.add("show");
    modal.style.display = "flex";
  });

  modalNo.addEventListener("click", () => {
    modal.classList.remove("show");
    setTimeout(() => modal.style.display = "none", 300);
  });

  modalYes.addEventListener("click", () => {
    console.log("✅ Yes Button Clicked - Match Finalized");
    modal.classList.remove("show");
    setTimeout(() => modal.style.display = "none", 300);

    const elapsedTime = startTime ? Date.now() - startTime : 0;
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const match_duration = `${minutes} minutes, ${seconds} seconds`;

    const teamOneScore = counters[0].value;
    const teamTwoScore = counters[1].value;

    let winner, loser;
    if (teamOneScore > teamTwoScore) {
      winner = "team_one";
      loser = "team_two";
    } else if (teamTwoScore > teamOneScore) {
      winner = "team_two";
      loser = "team_one";
    } else {
      winner = "tie";
      loser = "tie";
    }

    const data = {
      statistic: {
        match_duration: match_duration,
        team_one_score: teamOneScore,
        team_two_score: teamTwoScore,
        winner: winner,
        loser: loser
      }
    };

    modalYes.disabled = true;

    fetch("/statistics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        console.log("Statistic saved:", result);
        alert("🏆 Partida Finalizada!");

        // ✅ Reset the scoreboard counters
        counters.forEach((counter) => {
          counter.value = 0;
          counter.element.textContent = counter.value;
          counter.element.classList.add("shake");

          setTimeout(() => {
            counter.element.classList.remove("shake");
          }, 500);
        });

        // ✅ Reset the clock
        checkTimer();

      })
      .catch(error => {
        console.error("Error saving statistics:", error);
        alert("❌ Error saving statistics");
      })
      .finally(() => {
        modalYes.disabled = false;
      });
  });
});
