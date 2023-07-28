class Truck extends AbstractVehicle {

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
        this.speed = this.getSpeed()
    }

    levelUp() {
        this.element.getElementsByTagName("img").item(0).setAttribute('src', '/static/images/level2Truck1.png')
    }

    levelDown() {
        this.element.getElementsByTagName("img").item(0).setAttribute('src', '/static/images/level1Truck1.png')
    }

    modifyScoreOnClick(score){
        return score
    }

    modifyLivesOnClick(lives){
        return lives-1
    }
}