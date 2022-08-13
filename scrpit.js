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
    enemyCollisionBtnEl = this.document.querySelector('#options-enemy-collision'),
    hitboxesEl = this.document.querySelector('#options-hitboxes'),
    godmodeEl = this.document.querySelector('#options-godmode');
    
    let lastTime = 0;
    let game = new Game();
    let enableCollision = true;
    let enableHitboxes = false;
    let enableGodMode = false;

    // AUIDO /////////////////////////////////////////////////////////////
    let audio_koraci04 = new Audio();
    audio_koraci04.src = './assets/audio/final_koraci04.wav';
    audio_koraci04.volume = 1;
    audio_koraci04.playbackRate = 1.1;
    audio_koraci04.addEventListener('ended', e=>{
        if(!game.gamePaused && !game.gameOver){
            audio_koraci04.play();
        }
    })
    
    // AUDIO //////////////////////////////////////////////////////////////
    canvasEl.width = 1280; 
    canvasEl.height = 720;
    
    optionsBtnEl.addEventListener('click', e=>{
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
        menuEl.classList.remove('menu-hide');
        if(optionsContainerEl.classList.contains('show-options-container')){
            optionsContainerEl.classList.remove('show-options-container');
        }else{
            controlsContainerEl.classList.remove('show-controls-container');
        }
        backBtnEl.classList.remove('back-btn-show');
    });
    // collsion buton
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
    // hitboxes buton
    hitboxesEl.addEventListener('click', e=>{
        if(e.target.value === 'on'){
            hitboxesEl.innerHTML = `hitboxes: off`
            e.target.value = 'off';
            enableGodMode = false;
        }else{
            hitboxesEl.innerHTML = `hitboxes: on`
            e.target.value = 'on';
            enableGodMode = true;
        }
    });
    
    godmodeEl.addEventListener('click', e=>{
        if(e.target.value === 'on'){
            godmodeEl.innerHTML = `god mode: off`
            e.target.value = 'off';
            enableHitboxes = false;
        }else{
            godmodeEl.innerHTML = `god mode: on`
            e.target.value = 'on';
            enableHitboxes = true;
        }
    });

    //  PLAY BUTTON ***********************************
    // ************************************************

    playBtnEl.addEventListener('click', e=>{
        mainContainerEl.classList.add('hide-main-container');
        game = new Game(canvasEl.width, canvasEl.height);
        game.gamePaused = false;
        game.gameOver = false;
        game.enemyCollisionEnabled = enableCollision;
        game.enableHitboxes = enableHitboxes;
        game.godModeOn = enableGodMode;
        game.ingameAudio.forEach(element=>{
            element.value = true;
        });
        // let menu_btn = { 
        //     x: game.menu.x,
        //     y: game.menu.y,
        //     width: game.menu.width,
        //     height: game.menu.height
        // }
        // canvasEl.addEventListener('mousemove', e=>{
        //     let mousePos = getMousePos(canvasEl, e);
        //     if(isInside(mousePos, menu_btn)){
        //         canvasEl.style.cursor = 'pointer';
        //     }else{
        //         canvasEl.style.cursor = 'default';   
        //     }
        // })
        // canvasEl.addEventListener('click', e=>{
        //     let mousePos = getMousePos(canvasEl, e);
        //     if(isInside(mousePos, menu_btn)){
        //         mainContainerEl.classList.remove('hide-main-container');
        //         game.gamePaused = true;
        //     }
        // });

        this.requestAnimationFrame(animate);
    });

    // ANIMATE FUNCTION
    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
        
        game.update(deltaTime);
        game.draw(ctx);
        
        if(!game.gameOver && !game.gamePaused){
            requestAnimationFrame(animate);
        }else if(game.gameOver){
            mainContainerEl.classList.toggle('hide-main-container');
        }

        // AUDIO
        if(game.gameOver || game.gamePaused){
            game.ingameAudio.forEach(element=>{
                element.value = false;
            });
        }
        game.ingameAudio.forEach(element=>{
            if(element.value === true){
                element.loop();
            }
            else{
                element.stop();
            }
        });
    }
    
    //functions for clicking inside canvas..
    // function getMousePos(canvas, e) {
    //     let rect = canvas.getBoundingClientRect();
    //     return {
    //         x: e.clientX - rect.left,
    //         y: e.clientY - rect.top
    //     };
    // }
    // function isInside(pos, rect){
    //     return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
    // }
    // ////////////////////////////////////
}); 