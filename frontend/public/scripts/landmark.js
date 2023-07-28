class Landmark extends AbstractVehicle {

    destination = 0

    draw(progress) {
        if(this.isHidden) {
            return
        }
        
        this.element.style.left = (this.element.offsetLeft-this.speed*progress)+"px"

        if (this.element.offsetLeft < -this.element.clientWidth) {
            this.onExpire(this)
        }
    }

    reset() {
        this.element.style.left = (window.innerWidth + this.element.clientWidth)+"px"
        this.speed = this.getSpeed()
    }



}