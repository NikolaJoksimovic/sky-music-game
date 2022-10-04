export default class Sound {
  constructor(game, file_path, soundState) {
    this.game = game;
    this.file_path = file_path;
    this.soundState = soundState;
    this.audio = new Audio(file_path);
    this.value = true;
    this.audio.playbackRate = 1;
  }

  play() {
    if (this.value) {
      if (!this.game.enemyBossLive) {
        this.stop();
        this.audio.play();
      } else {
        this.audio.play();
      }
    }
  }
  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
  loop() {
    this.audio.play();
    this.audio.addEventListener("ended", (e) => {
      this.audio.currentTime = 0;
      this.audio.play();
    });
  }
}
