class AbstractVehicleFactory {
    destination = 0
    createVehicle(onEntityClicked, onExpire, yPosition) {
        throw "Abstract method called."
    }

    newInstance(element){
        throw "Abstract method called."
    }

    createSpecificVehicle( yPosition, onEntityClicked, onExpire ) {
        const element = this.createElement()
        document.body.appendChild(element)
        element.style.display = 'none'
        element.style.class = this.getClass()
        const vehicle = this.newInstance(element)
        vehicle.setY(yPosition)
        vehicle.setOnClickListener(onEntityClicked)
        vehicle.setOnExpiredListener(onExpire)
        vehicle.reset()
        return vehicle
    }

    createElement() {
        const newButton = document.createElement('button')
        newButton.style.position = 'absolute'
        const img = document.createElement('img')
        img.setAttribute('src', this.getImgUrl())
        newButton.appendChild(img)
        return newButton
    }

    getImgUrl(){
        throw "Abstract method called."
    }

    getClass(){
        throw "Abstract method called."
    }
    getSpecificImgUrl() {
        this.destination++
        return '/static/images/'+`destination${this.destination}`+'.png' 
    }
}