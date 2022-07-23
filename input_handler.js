export default class InputHanderl{
    constructor(game){
        this.game = game;

        this.lastKey = '';
        
        window.addEventListener('keydown', e =>{
            switch(e.key){
                case 'ArrowRight':
                    this.lastKey = 'ArrowRightPressed'
                    break;
                case 'ArrowLeft':
                    this.lastKey = 'ArrowLeftPressed'
                    break;
                case 'ArrowUp':
                    this.lastKey = 'ArrowUpPressed'
                    break;
                case 'ArrowDown':
                    this.lastKey = 'ArrowDownPressed'
                    break;
                }
            console.log(this.lastKey);
            });
        window.addEventListener('keyup', e =>{
            switch(e.key){
                case 'ArrowRight':
                    this.lastKey = 'ArrowRightReleased'
                    break;
                case 'ArrowLeft':
                    this.lastKey = 'ArrowLeftReleased'
                    break;
                case 'ArrowUp':
                    this.lastKey = 'ArrowUpReleased'
                    break;
                case 'ArrowDown':
                    this.lastKey = 'ArrowDownReleased'
                    break;
            }
            console.log(this.lastKey);
        });
    }
}