import InputHanderl from './input_handler.js';
import Player from './player.js';
import Enemy from './enemy.js'
import Background from './background.js'

export default class Game{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.gameObjects = [];

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
            this.gameObjects.push(new Enemy(this));
            this.enemyTimer = 0;
            this.randomEnemyInterval = Math.random()*5000;
        }else{
            this.enemyTimer += deltaTime;
        }
        this.gameObjects.forEach(obj => {
            obj.update(this.input, deltaTime);
        });
    }

    draw(ctx){
        this.gameObjects.forEach(obj => {
            obj.draw(ctx);
        })
    }
}