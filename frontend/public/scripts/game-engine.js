startAnimation();
    
function startAnimation() {
    var lastRender = 0

    function animate(timestamp) {
        let progress = timestamp - lastRender

        entities.forEach(entity => { 
            entity.draw(progress)
        })

        lastRender = timestamp

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}