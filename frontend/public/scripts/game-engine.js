startAnimation();
    
function startAnimation() {
    var lastRender = 0

    setInterval(showNextEntity, 1000)

    function animate(timestamp) {
        let progress = timestamp - lastRender

        vehicleArray.forEach(entity => { 
            entity.draw(progress)
        })

        lastRender = timestamp

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}