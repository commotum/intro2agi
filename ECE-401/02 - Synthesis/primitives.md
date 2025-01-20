# P5.js Reference with Links

## Shape

### 2D Primitives:
- [arc()](https://p5js.org/reference/#/p5/arc): Draws an arc.
- [circle()](https://p5js.org/reference/#/p5/circle): Draws a circle.
- [ellipse()](https://p5js.org/reference/#/p5/ellipse): Draws an ellipse (oval).
- [line()](https://p5js.org/reference/#/p5/line): Draws a straight line between two points.
- [point()](https://p5js.org/reference/#/p5/point): Draws a single point in space.
- [quad()](https://p5js.org/reference/#/p5/quad): Draws a quadrilateral (four-sided shape).
- [rect()](https://p5js.org/reference/#/p5/rect): Draws a rectangle.
- [square()](https://p5js.org/reference/#/p5/square): Draws a square.
- [triangle()](https://p5js.org/reference/#/p5/triangle): Draws a triangle.

### 3D Primitives:
- [plane()](https://p5js.org/reference/#/p5/plane): Draws a plane.
- [box()](https://p5js.org/reference/#/p5/box): Draws a box (rectangular prism).
- [cylinder()](https://p5js.org/reference/#/p5/cylinder): Draws a cylinder.
- [cone()](https://p5js.org/reference/#/p5/cone): Draws a cone.
- [ellipsoid()](https://p5js.org/reference/#/p5/ellipsoid): Draws an ellipsoid.
- [sphere()](https://p5js.org/reference/#/p5/sphere): Draws a sphere.
- [torus()](https://p5js.org/reference/#/p5/torus): Draws a torus.

## Color

### Creating & Reading:
- [alpha()](https://p5js.org/reference/#/p5/alpha): Gets the alpha (transparency) value of a color.
- [blue()](https://p5js.org/reference/#/p5/blue): Gets the blue value of a color.
- [brightness()](https://p5js.org/reference/#/p5/brightness): Gets the brightness value of a color.
- [color()](https://p5js.org/reference/#/p5/color): Creates a p5.Color object.
- [green()](https://p5js.org/reference/#/p5/green): Gets the green value of a color.
- [hue()](https://p5js.org/reference/#/p5/hue): Gets the hue value of a color.
- [lerpColor()](https://p5js.org/reference/#/p5/lerpColor): Blends two colors to find a third color between them.
- [lightness()](https://p5js.org/reference/#/p5/lightness): Gets the lightness value of a color.
- [paletteLerp()](https://p5js.org/reference/#/p5/paletteLerp): Blends multiple colors to find a color between them.
- [red()](https://p5js.org/reference/#/p5/red): Gets the red value of a color.
- [saturation()](https://p5js.org/reference/#/p5/saturation): Gets the saturation value of a color.

### Setting:
- [background()](https://p5js.org/reference/#/p5/background): Sets the color used for the background of the canvas.
- [beginClip()](https://p5js.org/reference/#/p5/beginClip): Starts defining a shape that will mask any shapes drawn afterward.
- [clear()](https://p5js.org/reference/#/p5/clear): Clears the pixels on the canvas.
- [clip()](https://p5js.org/reference/#/p5/clip): Defines a shape that will mask any shapes drawn afterward.
- [colorMode()](https://p5js.org/reference/#/p5/colorMode): Changes the way color values are interpreted.
- [endClip()](https://p5js.org/reference/#/p5/endClip): Ends defining a mask that was started with `beginClip()`.
- [erase()](https://p5js.org/reference/#/p5/erase): Starts using shapes to erase parts of the canvas.
- [fill()](https://p5js.org/reference/#/p5/fill): Sets the color used to fill shapes.
- [noErase()](https://p5js.org/reference/#/p5/noErase): Ends erasing that was started with `erase()`.
- [noFill()](https://p5js.org/reference/#/p5/noFill): Disables setting the fill color for shapes.
- [noStroke()](https://p5js.org/reference/#/p5/noStroke): Disables drawing points, lines, and the outlines of shapes.
- [stroke()](https://p5js.org/reference/#/p5/stroke): Sets the color used to draw points, lines, and the outlines of shapes.


Image
        createImage(): Creates a new p5.Image object.
        saveCanvas(): Saves the current canvas as an image.
        saveFrames(): Captures a sequence of frames from the canvas that can be saved as images.

Transform
        applyMatrix(): Applies a transformation matrix to the coordinate system.
        resetMatrix(): Clears all transformations applied to the coordinate system.
        rotate(): Rotates the coordinate system.
        rotateX(): Rotates the coordinate system about the x-axis in WebGL mode.
        rotateY(): Rotates the coordinate system about the y-axis in WebGL mode.
        rotateZ(): Rotates the coordinate system about the z-axis in WebGL mode.
        scale(): Scales the coordinate system.
        shearX(): Shears the x-axis so that shapes appear skewed.
        shearY(): Shears the y-axis so that shapes appear skewed.
        translate(): Translates the coordinate system.

3D
    Camera:
        camera(): Sets the position and orientation of the current camera in a 3D sketch.
        createCamera(): Creates a new p5.Camera object and sets it as the current (active) camera.
        frustum(): Sets the frustum of the current camera in a 3D sketch.
        linePerspective(): Enables or disables perspective for lines in 3D sketches.
        ortho(): Sets an orthographic projection for the current camera in a 3D sketch.
        perspective(): Sets a perspective projection for the current camera in a 3D sketch.
        setCamera(): Sets the current (active) camera of a 3D sketch.
    Lights:
        ambientLight(): Creates a light that shines from all directions.
        directionalLight(): Creates a light that shines in one direction.
        imageLight(): Creates an ambient light from an image.
        lightFalloff(): Sets the falloff rate for pointLight() and spotLight().
        lights(): Places an ambient and directional light in the scene.
        noLights(): Removes all lights from the sketch.
        panorama(): Creates an immersive 3D background.
        pointLight(): Creates a light that shines from a point in all directions.
        specularColor(): Sets the specular color for lights.
        spotLight(): Creates a light that shines from a point in one direction.
    Material:
        ambientMaterial(): Sets the ambient color of shapes' surface material.
        baseColorShader(): Get the shader used when no lights or materials are applied.
        baseMaterialShader(): Get the default shader used with lights, materials, and textures.
        baseNormalShader(): Get the shader used by normalMaterial().
        baseStrokeShader(): Get the shader used when drawing the strokes of shapes.
        createFilterShader(): Creates a p5.Shader object to be used with the filter() function.
        createShader(): Creates a new p5.Shader object.
        emissiveMaterial(): Sets the emissive color of shapes' surface material.
        loadShader(): Loads vertex and fragment shaders to create a p5.Shader object.
        metalness(): Sets the amount of "metalness" of a specularMaterial().
        normalMaterial(): Sets the current material as a normal material.
        resetShader(): Restores the default shaders.
        shader(): Sets the p5.Shader object to apply while drawing.
        shininess(): Sets the amount of gloss ("shininess") of a specularMaterial().
        specularMaterial(): Sets the specular color of shapes' surface material.
        texture(): Sets the texture that will be used on shapes.
        textureMode(): Changes the coordinate system used for textures when they're applied to custom shapes.
        textureWrap(): Changes the way textures behave when a shape's uv coordinates go beyond the texture.
    p5.Camera:
        camera(): Sets the position and orientation of the camera.
        centerX: The x-coordinate of the place where the camera looks.
        centerY: The y-coordinate of the place where the camera looks.
        centerZ: The y-coordinate of the place where the camera looks.
        eyeX: The camera's x-coordinate.
        eyeY: The camera's y-coordinate.
        eyeZ: The camera's z-coordinate.
        frustum(): Sets the camera's frustum.
        lookAt(): Points the camera at a location.
        move(): Moves the camera along its "local" axes without changing its orientation.
        ortho(): Sets an orthographic projection for the camera.
        pan(): Rotates the camera left and right.
        perspective(): Sets a perspective projection for the camera.
        roll(): Rotates the camera in a clockwise/counter-clockwise direction.
        set(): Sets the camera's position, orientation, and projection by copying another camera.
        setPosition(): Sets the camera's position in "world" space without changing its orientation.
        slerp(): Sets the camera's position and orientation to values that are in-between those of two other cameras.
        tilt(): Rotates the camera up and down.
        upX: The x-component of the camera's "up" vector.
        upY: The y-component of the camera's "up" vector.
        upZ: The z-component of the camera's "up" vector.
    p5.Framebuffer:
        autoSized(): Toggles the framebuffer's autosizing mode or returns the current mode.
        begin(): Begins drawing shapes to the framebuffer.
        color: An object that stores the framebuffer's color data.
        createCamera(): Creates a new p5.Camera object to use with the framebuffer.
        depth: An object that stores the framebuffer's dpeth data.
        draw(): Draws to the framebuffer by calling a function that contains drawing instructions.
        end(): Stops drawing shapes to the framebuffer.
        get(): Gets a pixel or a region of pixels from the framebuffer.
        loadPixels(): Loads the current value of each pixel in the framebuffer into its pixels array.
        pixelDensity(): Sets the framebuffer's pixel density or returns its current density.
        pixels: An array containing the color of each pixel in the framebuffer.
        remove(): Deletes the framebuffer from GPU memory.
        resize(): Resizes the framebuffer to a given width and height.
        updatePixels(): Updates the framebuffer with the RGBA values in the pixels array.
Math
    Calculation:
        abs(): Calculates the absolute value of a number.
        ceil(): Calculates the closest integer value that is greater than or equal to a number.
        constrain(): Constrains a number between a minimum and maximum value.
        dist(): Calculates the distance between two points.
        exp(): Calculates the value of Euler's number e (2.71828...) raised to the power of a number.
        floor(): Calculates the closest integer value that is less than or equal to the value of a number.
        fract(): Calculates the fractional part of a number.
        lerp(): Calculates a number between two numbers at a specific increment.
        log(): Calculates the natural logarithm (the base-e logarithm) of a number.
        mag(): Calculates the magnitude, or length, of a vector.
        map(): Re-maps a number from one range to another.
        max(): Returns the largest value in a sequence of numbers.
        min(): Returns the smallest value in a sequence of numbers.
        norm(): Maps a number from one range to a value between 0 and 1.
        pow(): Calculates exponential expressions such as 23.
        round(): Calculates the integer closest to a number.
        sq(): Calculates the square of a number.
        sqrt(): Calculates the square root of a number.
    Noise:
        noise(): Returns random numbers that can be tuned to feel organic.
        noiseDetail(): Adjusts the character of the noise produced by the noise() function.
        noiseSeed(): Sets the seed value for the noise() function.
    Random:
        random(): Returns a random number or a random element from an array.
        randomGaussian(): Returns a random number fitting a Gaussian, or normal, distribution.
        randomSeed(): Sets the seed value for the random() and randomGaussian() functions.
    Trigonometry:
        acos(): Calculates the arc cosine of a number.
        angleMode(): Changes the unit system used to measure angles.
        asin(): Calculates the arc sine of a number.
        atan(): Calculates the arc tangent of a number.
        atan2(): Calculates the angle formed by a point, the origin, and the positive x-axis.
        cos(): Calculates the cosine of an angle.
        degrees(): Converts an angle measured in radians to its value in degrees.
        radians(): Converts an angle measured in degrees to its value in radians.
        sin(): Calculates the sine of an angle.
        tan(): Calculates the tangent of an angle.
    Vector:
        createVector(): Creates a new p5.Vector object.
        p5.Vector:
            add(): Adds to a vector's x, y, and z components.
            angleBetween(): Calculates the angle between two vectors.
            array(): Returns the vector's components as an array of numbers.
            clampToZero(): Replaces the components of a p5.Vector that are very close to zero with zero.
            copy(): Returns a copy of the p5.Vector object.
            cross(): Calculates the cross product of two vectors.
            dist(): Calculates the distance between two points represented by vectors.
            div(): Divides a vector's x, y, and z components.
            dot(): Calculates the dot product of two vectors.
            equals(): Checks whether all the vector's components are equal to another vector's.
            fromAngle(): Creates a new 2D vector from an angle.
            fromAngles(): Creates a new 3D vector from a pair of ISO spherical angles.
            heading(): Calculates the angle a 2D vector makes with the positive x-axis.
            lerp(): Calculates new x, y, and z components that are proportionally the same distance between two vectors.
            limit(): Limits a vector's magnitude to a maximum value.
            mag(): Calculates the magnitude (length) of the vector.
            magSq(): Calculates the magnitude (length) of the vector squared.
            mult(): Multiplies a vector's x, y, and z components.
            normalize(): Scales the components of a p5.Vector object so that its magnitude is 1.
            random2D(): Creates a new 2D unit vector with a random heading.
            random3D(): Creates a new 3D unit vector with a random heading.
            reflect(): Reflects a vector about a line in 2D or a plane in 3D.
            rem(): Performs modulo (remainder) division with a vector's x, y, and z components.
            rotate(): Rotates a 2D vector by an angle without changing its magnitude.
            set(): Sets the vector's x, y, and z components.
            setHeading(): Rotates a 2D vector to a specific angle without changing its magnitude.
            setMag(): Sets a vector's magnitude to a given value.
            slerp(): Calculates a new heading and magnitude that are between two vectors.
            sub(): Subtracts from a vector's x, y, and z components.
            toString(): Returns a string representation of a vector.
            x: The x component of the vector
            y: The y component of the vector
            z: The z component of the vector

Data:
    Array Functions:
        append(): Adds a value to the end of an array.
        arrayCopy(): Copies an array (or part of an array) to another array.
        concat(): Concatenates two arrays, maps to Array.concat().
        reverse(): Reverses the order of an array, maps to Array.reverse()
        shorten(): Decreases an array by one element and returns the shortened array, maps to Array.pop().
        shuffle(): Shuffles the elements of an array.
        sort(): Sorts an array of numbers from smallest to largest, or puts an array of words in alphabetical order.
        splice(): Inserts a value or an array of values into an existing array.
        subset(): Extracts an array of elements from an existing array.
    Conversion:
        boolean(): Converts a String or Number to a Boolean.
        byte(): Converts a Boolean, String, or Number to its byte value.
        char(): Converts a Number or String to a single-character String.
        float(): Converts a String to a floating point (decimal) Number.
        hex(): Converts a Number to a String with its hexadecimal value.
        int(): Converts a Boolean, String, or decimal Number to an integer.
        str(): Converts a Boolean or Number to String.
        unchar(): Converts a single-character String to a Number.
        unhex(): Converts a String with a hexadecimal value to a Number.
    Dictionary:
        createNumberDict(): Creates a new instance of p5.NumberDict using the key-value pair or object you provide.
        createStringDict(): Creates a new instance of p5.StringDict using the key-value pair or the object you provide.
        p5.StringDict: A simple Dictionary class for Strings.
    LocalStorage:
        clearStorage(): Removes all items in the web browser's local storage.
        getItem(): Returns a value in the web browser's local storage.
        removeItem(): Removes an item from the web browser's local storage.
        storeItem(): Stores a value in the web browser's local storage.
    String Functions:
        join(): Combines an array of strings into one string.
        match(): Applies a regular expression to a string and returns an array with the first match.
        matchAll(): Applies a regular expression to a string and returns an array of matches.
        nf(): Converts a Number into a String with a given number of digits.
        nfc(): Converts a Number into a String with commas to mark units of 1,000.
        nfp(): Converts a Number into a String with a plus or minus sign.
        nfs(): Converts a positive Number into a String with an extra space in front.
        split(): Splits a String into pieces and returns an array containing the pieces.
        splitTokens(): Splits a String into pieces and returns an array containing the pieces.
        trim(): Removes whitespace from the start and end of a String without changing the middle.
    p5.NumberDict:
        add(): Add the given number to the value currently stored at the given key.
        div(): Divide the given number with the value currently stored at the given key.
        maxKey(): Return the highest key currently used in the Dictionary.
        maxValue(): Return the highest number currently stored in the Dictionary.
        minKey(): Return the lowest key currently used in the Dictionary.
        minValue(): Return the lowest number currently stored in the Dictionary.
        mult(): Multiply the given number with the value currently stored at the given key.
        sub(): Subtract the given number from the value currently stored at the given key.
    p5.TypedDict:
        clear(): Removes all previously stored key-value pairs from the Dictionary.
        create(): Creates a new key-value pair in the Dictionary.
        get(): Returns the value stored at the given key.
        hasKey(): Returns true if the given key exists in the Dictionary, otherwise returns false.
        print(): Logs the set of items currently stored in the Dictionary to the console.
        remove(): Removes the key-value pair stored at the given key from the Dictionary.
        saveJSON(): Converts the Dictionary into a JSON file for local download.
        saveTable(): Converts the Dictionary into a CSV file for local download.
        set(): Updates the value associated with the given key in case it already exists in the Dictionary.
        size(): Returns the number of key-value pairs currently stored in the Dictionary.

