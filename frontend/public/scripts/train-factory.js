class TrainFactory extends AbstractVehicleFactory {
    createVehicle(onEntityClicked, resetEntity) {
        const element = this.createElement()
        document.body.appendChild(element)
        element.style.display = 'none'
        element.style.class = 'train'
        const vehicle = new Train(element)
        vehicle.setY(setLaneY())
        vehicle.setOnClickListener(onEntityClicked)
        vehicle.setOnExpiredListener(resetEntity)
        return vehicle
    }

    getImgUrl(){
        return '/static/images/level1Train.png'
    }


}