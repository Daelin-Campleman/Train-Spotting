class AbstractVehicleFactory {
    createVehicle(onEntityClicked, resetEntity) {
        throw "Abstract method called."
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
}