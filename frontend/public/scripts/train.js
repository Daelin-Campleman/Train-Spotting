class Train extends AbstractVehicle {

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