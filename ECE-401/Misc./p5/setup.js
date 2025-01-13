// setup.js
// Global state that needs to be shared with draw.js
window.state = {
    dragging: false,
    lastMouseX: 0,
    lastMouseY: 0,
    rotationX: 0,
    rotationY: 0,
    velocityX: 0,
    velocityY: 0,
    decay: 0.95,
    isOrthographic: false
};

function setup() {
    let canvas = createCanvas(480, 480, WEBGL);
    canvas.parent('canvas-container');
    smooth();
    setupOrbitControls();
    setupProjectionToggle();
    
    // Create a function to update camera position
    window.updateCamera = () => {
        if (!window.state.dragging) {
            window.state.rotationX += window.state.velocityX;
            window.state.rotationY += window.state.velocityY;
            // Gradually slow down
            window.state.velocityX *= window.state.decay;
            window.state.velocityY *= window.state.decay;
        }
        
        // Set projection mode
        if (window.state.isOrthographic) {
            ortho(-width/2, width/2, -height/2, height/2, -1000, 1000);
        } else {
            perspective(PI/3.0, width/height, 0.1, 1000);
        }
        
        ambientLight(255);
        rotateX(window.state.rotationX);
        rotateY(window.state.rotationY);
    };
}

function setupProjectionToggle() {
    const button = document.getElementById('projection-toggle');
    button.addEventListener('click', (event) => {
        // Prevent the event from bubbling up
        event.stopPropagation();
        
        // Reset velocities to prevent spinning
        window.state.velocityX = 0;
        window.state.velocityY = 0;
        
        // Toggle projection mode
        window.state.isOrthographic = !window.state.isOrthographic;
        button.textContent = window.state.isOrthographic ? 
            'Switch to Perspective' : 'Switch to Orthographic';
    });
}

function setupOrbitControls() {
    // Mouse pressed handler
    mousePressed = () => {
        // Only handle mouse press if it's in the canvas area
        if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
            // Check if the click is not on the button
            const button = document.getElementById('projection-toggle');
            const buttonRect = button.getBoundingClientRect();
            const isClickOnButton = 
                mouseY >= buttonRect.top && 
                mouseY <= buttonRect.bottom && 
                mouseX >= buttonRect.left && 
                mouseX <= buttonRect.right;
            
            if (!isClickOnButton) {
                window.state.dragging = true;
                window.state.lastMouseX = mouseX;
                window.state.lastMouseY = mouseY;
                window.state.velocityX = 0;
                window.state.velocityY = 0;
            }
        }
    };

    // Mouse released handler
    mouseReleased = () => {
        if (window.state.dragging) {
            window.state.dragging = false;
            window.state.velocityX = (mouseX - window.state.lastMouseX) * 0.01;
            window.state.velocityY = (window.state.lastMouseY - mouseY) * 0.01;
        }
    };

    // Mouse dragged handler
    mouseDragged = () => {
        if (window.state.dragging) {
            let deltaX = mouseX - window.state.lastMouseX;
            let deltaY = mouseY - window.state.lastMouseY;
            
            window.state.rotationY += deltaX * 0.01;
            window.state.rotationX -= deltaY * 0.01;
            
            window.state.lastMouseX = mouseX;
            window.state.lastMouseY = mouseY;
        }
    };

    // Key pressed handler
    keyPressed = () => {
        if (key === 's' || key === 'S') {
            save('cube.obj');
        }
    };
}
