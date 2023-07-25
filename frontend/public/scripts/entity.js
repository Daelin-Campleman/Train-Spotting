class Entity {

    element
    speed = 0.1
    isHidden = false
    onExpire = {}
    type

    constructor(element, type) {
        this.element = element
        this.speed = this.#getRandomValue(0.1, 0.3)
        this.type = type
    }

    hide() {
        this.element.style.display = "none"
        this.isHidden = true
    }

    show() {
        this.element.style.display = "block"
        this.isHidden = false
    }

    draw(progress) {
        if(this.isHidden) {
            return
        }
        
        this.element.style.left = (this.element.offsetLeft+this.speed*progress)+"px"

        if (this.element.offsetLeft > window.innerWidth) {
            this.onExpire(this)
        }
    }

    reset() {
        this.element.style.left = (-this.element.clientWidth)+"px"
    }
    
// need to make this do it in lanes?
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

    #getRandomValue(min, max) {
        return (Math.random() * (max - min)) + min
    }

    getRandomDirection() {
        return 
    }

    levelUpTrain() {
        console.log("att" + this.element.getAttribute('src'))
        this.element.setAttribute('src', '/static/images/level2Train.png')
    }

}