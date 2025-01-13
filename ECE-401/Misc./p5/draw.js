// draw.js
function draw() {
    background(220);
    
    // Update camera position (function defined in setup.js)
    window.updateCamera();
    
    // Draw the main blue cube
    fill(0, 0, 255);
    box(32);
    
}
