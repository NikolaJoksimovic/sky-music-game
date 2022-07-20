import Game from './game.js';

window.addEventListener('load', function(){


    const canvasEl = this.document.getElementById('canvas-main');
    const ctx = canvasEl.getContext('2d');
    canvasEl.width = 1280; 
    canvasEl.height = 720;

    let game = new Game(canvasEl.width, canvasEl.height);
    animate();

    function handleEnemies(){

    }
    function displayStatusText(){

    }
    function animate(){
        
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
        game.update();
        game.draw(ctx);

        requestAnimationFrame(animate);
    }
});