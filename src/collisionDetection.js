export function detectCollision(ball, gameObject){
    
    let bottomOfBall = ball.position.y + ball.size;
    let topOfBall = ball.position.y;

    let topOfgameObject = gameObject.position.y;
    let rightSideOfgameObject = gameObject.position.x + gameObject.width;
    let lefttSideOfgameObject = gameObject.position.x;
    let bottomOfgameObject = gameObject.position.y + gameObject.height;

    if( 
        bottomOfBall>topOfgameObject && 
        topOfBall < bottomOfgameObject && 
        ball.position.x >= lefttSideOfgameObject &&
        ball.position.x + ball.size <= rightSideOfgameObject
    ){
        return true;
    }else{
        return false;
    }
}