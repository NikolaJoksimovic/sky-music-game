export default class InputHanderl{
    constructor(game){
        this.game = game;
        this.keys = [];
        
        window.addEventListener('keydown', e =>{
            if((e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowRight' ||
                e.key === 'ArrowLeft' ||
                e.key === ' ' ||
                e.key === 'Escape') &&
                this.keys.indexOf(e.key) === -1){
                    this.keys.push(e.key);
                }
        });
        window.addEventListener('keyup', e =>{
            if((e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowRight' ||
                e.key === 'ArrowLeft' ||
                e.key === ' ' ||
                e.key === 'Escape')){
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
        });
    }
}