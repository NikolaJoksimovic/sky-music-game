import InputHanderl from './input_handler.js';
import Player from './player.js';
import Enemy from './enemy.js'
import Background from './background.js'
import Sound from './sound.js';
import EnemyBoss from './enemyBoss.js';
import Menu from './menu.js';

export default class Game{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.gameObjects = [];
        this.enemies = [];
        this.score = 0;

        // misc
        this.gamePaused = true;
        this.gameOver = false;
        this.enemyCollisionEnabled = true;
        this.enableHitboxes = false;
        this.godModeOn = false;

        // AUDIO
        this.ingameAudio = this.addSounds();
        // this.ingameAudio.push(
        //     new Sound(this, './assets/audio/final_koraci04.wav', 'IDLE')
        // );
        // this.ingameAudio.push(new Sound(this, './assets/audio/menu-theme-song.mp3', 'MENU'));
        // CLASSES
        this.input = new InputHanderl(this);
        this.player = new Player(this);
        this.background = new Background(this);
        this.enemyBoss = new EnemyBoss(this);
        // this.menu = new Menu(this);
        
        
        // enemies generator
        this.enemyInterval = 500;
        this.enemyTimer = 0;
        this.randomEnemyInterval = Math.random()*5000;
        this.enemyBossLive = false;
        
        // game objects
        this.gameObjects.push(this.background);
        this.gameObjects.push(this.player);
    }

    update(deltaTime){
        if(this.enemyTimer > this.enemyInterval + this.randomEnemyInterval){
            let enemy = new Enemy(this)
            this.enemies.push(enemy);
            this.gameObjects.push(enemy);
            this.enemyTimer = 0;
            this.randomEnemyInterval = Math.random()*5000;
        }else{
            this.enemyTimer += deltaTime;
        }
        if(this.score === 10 && !this.enemyBossLive){
            this.enemies.push(this.enemyBoss);
            this.gameObjects.push(this.enemyBoss);
            this.enemyBossLive = true;
        }
        this.enemies = this.enemies.filter(obj => !obj.markedForDeletion && !obj.dead);
        this.gameObjects = this.gameObjects.filter(obj => !obj.markedForDeletion && !obj.dead);
        if(this.input.keys.includes('Escape') && !this.gamePaused){
            this.gameOver = true;
        }
        this.gameObjects.forEach(obj => {
            obj.update(this.input.keys, deltaTime, this.enemies);
        });
    }

    draw(ctx){
        this.gameObjects.forEach(obj => {
            obj.draw(ctx);
        })
        this.displayTextStatus(ctx);
    }

    displayTextStatus(ctx){
        let maxTextWidht = 400;
        ctx.font = '40px Halvetica';
        ctx.fillStyle = 'black';
        ctx.fillText('Kills: ' + this.score + '/10', 20, 50);
        ctx.fillStyle = 'hsl(0, 84%, 17%)';
        ctx.fillText('Kills: ' + this.score + '/10', 22, 52);
    }
    addSounds(){
        let soundArray = [];
        const soundSteps = new Sound(this, './assets/audio/final_koraci04.wav', 'IDLE');
        soundArray.push(soundSteps);
        const OST_theme = new Sound(this, "./assets/audio/OST_06.wav");
        OST_theme.audio.volume = 0.3;
        soundArray.push(OST_theme);
        
        
        return soundArray;
    }
}