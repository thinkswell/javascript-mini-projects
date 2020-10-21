document.addEventListener("DOMContentLoaded",() => {
    const grid = document.querySelector(".grid")
    const doodler = document.createElement("div")
    let doodlerLeftSpace = 50
    let startPoint = 150
    let doodlerBottomSpace = startPoint
    let isGameOver = false
    let platformCount = 5
    let platforms = []
    let upTimerId
    let downTimeId
    let isJumping = true
    let isGoingLeft = false
    let isGoingRight =false
    let leftTimerId
    let rightTimerId
    let score = 0
    
    function createDoodler(){
        grid.appendChild(doodler);
        doodler.classList.add("doodler")
        doodlerLeftSpace = platforms[0].left
        doodler.style.left = doodlerLeftSpace+ "px"
        doodler.style.bottom = doodlerBottomSpace + "px"
    }

    class Platform{
        constructor(newPlatBottom){
            this.bottom = newPlatBottom
            this.left = Math.random()*315
            this.visual = document.createElement("div")

            const visual = this.visual
            visual.classList.add("platform")
            visual.style.left = this.left + "px"
            visual.style.bottom = this.bottom + "px"
            grid.appendChild(visual)
        }
    } 

    function createPlatforms(){
        for(let i =0;i < platformCount ; i++){
            let platGap = 600 / platformCount
            let newPlatBottom = 100 + i * platGap
            let newPlatform = new Platform(newPlatBottom)
            platforms.push(newPlatform);
            console.log(platforms);
        }
    }

    function movePlatforms(){
        if(doodlerBottomSpace> 200){
            platforms.forEach(platform => {
                platform.bottom -=4
                let visual = platform.visual;
                visual.style.bottom = platform.bottom+"px"

                if(platform.bottom < 10){
                    let firstPlatform = platforms[0].visual
                    firstPlatform.classList.remove("platform")
                    platforms.shift()
                    score ++ 
                    console.log(platforms)
                    let newPlatform = new Platform(600)
                    platforms.push(newPlatform)
                }
            })
        }
    }

    function jump(){
        clearInterval(downTimeId)
        isJumping = true
        upTimerId = setInterval(function(){
            doodlerBottomSpace +=20
            doodler.style.bottom = doodlerBottomSpace + "px"
            if(doodlerBottomSpace > startPoint + 200){
                fall()
                isJumping = false
            }
        },20)
    }

    function fall(){
        isJumping = false
        clearInterval(upTimerId)
        downTimeId = setInterval(function(){
            doodlerBottomSpace  -= 5
            doodler.style.bottom = doodlerBottomSpace + "px"
            if(doodlerBottomSpace  <= 0){
                gameOver()
            }

            platforms.forEach(platform => {
                if(
                    (doodlerBottomSpace  >= platform.bottom) &&
                    (doodlerBottomSpace <= (platform.bottom + 15)) &&
                    (doodlerLeftSpace + 60 >= platform.left) &&
                    (doodlerLeftSpace  <= (platform.left + 85)) && 
                    !isJumping
                ){
                    console.log("landed");
                    startPoint = doodlerBottomSpace
                    jump()
                    console.log("start","startPoint")
                    isJumping = true
                }
            })
        },20)
    }

    function gameOver(){
        console.log("game over")
        isGameOver = true
        while(grid.firstChild){
            grid.removeChild(grid.firstChild)
        }
        grid.innerHTML = score
        clearInterval(upTimerId)
        clearInterval(downTimeId)
        clearInterval(leftTimerId)
        clearInterval(rightTimerId)
    }

    function control(e){
        doodler.style.bottom = doodlerBottomSpace + "px"
        if(e.key === "ArrowLeft"){
        // move left
        moveLeft()
        }
        else if(e.key === "ArrowRight"){
            // move right
            moveRight()
        }
        else if(e.key === "ArrowUp"){
            moveStright()
        }
    }

    function moveLeft(){
        if(isGoingRight){
            clearInterval(rightTimerId)
            isGoingRight = false
        }
        isGoingLeft = true
        leftTimerId = setInterval(function(){
            if(doodlerLeftSpace >= 0){
                doodlerLeftSpace -= 5
                doodler.style.left = doodlerLeftSpace + "px"
            }
            else{
                moveRight()
            }
            
        },20)
    }

    function moveRight(){
        if(isGoingLeft){
            clearInterval(leftTimerId)
            isGoingLeft = false
        }
        isGoingRight = true
        rightTimerId = setInterval(function(){
            if(doodlerLeftSpace <= 313){
                doodlerLeftSpace += 5
                doodler.style.left = doodlerLeftSpace+ "px"
            }
            else{
                moveLeft()
            }
        },20)
    }

    function moveStright(){
        isGoingLeft = false
        isGoingRight = false
        clearInterval(leftTimerId)
        clearInterval(rightTimerId)
    }

    function start(){
        if(!isGameOver){
            createPlatforms()
            createDoodler()
            setInterval(movePlatforms,20)
            jump()
            document.addEventListener("keyup",control)
        }
    }

    // attach to bottom

    start()
})