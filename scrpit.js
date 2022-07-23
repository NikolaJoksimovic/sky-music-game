import Game from './game.js';

window.addEventListener('load', function(){


    const canvasEl = this.document.getElementById('canvas-main'),
    ctx = canvasEl.getContext('2d'),
    playBtnEl = this.document.querySelector('.play-btn'),
    mainContainerEl = this.document.querySelector('.main-container'),
    optionsBtnEl = this.document.querySelector('.options-btn'),
    optionsContainerEl = this.document.querySelector('.options-container'),
    controlsBtnEl = this.document.querySelector('.controls-btn'),
    controlsContainerEl = this.document.querySelector('.controls-container'),
    backBtnEl = this.document.querySelector('.back-btn'),
    menuEl = this.document.querySelector('.menu'),
    enemyCollisionBtnEl = this.document.querySelector('#options-enemy-collision');
    
    let lastTime = 0;
    let gamePaused = true;
    let game = new Game();
    let enableCollision = true;

    // /////////////////////////////////////////////////////////////


    // //////////////////////////////////////////////////////////////
    canvasEl.width = 1280; 
    canvasEl.height = 720;
    
    optionsBtnEl.addEventListener('click', e=>{
        // console.log("hey")
        menuEl.classList.add('menu-hide');
        optionsContainerEl.classList.add('show-options-container');
        backBtnEl.classList.add('back-btn-show');
    });
    controlsBtnEl.addEventListener('click', e=>{
        menuEl.classList.add('menu-hide');
        controlsContainerEl.classList.add('show-controls-container');
        backBtnEl.classList.add('back-btn-show');
    });
    backBtnEl.addEventListener('click', e=>{
        // console.log("cllick")
        menuEl.classList.remove('menu-hide');
        if(optionsContainerEl.classList.contains('show-options-container')){
            optionsContainerEl.classList.remove('show-options-container');
        }else{
            controlsContainerEl.classList.remove('show-controls-container');
        }
        backBtnEl.classList.remove('back-btn-show');
    });
    

        enemyCollisionBtnEl.addEventListener('click', e=>{
            if(e.target.value === 'on'){
                enemyCollisionBtnEl.innerHTML = `enemy collision: off`
                e.target.value = 'off';
                enableCollision = false;
            }else{
                enemyCollisionBtnEl.innerHTML = `enemy collision: on`
                e.target.value = 'on';
                enableCollision = true;
            }
        });
    playBtnEl.addEventListener('click', e=>{
        gamePaused = false;
        mainContainerEl.classList.add('hide-main-container');
        game = new Game(canvasEl.width, canvasEl.height);
        game.player.gameOver = false;
        game.player.enemyCollisionEnabled = enableCollision;
        let menu_btn = { 
            x: game.menu.x,
            y: game.menu.y,
            width: game.menu.width,
            height: game.menu.height
        }

        canvasEl.addEventListener('click', e=>{
        let mousePos = getMousePos(canvasEl, e);
        if(isInside(mousePos, menu_btn)){
            mainContainerEl.classList.remove('hide-main-container');
            gamePaused = true;
        } 
        });

        animate(0);
    });

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
            
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
            
        game.update(deltaTime);
        game.draw(ctx);

        if(!game.player.gameOver && !gamePaused){
            requestAnimationFrame(animate);
        }else if(game.player.gameOver){
            mainContainerEl.classList.toggle('hide-main-container');
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