import Game from './game.js';

window.addEventListener('load', function(){


    const canvasEl = this.document.getElementById('canvas-main');
    const ctx = canvasEl.getContext('2d');
    canvasEl.width = 1280; 
    canvasEl.height = 720;

    let game = new Game(canvasEl.width, canvasEl.height);
    let lastTime = 0;
    let startGame = true;
    
    if(startGame){
        animate(0);
    }
    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
        
        game.update(deltaTime);
        game.draw(ctx);

        if(!game.player.gameOver){
            requestAnimationFrame(animate);
        }
    }
    
}); 