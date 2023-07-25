class TruckFactory extends AbstractVehicleFactory  {
    createVehicle(onEntityClicked, resetEntity) {
        const element = this.createElement()
        document.body.appendChild(element)
        element.style.display = 'none'
        const vehicle = new Truck(element)
        vehicle.setY(setLaneY())
        vehicle.setOnClickListener(onEntityClicked)
        vehicle.setOnExpiredListener(resetEntity)
        return vehicle
    }

    getImgUrl(){
        return '/static/images/level1Truck1.png'
    }
}