export default class InputHanderl{
    constructor(game){
        this.game = game;
        this.keys = [];
        
        window.addEventListener('keydown', e =>{
            // switch(e.key){
            //     case 'ArrowRight':
            //         this.lastKey = 'ArrowRightPressed';
            //         break;
            //     case 'ArrowLeft':
            //         this.lastKey = 'ArrowLeftPressed';
            //         break;
            //     case 'ArrowUp':
            //         this.lastKey = 'ArrowUpPressed';
            //         break;
            //     case 'ArrowDown':
            //         this.lastKey = 'ArrowDownPressed';
            //         break;
            //     }
            // });
            if((e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowRight' ||
                e.key === 'ArrowLeft' ||
                e.key === 'Enter') &&
                this.keys.indexOf(e.key) === -1){
                    this.keys.push(e.key);
                }
                console.log(e.key, this.keys);
        });
        window.addEventListener('keyup', e =>{
            // switch(e.key){
            //     case 'ArrowRight':
            //         this.lastKey = 'ArrowRightReleased';
            //         break;
            //     case 'ArrowLeft':
            //         this.lastKey = 'ArrowLeftReleased';
            //         break;
            //     case 'ArrowUp':
            //         this.lastKey = 'ArrowUpReleased';
            //         break;
            //     case 'ArrowDown':
            //         this.lastKey = 'ArrowDownReleased';
            //         break;
                    
            //     }
            if((e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowRight' ||
                e.key === 'ArrowLeft' ||
                e.key === 'Enter')){
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
                console.log(e.key, this.keys);
        });
    }
}