class Train extends AbstractVehicle {

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
        this.element.getElementsByTagName("img").item(0).setAttribute('src', '/static/images/level2Train.png')
    }

    levelDown() {
        this.element.getElementsByTagName("img").item(0).setAttribute('src', '/static/images/level1Train.png')
    }

    modifyScoreOnClick(score){
        return score+1
    }

    modifyLivesOnClick(lives){
        return lives
    }

}