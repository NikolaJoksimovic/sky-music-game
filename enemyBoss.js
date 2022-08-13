export default class EnemyBoss{

    constructor(game){
        this.game = game;

        // size and positioning
        this.width = 380;
        this.height = 565;
        this.image = document.getElementById('enemy-boss-img');
        this.frameX = 0;
        this.frameY = 0;
        this.x = game.width;
        this.y = game.height/8;
        this.mouthPos = {
            x: this.x + this.width/2,
            y: this.y + this.height/2
        }

        // other stuff
        this.dead = false;
        this.isBoss = true;
        this.maxHealt = 150;
        this.health = this.maxHealt;


        // movement
        this.angleSpeed = 0.01;
        this.angle = 0;
        this.entrySpeed = 1;
    }

    update(input, deltaTime, enemies){
        
        this.x -= this.entrySpeed;
        this.mouthPos.x = this.x;
        if(this.x < this.game.width - this.width){
            this.entrySpeed = 0;
        }

        this.y += Math.cos(this.angle);
        this.angle += this.angleSpeed;
    }
    draw(ctx){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

        this.collisionCircleX = this.x+this.width/2 - 20;
        this.collisionCircleY = this.y+this.height/3-10;
        this.collisionCircleR = this.width/2.2;
        // hitboxes
        if(this.game.enableHitboxes){
            ctx.strokeStyle = 'white';
            ctx.beginPath();
            ctx.arc(this.collisionCircleX, this.collisionCircleY, this.collisionCircleR, 0, 2*Math.PI);
            ctx.stroke();
        }
        // health status
        this.displayTextStatus(ctx);
    }
    displayTextStatus(ctx){
        ctx.strokeStyle = 'white';
        ctx.strokeRect(this.x + this.width/5, this.y + this.height/1.2, 200, 20);
        ctx.fillStyle = 'hsl(0, 84%, 17%)';
        ctx.fillRect(this.x + this.width/5 + 1, this.y + 1 + this.height/1.2, Math.floor(198*this.health/this.maxHealt), 18)
    }
}