let dragging = false;
let lastMouseX, lastMouseY;
let rotationX = 0;
let rotationY = 0;
// Add velocity variables
let velocityX = 0;
let velocityY = 0;
// Add decay factor (smaller = more slippery)
const decay = 0.95;

function setup() {
    createCanvas(480, 480, WEBGL);
    smooth();
}

function draw() {
    background(220);
    
    // Apply inertia when not dragging
    if (!dragging) {
        rotationX += velocityX;
        rotationY += velocityY;
        // Gradually slow down
        velocityX *= decay;
        velocityY *= decay;
    }
    
    ambientLight(255);
    
    rotateX(rotationX);
    rotateY(rotationY);
    
    // Draw the main blue cube
    fill(0, 0, 255);
    box(32);
    
    // Blue cylinder on +z axis
    push();
    translate(0, 0, 132); // 200/2 + 32 to position at edge of cube
    rotateX(PI/2); // Rotate to align with z-axis
    fill(0, 0, 255);
    cylinder(10, 64); // radius 10, height 64
    pop();
    
    // Red cylinder on +x axis
    push();
    translate(132, 0, 0);
    rotateZ(-PI/2); // Rotate to align with x-axis
    fill(255, 0, 0);
    cylinder(10, 64);
    pop();
    
    // Green cylinder on +y axis
    push();
    translate(0, 132, 0);
    // No rotation needed for y-axis as cylinder defaults to y alignment
    fill(0, 255, 0);
    cylinder(10, 64);
    pop();
}

function mousePressed() {
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        dragging = true;
        lastMouseX = mouseX;
        lastMouseY = mouseY;
        // Reset velocities when starting new drag
        velocityX = 0;
        velocityY = 0;
    }
}

function mouseReleased() {
    dragging = false;
    // Capture final velocities when releasing
    velocityX = (mouseX - lastMouseX) * 5;
    velocityY = (lastMouseY - mouseY) * 5;  // Note: inverted for Y
}

function mouseDragged() {
    if (dragging) {
        let deltaX = mouseX - lastMouseX;
        let deltaY = mouseY - lastMouseY;
        
        rotationY += deltaX * 0.01;
        rotationX -= deltaY * 0.01;
        
        // Store current mouse position for next frame
        lastMouseX = mouseX;
        lastMouseY = mouseY;
    }
}

function keyPressed() {
    if (key === 's' || key === 'S') {
        save('cube.obj');
    }
}