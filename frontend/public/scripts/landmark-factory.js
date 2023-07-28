class LandmarkFactory extends AbstractVehicleFactory {

    createVehicle(onEntityClicked, onExpire, yPosition) {
        return this.createSpecificVehicle(yPosition, onEntityClicked, onExpire)
    }

    newInstance(element){
        return new Landmark(element)
    }

    getImgUrl(){ 
        return this.getSpecificImgUrl() 
    }

    getClass(){
        return 'landmark' 
    }

}