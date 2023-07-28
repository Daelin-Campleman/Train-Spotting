class TruckFactory extends AbstractVehicleFactory  {

    createVehicle(onEntityClicked, onExpire, yPosition) {
        return this.createSpecificVehicle(yPosition, onEntityClicked, onExpire)
    }

    newInstance(element){
        return new Truck(element)
    }

    getImgUrl(){
        return '/static/images/level1Truck1.png'
    }

    getClass(){
        return 'truck'
    }
}