export default class InputHandler{

    constructor(paddle){

        this.rightKeyPressed = false;
        this.leftKeyPressed = false;

        document.addEventListener("keydown", (event)=>{
            let keyPressed = event.key;
            
            switch(keyPressed){
                case 'ArrowLeft':{
                    this.leftKeyPressed = true;
                    // console.log(this.leftKeyPressed);
                    paddle.moveLeft();
                    break;   
                }
                case 'ArrowRight':{
                    this.rightKeyPressed = true;
                    // console.log(this.rightKeyPressed);
                    paddle.moveRight();
                    break;
                }
                    

            }
        });
        document.addEventListener("keyup", (event)=>{
            let keyPressed = event.key;
            
            switch(keyPressed){
                case 'ArrowLeft':{
                    this.leftKeyPressed = false;
                    // console.log(this.leftKeyPressed);
                    if(!this.rightKeyPressed){
                        if(paddle.speed < 0){
                            
                            paddle.stop();
                        }
                        break;   
                    }else{
                        if(paddle.speed < 0){
                            
                            paddle.moveRight();
                        }
                        break;   
                    }
                }
                case 'ArrowRight':{
                    this.rightKeyPressed = false;
                    // console.log(this.rightKeyPressed);
                    if(!this.leftKeyPressed){
                        if(paddle.speed > 0){
                            
                            paddle.stop();
                        }
                        break;
                    }else{
                        if(paddle.speed > 0){
                            
                            paddle.moveLeft();
                        }
                        break;
                    }
                }
                    

            }
        });
    }
}