class Truck extends AbstractVehicle {

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