import InputHanderl from './input_handler.js';
import Player from './player.js';
import Enemy from './enemy.js'
import Background from './background.js'

export default class Game{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.gameObjects = [];
        this.enemies = [];
        this.score = 0;

        this.input = new InputHanderl(this);
        this.player = new Player(this);
        this.background = new Background(this);
        
        
        this.enemyInterval = 500;
        this.enemyTimer = 0;
        this.randomEnemyInterval = Math.random()*5000;
        
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
        this.enemies = this.enemies.filter(obj => !obj.markedForDeletion && !obj.dead);
        this.gameObjects = this.gameObjects.filter(obj => !obj.markedForDeletion && !obj.dead);
        
        this.gameObjects.forEach(obj => {
            obj.update(this.input.lastKey, deltaTime, this.enemies);
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
        ctx.fillText('Kills: ' + this.score, 20, 50);
        ctx.fillStyle = '#880808';
        ctx.fillText('Kills: ' + this.score, 22, 52);
        if(this.player.gameOver){
            ctx.font = '70px Halvetica';
            ctx.textAligh = 'center';
            ctx.fillStyle = 'black';
            ctx.fillText('GAME OVER', this.width/2 - maxTextWidht/2, this.height/2, maxTextWidht);
            ctx.textAligh = 'center';
            ctx.fillStyle = '#880808';
            ctx.fillText('GAME OVER', this.width/2 + 2 -maxTextWidht/2, this.height/2 + 2, maxTextWidht);
        }
    }
}