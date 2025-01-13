// draw.js
function draw() {
    background(220);
    
    // Update camera position (function defined in setup.js)
    window.updateCamera();
    
    // Draw the main blue cube
    fill(0, 0, 255);
    box(32);
    
    // Blue cylinder on +z axis
    push();
    translate(0, 0, 132);
    rotateX(PI/2);
    fill(0, 0, 255);
    cylinder(10, 64);
    pop();
    
    // Red cylinder on +x axis
    push();
    translate(132, 0, 0);
    rotateZ(-PI/2);
    fill(255, 0, 0);
    cylinder(10, 64);
    pop();
    
    // Green cylinder on +y axis
    push();
    translate(0, 132, 0);
    fill(0, 255, 0);
    cylinder(10, 64);
    pop();
}