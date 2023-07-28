startAnimation();
    
function startAnimation() {
    var lastRender = 0

    setInterval(showNextVehicle, 1000)
    setInterval(showNextLandmark, 2000)

    function animate(timestamp) {
        let progress = timestamp - lastRender

        vehicleArray.forEach(entity => { 
            entity.draw(progress)
        })
        landmarkArray.forEach(entity => { 
            entity.draw(progress)
        })

        lastRender = timestamp

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}