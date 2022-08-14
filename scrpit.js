import Game from './game.js';
import Sound from './sound.js';

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
    const soundMenuTheme = new Sound(this, './assets/audio/menu-theme-song.wav', 'MENU');
    soundMenuTheme.audio.volume = 1;
    soundMenuTheme.loop();
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
            enableHitboxes = false;
        }else{
            hitboxesEl.innerHTML = `hitboxes: on`
            e.target.value = 'on';
            enableHitboxes = true;
        }
    });
    // godmode button
    godmodeEl.addEventListener('click', e=>{
        if(e.target.value === 'on'){
            godmodeEl.innerHTML = `god mode: off`
            e.target.value = 'off';
            enableGodMode = false;
        }else{
            godmodeEl.innerHTML = `god mode: on`
            e.target.value = 'on';
            enableGodMode = true;
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
            soundMenuTheme.stop();
        }else if(game.gameOver){
            mainContainerEl.classList.toggle('hide-main-container');
            soundMenuTheme.loop();
        }

        // AUDIO
        if(game.gameOver || game.gamePaused){
            game.ingameAudio.forEach(element=>{
                if(!(element.soundState === 'MENU')){
                    element.value = false;
                }
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