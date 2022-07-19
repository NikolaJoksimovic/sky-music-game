window.addEventListener('load', function(){
    const canvasEl = this.document.getElementById('canvas1');
    const ctx = canvasEl.getContext('2d');
    canvasEl.width = 600;
    canvasEl.height = 600;


    const playerImageEl = this.document.getElementById("player-img");
    const spriteWidth = 250;
    const spriteHeight = 200;
    
    const animationSelectEl = this.document.getElementById("animations-select");
    let playerState = 'attack';
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

    // console.log(spriteAnimations);

    
    let gameFrame = 0;
    const staggerFrames = 5;

    function animate(){
        ctx.clearRect(0,0,canvasEl.width, canvasEl.height);

        let position = Math.floor(gameFrame/staggerFrames)%spriteAnimations[playerState].loc.length;
        let frameX = spriteWidth*position;//position je vec od 0-6 pa je isto da li samo mnozimo sa position ili trazimo loc[postition].x..
        let frameY = spriteAnimations[playerState].loc[position].y;

        ctx.drawImage(playerImageEl, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)
        
        gameFrame++;
        requestAnimationFrame(animate);
    }
    
    animate();
});