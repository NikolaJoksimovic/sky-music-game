import Game from "./game.js";
import Sound from "./sound.js";
import { soundStates } from "./states.js";

window.addEventListener("load", function () {
  // preloader
  const preloader = this.document.getElementById("preloader");
  preloader.style.display = "none";
  // // // // // // // // // // // //

  const canvasEl = this.document.getElementById("canvas-main"),
    ctx = canvasEl.getContext("2d"),
    playBtnEl = this.document.querySelector(".play-btn"),
    mainContainerEl = this.document.querySelector(".main-container"),
    optionsBtnEl = this.document.querySelector(".options-btn"),
    optionsContainerEl = this.document.querySelector(".options-container"),
    controlsBtnEl = this.document.querySelector(".controls-btn"),
    controlsContainerEl = this.document.querySelector(".controls-container"),
    backBtnEl = this.document.querySelector(".back-btn"),
    menuEl = this.document.querySelector(".menu"),
    enemyCollisionBtnEl = this.document.querySelector(
      "#options-enemy-collision"
    ),
    hitboxesEl = this.document.querySelector("#options-hitboxes"),
    godmodeEl = this.document.querySelector("#options-godmode"),
    soundOnBtnEl = this.document.querySelector("#mute-btn"),
    sliderContainerEl = this.document.querySelector(".slider-container"),
    letibudaletiDivEl = this.document.getElementById("letibudaleti"),
    letibudaletiBtnEl = this.document.querySelector(".letibudaleti-btn");

  let lastTime = 0;
  let enableCollision = true;
  let enableHitboxes = false;
  let enableGodMode = false;
  let game = new Game();

  // INGAME AUDIO VOLUME SLIDERS
  const volumeSliderOSTEl = this.document.getElementById("volume-slider-ost");
  const volumeSliderStepsEl = this.document.getElementById(
    "volume-slider-steps"
  );
  const volumeSliderAttackEl = this.document.getElementById(
    "volume-slider-attack"
  );
  [volumeSliderOSTEl, volumeSliderStepsEl, volumeSliderAttackEl].forEach(
    (slider) => {
      slider.addEventListener("keydown", (e) => {
        e.preventDefault();
        return false;
      });
    }
  );
  volumeSliderOSTEl.addEventListener("input", (e) => {
    game.ingameAudio[soundStates.OST].audio.volume =
      (1 * volumeSliderOSTEl.value) / 100;
  });
  volumeSliderStepsEl.addEventListener("input", (e) => {
    game.ingameAudio[soundStates.IDLE].audio.volume =
      (1 * volumeSliderStepsEl.value) / 100;
  });
  volumeSliderAttackEl.addEventListener("input", (e) => {
    game.ingameAudio[soundStates.ATTACKING].audio.volume =
      (1 * volumeSliderAttackEl.value) / 100;
    game.ingameAudio[soundStates.SLASHING].audio.volume =
      (1 * volumeSliderAttackEl.value) / 100;
  });
  // END OF INGAME AUDIO VOLUME SLIDERS

  canvasEl.width = 1280;
  canvasEl.height = 720;

  // leti buda leti button
  const letibudaletiIntro = new Sound(
    this,
    "./assets/audio/letibudaleti_intro.wav"
  );
  letibudaletiIntro.audio.volume = 0.35;
  letibudaletiBtnEl.addEventListener("click", (e) => {
    letibudaletiBtnEl.style.display = "none";
    preloader.classList.add("preloader-show");
    preloader.classList.add("preloader-fadeIn");
    letibudaletiIntro.play();
    this.setTimeout(() => {
      letibudaletiDivEl.style.display = "none";
      preloader.classList.remove("preloader-show");
      console.log("hey");
    }, 3000);
  });

  // options button
  optionsBtnEl.addEventListener("click", (e) => {
    menuEl.classList.add("menu-hide");
    optionsContainerEl.classList.add("show-options-container");
    backBtnEl.classList.add("back-btn-show");
  });
  // controls button
  controlsBtnEl.addEventListener("click", (e) => {
    menuEl.classList.add("menu-hide");
    controlsContainerEl.classList.add("show-controls-container");
    backBtnEl.classList.add("back-btn-show");
  });
  // go back button
  backBtnEl.addEventListener("click", (e) => {
    menuEl.classList.remove("menu-hide");
    if (optionsContainerEl.classList.contains("show-options-container")) {
      optionsContainerEl.classList.remove("show-options-container");
    } else {
      controlsContainerEl.classList.remove("show-controls-container");
    }
    backBtnEl.classList.remove("back-btn-show");
  });
  // collsion button
  enemyCollisionBtnEl.addEventListener("click", (e) => {
    if (e.target.value === "on") {
      enemyCollisionBtnEl.innerHTML = `enemy collision: off`;
      e.target.value = "off";
      enableCollision = false;
    } else {
      enemyCollisionBtnEl.innerHTML = `enemy collision: on`;
      e.target.value = "on";
      enableCollision = true;
    }
  });
  // hitboxes button
  hitboxesEl.addEventListener("click", (e) => {
    if (e.target.value === "on") {
      hitboxesEl.innerHTML = `hitboxes: off`;
      e.target.value = "off";
      enableHitboxes = false;
    } else {
      hitboxesEl.innerHTML = `hitboxes: on`;
      e.target.value = "on";
      enableHitboxes = true;
    }
  });
  // godmode button
  godmodeEl.addEventListener("click", (e) => {
    if (e.target.value === "on") {
      godmodeEl.innerHTML = `god mode: off`;
      e.target.value = "off";
      enableGodMode = false;
    } else {
      godmodeEl.innerHTML = `god mode: on`;
      e.target.value = "on";
      enableGodMode = true;
    }
  });

  //  PLAY BUTTON ***********************************
  // ************************************************

  playBtnEl.addEventListener("click", (e) => {
    mainContainerEl.classList.add("hide-main-container");
    game = new Game(canvasEl.width, canvasEl.height);

    // set the volume sliders
    let slidersOffsetTop = (this.screen.height - canvasEl.offsetHeight) / 2;
    let slidersOffsetRight = (this.screen.width - canvasEl.offsetWidth) / 2;
    console.log(this.screen.height);
    console.log(canvasEl.offsetHeight);
    console.log(slidersOffsetTop, slidersOffsetRight);
    sliderContainerEl.style.top = `${slidersOffsetTop}px`;
    sliderContainerEl.style.right = `${slidersOffsetRight}px`;
    sliderContainerEl.classList.remove("slider-container-hide");
    // end of setting volume sliders
    game.gamePaused = false;
    game.gameOver = false;
    game.enemyCollisionEnabled = enableCollision;
    game.enableHitboxes = enableHitboxes;
    game.godModeOn = enableGodMode;
    game.ingameAudio[soundStates.OST].audio.volume =
      (1 * volumeSliderOSTEl.value) / 100;
    game.ingameAudio[soundStates.IDLE].audio.volume =
      (1 * volumeSliderStepsEl.value) / 100;
    game.ingameAudio[soundStates.ATTACKING].audio.volume =
      (1 * volumeSliderAttackEl.value) / 100;
    game.ingameAudio[soundStates.SLASHING].audio.volume =
      (1 * volumeSliderAttackEl.value) / 100;
    game.ingameAudio.forEach((element) => {
      if (element.soundState === "IDLE" || element.soundState === "OST") {
        element.value = true;
      }
    });

    this.requestAnimationFrame(animate);
  });

  // ANIMATE FUNCTION
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    game.update(deltaTime);
    game.draw(ctx);

    if (!game.gameOver && !game.gamePaused) {
      requestAnimationFrame(animate);
      soundMenuTheme.stop();
    } else if (game.gameOver) {
      sliderContainerEl.classList.add("slider-container-hide");
      mainContainerEl.classList.toggle("hide-main-container");
      if (soundOnBtnEl.classList.contains("mute-btn-play")) {
        soundMenuTheme.loop();
      }
    }

    // AUDIO
    if (game.gameOver || game.gamePaused) {
      game.ingameAudio.forEach((element) => {
        element.value = false;
      });
    }
    game.ingameAudio.forEach((element) => {
      if (element.soundState === "IDLE" || element.soundState === "OST") {
        if (element.value === true) {
          element.loop();
        } else {
          element.stop();
        }
      }
    });
  }

  // main menu theme AUDIO
  const soundMenuTheme = new Sound(
    this,
    "./assets/audio/main_menu_tematska_pesma_01.wav",
    "MENU"
  );
  soundMenuTheme.audio.volume = 0.4;
  soundOnBtnEl.addEventListener("click", () => {
    if (soundOnBtnEl.classList.contains("mute-btn-play")) {
      soundOnBtnEl.classList.remove("mute-btn-play");
      soundMenuTheme.stop();
    } else {
      soundMenuTheme.loop();
      soundOnBtnEl.classList.add("mute-btn-play");
    }
  });
});
