export default class InputHanderl{
    constructor(game){
        this.game = game;
        this.keys = [];
        
        window.addEventListener('keydown', e =>{
            if((e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowRight' ||
                e.key === 'ArrowLeft' ||
                e.key === ' ') &&
                this.keys.indexOf(e.key) === -1){
                    this.keys.push(e.key);
                }
                // console.log('space');
        });
        window.addEventListener('keyup', e =>{
            if((e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowRight' ||
                e.key === 'ArrowLeft' ||
                e.key === ' ')){
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
        });
    }
}