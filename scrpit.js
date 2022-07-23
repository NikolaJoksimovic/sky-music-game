import Game from './game.js';

window.addEventListener('load', function(){


    const canvasEl = this.document.getElementById('canvas-main');
    const ctx = canvasEl.getContext('2d');
    canvasEl.width = 1280; 
    canvasEl.height = 720;

    let game = new Game(canvasEl.width, canvasEl.height);
    let menu_btn = { 
        x: game.menu.x,
        y: game.menu.y,
        width: game.menu.width,
        height: game.menu.height
    }
    canvasEl.addEventListener('click', e=>{
        let mousePos = getMousePos(canvasEl, e);
        if(isInside(mousePos, menu_btn)){
            alert('clicked inside rect');
        } 
    });
    
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
    
    //functions for clicking inside canvas..
    function getMousePos(canvas, e) {
        let rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }
    function isInside(pos, rect){
        return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
    }
    // ////////////////////////////////////
}); 