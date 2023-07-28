class AbstractVehicle {

    element
    speed = 0.3
    static maxSpeed = 0.3
    isHidden = true
    onExpire = {}

    constructor(element) {
        this.element = element
    }

    hide() {
        this.element.style.display = "none"
        this.isHidden = true
    }

    show() {
        this.element.style.display = "block"
        this.isHidden = false
        this.speed = this.getSpeed()
        let scaleResult = (this.speed/AbstractVehicle.maxSpeed) 
        let sizingResult = (1.1-0.4)*scaleResult + 0.4
        let result = "scale(" +sizingResult.toString() + ")"
        this.element.style.transform = result
    }

    draw(progress) {
        throw "Abstract method called. Should not be called lol"

    }

    reset() {
        throw "Abstract method called. Should not be called lol"

    }
    
    setY(y) {
        this.element.style.top = y+"px"
    }

    setOnClickListener(doOnClick) {
        this.element.addEventListener("click", ()=>{
            doOnClick(this)
        });
    }

    setOnExpiredListener(onExpire) {
        this.onExpire = onExpire
    }

    getRandomValue(min, max) {
        return (Math.random() * (max - min)) + min
    }

    getSpeed() {
        return (this.element.offsetTop/window.innerHeight * AbstractVehicle.maxSpeed)
    }

    levelUp(){
        throw "Abstract method called. Should not be called lol"
    } 

    levelDown(){
        throw "Abstract method called. Should not be called lol"
    }

    modifyScoreOnClick(score){
        throw "Abstract method called. Should not be called lol"
    }

    modifyLivesOnClick(lives){
        throw "Abstract method called. Should not be called lol"
    }

}