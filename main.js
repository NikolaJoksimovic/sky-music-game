import Layer from './layer.js';
import Npc from './npc.js';

window.addEventListener('load', function(){
    const canvasEl = this.document.getElementById('canvas1');
    const ctx = canvasEl.getContext('2d');
    canvasEl.width = 1024;
    canvasEl.height = 800;


    // PLAYER ANIMATIONS
    const playerImageEl = this.document.getElementById("player-img");
    const spriteWidth = 250;
    const spriteHeight = 200;
    
    const animationSelectEl = this.document.getElementById("animations-select");
    let playerState = 'run';
    animationSelectEl.addEventListener("change", (e)=>{
        playerState = e.target.value;
    });

    const animationStates = [
        {
            name: 'attack',
            frames: 10
        },
        {
            name: 'climb',
            frames: 10
        },
        {
            name: 'dead',
            frames: 10
        },
        {
            name: 'glide',
            frames: 10
        },
        {
            name: 'idle',
            frames: 10
        },
        {
            name: 'jump',
            frames: 10
        },
        {
            name: 'jumpAttack',
            frames: 10
        },
        {
            name: 'jumpThrow',
            frames: 10
        },
        {
            name: 'run',
            frames: 10
        },
        {
            name: 'slide',
            frames: 10
        },
        {
            name: 'throw',
            frames: 10
        },
    ]
    
    let spriteAnimations = [];
    animationStates.forEach((state, index)=>{
        let frames = {
            loc: []
        }
        for(let j=0; j<state.frames; j++){
            let positionX = j*spriteWidth;
            let positionY = index*spriteHeight ;
            frames.loc.push({x: positionX, y: positionY});
        }
        spriteAnimations[state.name] = frames;
    });

    
    // Parallax BACKGROUND

    const gameSpeedSliderrEl = this.document.querySelector(".slider");
    const sliderValueTextEl = this.document.getElementById("sliderValueText");
    sliderValueTextEl.innerHTML = `Game speed: ${1}`;
    gameSpeedSliderrEl.addEventListener("change", function(e){
        sliderValueTextEl.innerHTML = `Game speed: ${e.target.value}`;
    });

    const backgorundLayer1 = new Image();
    backgorundLayer1.src = "./assets/parallaxBackground/layer-1.png";
    const backgorundLayer2 = new Image();
    backgorundLayer2.src = "./assets/parallaxBackground/layer-2.png";
    const backgorundLayer3 = new Image();
    backgorundLayer3.src = "./assets/parallaxBackground/layer-3.png";
    const backgorundLayer4 = new Image();
    backgorundLayer4.src = "./assets/parallaxBackground/layer-4.png";
    const backgorundLayer5 = new Image();
    backgorundLayer5.src = "./assets/parallaxBackground/layer-5.png";
    
    let gameSpeed = 5;
    gameSpeedSliderrEl.addEventListener("change", function(e){
        gameSpeed = e.target.value;
        sliderValueTextEl.innerHTML = `Game speed: ${gameSpeed}`;
    });

    const layer1 = new Layer(backgorundLayer1, 1, gameSpeed, ctx);
    const layer2 = new Layer(backgorundLayer2, 0.1, gameSpeed, ctx);
    const layer3 = new Layer(backgorundLayer3, 0.2, gameSpeed, ctx);
    const layer4 = new Layer(backgorundLayer4, 0.7, gameSpeed, ctx);
    const layer5 = new Layer(backgorundLayer5, 1, gameSpeed, ctx);

    let layers = [layer1, layer2, layer3, layer4, layer5
    ];

    
    // NPCs
    let numOfNpcs = 20;
    let npcArray = [];
    for(let i=0; i<numOfNpcs; i++){
        let npc = new Npc(canvasEl.width, canvasEl.height);
        npcArray.push(npc);
    }


    // "RENDERING"
    let gameFrame = 0;
    const staggerFrames = 5;

    function animate(){
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

        let position = Math.floor(gameFrame/staggerFrames)%spriteAnimations[playerState].loc.length;
        let frameX = spriteWidth*position;
        let frameY = spriteAnimations[playerState].loc[position].y;

        //background
        layers.forEach((layer)=>{
            layer.update(gameSpeed,-gameFrame);
            layer.draw();
        });
        //player
        ctx.drawImage(playerImageEl, frameX, frameY, spriteWidth, spriteHeight, 0, 450, spriteWidth, spriteHeight);

        npcArray.forEach((npc)=>{
            npc.update(gameFrame, staggerFrames
                );
            npc.draw(ctx);
        });
        
        gameFrame++;
        requestAnimationFrame(animate);
    }
    
    animate();
});

