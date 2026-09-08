document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     ELEMENTS
  ========================================== */

  const entry = document.getElementById("entry");
  const giftButton = document.getElementById("giftButton");
  const giftParticles = document.getElementById("giftParticles");
  const birthdayContent =
    document.querySelector(".birthday-content");

  const music =
    document.getElementById("birthdayMusic");

  const continueButton =
    document.getElementById("continueButton");

  const balloonsSection =
    document.getElementById("balloons");

  const balloonFinal =
    document.getElementById("balloonFinal");

  const balloons =
    document.querySelectorAll(".balloon");

  const blowButton =
    document.getElementById("blowButton");

  const candleFlame =
    document.getElementById("candleFlame");

  const cakeMessage =
    document.getElementById("cakeMessage");

  const gameBoard =
    document.getElementById("gameBoard");

  const gameArrow =
    document.getElementById("gameArrow");

  const heartTarget =
    document.getElementById("heartTarget");

  const gameHint =
    document.getElementById("gameHint");

  const gameSuccess =
    document.getElementById("gameSuccess");

  const finale =
    document.getElementById("finale");



  /* =========================================
     GIFT OPEN
  ========================================== */

  let giftOpened = false;

  if (giftButton) {

    giftButton.addEventListener("click", () => {

      if (giftOpened) return;

      giftOpened = true;


      /* Open gift */

      entry.classList.add("opened");


      /* Particles */

      createGiftParticles();


      /* Music starts immediately
         because this happens directly
         after user click */

      if (music) {

        music.volume = 0.75;

        const playPromise =
          music.play();

        if (playPromise) {
          playPromise.catch(() => {});
        }

      }


      /* Birthday text */

      setTimeout(() => {

        if (birthdayContent) {
          birthdayContent.classList.add("show");
        }

      }, 600);

    });

  }



  /* =========================================
     GIFT PARTICLES
  ========================================== */

  function createGiftParticles() {

    if (!giftParticles) return;

    for (let i = 0; i < 42; i++) {

      const particle =
        document.createElement("span");

      particle.className =
        "gift-particle";

      const angle =
        Math.random() * Math.PI * 2;

      const distance =
        100 + Math.random() * 190;

      particle.style.setProperty(
        "--x",
        `${Math.cos(angle) * distance}px`
      );

      particle.style.setProperty(
        "--y",
        `${Math.sin(angle) * distance}px`
      );

      particle.style.left = "50%";
      particle.style.top = "50%";

      giftParticles.appendChild(
        particle
      );

      setTimeout(() => {
        particle.remove();
      }, 1400);

    }

  }



  /* =========================================
     CONTINUE → BALLOONS
  ========================================== */

  if (continueButton) {

    continueButton.addEventListener(
      "click",
      () => {

        balloonsSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  }



  /* =========================================
     BALLOONS
  ========================================== */

  let popped = 0;

  balloons.forEach((balloon) => {

    balloon.addEventListener("click", () => {

      if (
        balloon.classList.contains("popped")
      ) {
        return;
      }


      balloon.classList.add("popped");

      popped++;


      /* Show word at same balloon */

      const index =
        balloon.dataset.index;

      const word =
        document.getElementById(
          `word${index}`
        );

      if (word) {

        setTimeout(() => {
          word.classList.add("show");
        }, 180);

      }


      /* Pop sound */

      playPopSound();


      /* Small confetti burst */

      createConfetti(24);


      /* All four */

      if (popped === balloons.length) {

        setTimeout(() => {

          if (balloonFinal) {
            balloonFinal.classList.add("show");
          }

        }, 500);

      }

    });

  });



  /* =========================================
     POP SOUND
  ========================================== */

  function playPopSound() {

    try {

      const AudioContext =
        window.AudioContext ||
        window.webkitAudioContext;

      if (!AudioContext) return;

      const ctx =
        new AudioContext();

      const oscillator =
        ctx.createOscillator();

      const gain =
        ctx.createGain();

      oscillator.type = "triangle";

      oscillator.frequency.setValueAtTime(
        260,
        ctx.currentTime
      );

      oscillator.frequency.exponentialRampToValueAtTime(
        70,
        ctx.currentTime + 0.14
      );

      gain.gain.setValueAtTime(
        0.16,
        ctx.currentTime
      );

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + 0.14
      );

      oscillator.connect(gain);

      gain.connect(
        ctx.destination
      );

      oscillator.start();

      oscillator.stop(
        ctx.currentTime + 0.14
      );

    } catch (error) {
      console.log("Pop sound unavailable");
    }

  }



  /* =========================================
     CONFETTI
  ========================================== */

  function createConfetti(amount = 30) {

    const container =
      document.createElement("div");

    container.className =
      "confetti-container";

    container.style.position = "fixed";
    container.style.inset = "0";
    container.style.zIndex = "99999";
    container.style.pointerEvents = "none";
    container.style.overflow = "hidden";

    document.body.appendChild(
      container
    );


    for (let i = 0; i < amount; i++) {

      const piece =
        document.createElement("span");

      piece.style.position = "absolute";

      piece.style.top = "-15px";

      piece.style.left =
        `${Math.random() * 100}vw`;

      piece.style.width = "7px";
      piece.style.height = "12px";

      piece.style.borderRadius = "2px";

      const colors = [
        "#e84c73",
        "#e7ad45",
        "#8d7ce0",
        "#52b79e"
      ];

      piece.style.background =
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ];

      piece.animate(
        [
          {
            transform:
              `translateY(0) rotate(0deg)`,
            opacity: 1
          },
          {
            transform:
              `translateY(110vh) rotate(720deg)`,
            opacity: 0
          }
        ],
        {
          duration:
            2200 + Math.random() * 1200,
          delay:
            Math.random() * 250,
          easing: "linear",
          fill: "forwards"
        }
      );

      container.appendChild(
        piece
      );

    }


    setTimeout(() => {
      container.remove();
    }, 3800);

  }



  /* =========================================
     CAKE
  ========================================== */

  let candleBlown = false;

  if (blowButton) {

    blowButton.addEventListener(
      "click",
      () => {

        if (candleBlown) return;

        candleBlown = true;


        /* Flame off */

        if (candleFlame) {
          candleFlame.classList.add("off");
        }


        /* Smoke */

        createSmoke();


        /* Confetti */

        createConfetti(70);


        /* Fireworks */

        createFireworks();


        /* Message */

        setTimeout(() => {

          if (cakeMessage) {
            cakeMessage.classList.add("show");
          }

        }, 550);


        blowButton.textContent =
          "Wish Made ❤️";

        blowButton.disabled = true;

      }
    );

  }



  /* =========================================
     SMOKE
  ========================================== */

  function createSmoke() {

    const candle =
      document.querySelector(".candle");

    if (!candle) return;

    for (let i = 0; i < 8; i++) {

      const smoke =
        document.createElement("span");

      smoke.className = "smoke";

      const rect =
        candle.getBoundingClientRect();

      smoke.style.left =
        `${rect.left + 7 + Math.random() * 12}px`;

      smoke.style.top =
        `${rect.top - 10}px`;

      document.body.appendChild(
        smoke
      );

      setTimeout(() => {
        smoke.remove();
      }, 2100);

    }

  }



  /* =========================================
     FIREWORKS
  ========================================== */

  function createFireworks() {

    for (let f = 0; f < 5; f++) {

      setTimeout(() => {

        const firework =
          document.createElement("div");

        firework.className =
          "firework";

        firework.style.left =
          `${15 + Math.random() * 70}vw`;

        firework.style.top =
          `${15 + Math.random() * 40}vh`;

        document.body.appendChild(
          firework
        );


        for (let i = 0; i < 18; i++) {

          const spark =
            document.createElement("span");

          spark.className =
            "firework-spark";

          const angle =
            (Math.PI * 2 * i) / 18;

          const distance =
            55 + Math.random() * 55;

          spark.style.setProperty(
            "--fx",
            `${Math.cos(angle) * distance}px`
          );

          spark.style.setProperty(
            "--fy",
            `${Math.sin(angle) * distance}px`
          );

          firework.appendChild(
            spark
          );

        }


        setTimeout(() => {
          firework.remove();
        }, 1100);

      }, f * 260);

    }

  }



  /* =========================================
     BOW & ARROW GAME
  ========================================== */

  if (
    gameBoard &&
    gameArrow &&
    heartTarget
  ) {

    let dragging = false;

    let startX = 0;
    let startY = 0;

    let currentX = 0;
    let currentY = 0;

    let pullDistance = 0;


    /* Arrow starts pointing toward target */

    function resetArrow() {

      gameArrow.style.transform =
        "rotate(0deg)";

    }


    resetArrow();


    /* -----------------------------------------
       POINTER DOWN
    ----------------------------------------- */

    gameArrow.addEventListener(
      "pointerdown",
      (event) => {

        if (
          gameSuccess.classList.contains(
            "show"
          )
        ) {
          return;
        }


        dragging = true;

        startX = event.clientX;
        startY = event.clientY;

        currentX = startX;
        currentY = startY;

        gameArrow.setPointerCapture(
          event.pointerId
        );

        gameArrow.classList.add(
          "dragging"
        );

      }
    );


    /* -----------------------------------------
       POINTER MOVE
    ----------------------------------------- */

    gameArrow.addEventListener(
      "pointermove",
      (event) => {

        if (!dragging) return;


        currentX = event.clientX;
        currentY = event.clientY;


        /*
          Pull arrow backwards.
          User can move slightly
          up/down to change angle.
        */

        const dx =
          currentX - startX;

        const dy =
          currentY - startY;


        pullDistance =
          Math.max(
            0,
            Math.min(
              125,
              -dx
            )
          );


        let angle =
          Math.atan2(dy, 300) *
          (180 / Math.PI);


        angle =
          Math.max(
            -22,
            Math.min(
              22,
              angle
            )
          );


        gameArrow.style.transform =
          `translateX(${-pullDistance}px) rotate(${angle}deg)`;

      }
    );


    /* -----------------------------------------
       POINTER UP
    ----------------------------------------- */

    gameArrow.addEventListener(
      "pointerup",
      (event) => {

        if (!dragging) return;


        dragging = false;

        gameArrow.classList.remove(
          "dragging"
        );


        if (pullDistance >= 45) {

          shootArrow();

        } else {

          gameArrow.style.transform =
            "translateX(0) rotate(0deg)";

        }


        pullDistance = 0;

      }
    );


    /* -----------------------------------------
       SHOOT
    ----------------------------------------- */

    function shootArrow() {

      /*
        Calculate target position
        so arrow stops INSIDE heart.
      */

      const arrowRect =
        gameArrow.getBoundingClientRect();

      const targetRect =
        heartTarget.getBoundingClientRect();


      const targetCenterX =
        targetRect.left +
        targetRect.width / 1;


      const targetCenterY =
        targetRect.top +
        targetRect.height / 1;


      const arrowStartX =
        arrowRect.left;


      const arrowStartY =
        arrowRect.top +
        arrowRect.height / 1;


      const distanceX =
        targetCenterX -
        arrowStartX;


      const distanceY =
        targetCenterY -
        arrowStartY;


      const angle =
        Math.atan2(
          distanceY,
          distanceX
        ) *
        (180 / Math.PI);


      /*
        Arrow travels exactly
        to the heart and STOPS there.
      */

      const travel =
        Math.max(
          0,
          distanceX - 20
        );


      gameArrow.style.transition =
        "transform 0.75s cubic-bezier(.2,.8,.2,1)";


      gameArrow.style.transform =
        `translate(${travel}px, ${distanceY}px) rotate(${angle}deg)`;


      if (gameHint) {
        gameHint.style.opacity = "0";
      }


      setTimeout(() => {

        /*
          Arrow remains on heart.
          Heart changes to arrow-heart symbol.
        */

        gameArrow.style.zIndex = "20";


        heartTarget.classList.add(
          "hit"
        );


        createConfetti(35);


        setTimeout(() => {

          gameSuccess.classList.add(
            "show"
          );

        }, 250);

      }, 760);

    }

  }



  /* =========================================
     FINAL SECTION
  ========================================== */

  if (finale) {

    const finalObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (
              entry.isIntersecting
            ) {

              finale.classList.add(
                "active"
              );

            }

          });

        },
        {
          threshold: 0.25
        }
      );


    finalObserver.observe(finale);

  }



  /* =========================================
     CONTINUOUS ROMANTIC HEARTS
  ========================================== */

  function createBackgroundHeart() {

    const heart =
      document.createElement("span");

    heart.textContent =
      Math.random() > 0.5
        ? "♡"
        : "♥";

    heart.style.position =
      "fixed";

    heart.style.left =
      `${Math.random() * 100}vw`;

    heart.style.bottom =
      "-30px";

    heart.style.zIndex =
      "1";

    heart.style.pointerEvents =
      "none";

    heart.style.color =
      "rgba(232,76,115,0.13)";

    heart.style.fontSize =
      `${14 + Math.random() * 25}px`;

    document.body.appendChild(
      heart
    );


    const duration =
      6000 + Math.random() * 4000;


    heart.animate(
      [
        {
          transform:
            "translateY(0) rotate(0deg)",
          opacity: 0
        },
        {
          transform:
            "translateY(-20vh) rotate(10deg)",
          opacity: 0.8
        },
        {
          transform:
            "translateY(-110vh) rotate(-10deg)",
          opacity: 0
        }
      ],
      {
        duration: duration,
        easing: "linear",
        fill: "forwards"
      }
    );


    setTimeout(() => {
      heart.remove();
    }, duration + 200);

  }


  /* Light effect only */

  setInterval(
    createBackgroundHeart,
    1200
  );

});
