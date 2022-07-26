export default class Sound{
    constructor(game, file_path){
        this.game = game;
        this.file_path = file_path;
        this.audio = new Audio(file_path);
        this.audio.playbackRate = 1;
    }

    play(){
        this.audio.play();
    }
    stop(){
        this.audio.pause();
        this.audio.currentTime = 0;
    }
    loop(){
        this.audio.play();
        this.audio.addEventListener('ended', e=>{
            this.audio.currentTime = 0;
            this.audio.play();
        })
    }
}