class TrainFactory extends AbstractVehicleFactory {

    createVehicle(onEntityClicked, onExpire, yPosition) {
        return this.createSpecificVehicle(yPosition, onEntityClicked, onExpire)
    }

    newInstance(element){
        return new Train(element)
    }

    getImgUrl(){
        return '/static/images/level1Train.png'
    }

    getClass(){
        return 'train'
    }

}