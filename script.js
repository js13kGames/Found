var objid = 0
var newGameArea;
var ctx
var screenResized = false
var player;
var playerControl = {
  LEFT: false,
  UP: false,
  RIGHT: false,
  DOWN: false,
  JUMP:false,
  ENTER:false
};
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
function playerControlKeyPressed(event){
    const key = event.key
    console.log(key)
    if(key == "ArrowRight" || key == "D" || key == "d"){
        playerControl.RIGHT = true
    }
    if(key == "ArrowLeft" || key == "A" || key == "a"){
        playerControl.LEFT = true
    }
    if(key == "ArrowUp" || key == "W" || key == "w"){
        if(!player.gravityAvailabe){
            playerControl.UP = true
        }
    }
    if(key == "ArrowDown" || key == "s" || key == "S"){
        playerControl.DOWN = true
    }
    if(key == " "){
        playerControl.JUMP = true
    }
    if(key=="Enter"){
        playerControl.ENTER = true
    }
}
function playerControlKeyReleased(event){
    const key = event.key
    if(key == "ArrowRight" || key == "D" || key == "d"){
        playerControl.RIGHT = false
    }
    if(key == "ArrowLeft" || key == "A" || key == "a"){
        playerControl.LEFT = false
    }
    if(key == "ArrowUp" || key == "W" || key == "w"){
        if(!player.gravityAvailabe){
            playerControl.UP = false
        }
    }
    if(key == "ArrowDown" || key == "s" || key == "S"){
        playerControl.DOWN = false
    }
    if(key == " "){
        playerControl.JUMP = false
        player.jumpPressed = false
    }
    if(key=="Enter"){
        playerControl.ENTER = false
    }
}
var gameCanvas
var canvasWidth
var canvasHeight
function init() {
    gameCanvas = document.getElementById('gameAreaCanvas')
    newGameArea = new gameArea()
    ctx = newGameArea.context
    player = new Player(10,70)
    testObject = new ObjectMaterial(10,newGameArea.height-60,280,60,"p1",objid++)
    testObject2 = new ObjectMaterial(490,540,280,60,"p2",objid++)
    testObject3 = new ObjectMaterial(50,500,40,40,"star",objid++,1)
    document.addEventListener("keydown",playerControlKeyPressed, false);	
    document.addEventListener("keyup",playerControlKeyReleased, false);
}
window.addEventListener('resize', ()=>{
    //newGameArea.resizeGame()
    screenResized = true
}, false);
function resizeGame() {
    var gameAreaBody = document.getElementById('gameArea');
    var widthToHeight = 16 / 9;
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;
    var newWidthToHeight = newWidth / newHeight;
    
    if (newWidthToHeight > widthToHeight) {
        newWidth = newHeight * widthToHeight;
        gameAreaBody.style.height = newHeight + 'px';
        gameAreaBody.style.width = newWidth + 'px';
    } else {
        newHeight = newWidth / widthToHeight;
        gameAreaBody.style.width = newWidth + 'px';
        gameAreaBody.style.height = newHeight + 'px';
    }
    
    gameAreaBody.style.marginTop = (-newHeight / 2) + 'px';
    gameAreaBody.style.marginLeft = (-newWidth / 2) + 'px';
    
    gameCanvas.width = newWidth;
    gameCanvas.height = newHeight;
    canvasWidth = newWidth
    canvasHeight = newHeight
}
class gameArea {
    constructor (
        width=1665.7777777777776,height=937,color="rgb(59, 59, 59)"
    ) {
        this.color = color
        this.width = width
        this.height = height
        this.resizeRatio = 1
        this.start()
    }
    resizeGame() {
        var gameAreaBody = document.getElementById('gameArea');
        var widthToHeight = 16 / 9;
        var newWidth = window.innerWidth;
        var newHeight = window.innerHeight;
        var newWidthToHeight = newWidth / newHeight;
        
        if (newWidthToHeight > widthToHeight) {
            newWidth = newHeight * widthToHeight;
            gameAreaBody.style.height = newHeight + 'px';
            gameAreaBody.style.width = newWidth + 'px';
        } else {
            newHeight = newWidth / widthToHeight;
            gameAreaBody.style.width = newWidth + 'px';
            gameAreaBody.style.height = newHeight + 'px';
        }
        
        gameAreaBody.style.marginTop = (-newHeight / 2) + 'px';
        gameAreaBody.style.marginLeft = (-newWidth / 2) + 'px';
        
        gameCanvas.width = newWidth
        gameCanvas.height = newHeight
        console.log("New width",newWidth)
        this.resizeRatio = newWidth/1665.7777777777776
        this.width = newWidth
        this.height = newHeight
    }
    start() {
        this.canvas = gameCanvas
        this.resizeGame()
        this.canvas.style.backgroundColor = this.color
        this.context = this.canvas.getContext("2d")
        this.context.imageSmoothingEnabled = false
        this.interval = setInterval(updateGameArea,0.001)
    }
    clear() {
        if(screenResized){
            screenResized = false
            this.resizeGame()
        }
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
var testObject
var testObject2
var testObject3
function updateGameArea() {
    newGameArea.clear()
    testObject.objectInit()
    testObject2.objectInit()
    testObject3.objectInit()
    player.start()
}

document.addEventListener("DOMContentLoaded",init)