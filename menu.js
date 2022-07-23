export default class Menu{
    constructor(game){
        this.game = game;
        this.x = this.game.width-100;
        this.y = 15;
        this.width = 100;
        this.height = 50;

    }
    update(){

    }
    draw(ctx){
        ctx.globalAlpha = 0;
        ctx.fillStyle = 'white';
        ctx.fillRect(this.game.width-100, 15, 100,50);
        ctx.globalAlpha = 1;
        ctx.font = '40px Halvetica';
        ctx.fillStyle = 'black';
        ctx.fillText('Menu', this.game.width-100, 50);
        ctx.fillStyle = '#880808';
        ctx.fillText('Menu', this.game.width-100, 52);
    }
}