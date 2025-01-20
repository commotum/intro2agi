# Visual Primitives
- [Shape](#shape)
- [Color](#color)
- [Image](#image)
- [Transform](#transform)
- [Math](#math)
- [Data](#data)
- [3D](#3d)

## Shape

### 2D Primitives:
- [arc()](https://p5js.org/reference/p5/arc): Draws an arc.
- [circle()](https://p5js.org/reference/p5/circle): Draws a circle.
- [ellipse()](https://p5js.org/reference/p5/ellipse): Draws an ellipse (oval).
- [line()](https://p5js.org/reference/p5/line): Draws a straight line between two points.
- [point()](https://p5js.org/reference/p5/point): Draws a single point in space.
- [quad()](https://p5js.org/reference/p5/quad): Draws a quadrilateral (four-sided shape).
- [rect()](https://p5js.org/reference/p5/rect): Draws a rectangle.
- [square()](https://p5js.org/reference/p5/square): Draws a square.
- [triangle()](https://p5js.org/reference/p5/triangle): Draws a triangle.

### 3D Primitives:
- [plane()](https://p5js.org/reference/p5/plane): Draws a plane.
- [box()](https://p5js.org/reference/p5/box): Draws a box (rectangular prism).
- [cylinder()](https://p5js.org/reference/p5/cylinder): Draws a cylinder.
- [cone()](https://p5js.org/reference/p5/cone): Draws a cone.
- [ellipsoid()](https://p5js.org/reference/p5/ellipsoid): Draws an ellipsoid.
- [sphere()](https://p5js.org/reference/p5/sphere): Draws a sphere.
- [torus()](https://p5js.org/reference/p5/torus): Draws a torus.

## Color

### Creating & Reading:
- [alpha()](https://p5js.org/reference/p5/alpha): Gets the alpha (transparency) value of a color.
- [blue()](https://p5js.org/reference/p5/blue): Gets the blue value of a color.
- [brightness()](https://p5js.org/reference/p5/brightness): Gets the brightness value of a color.
- [color()](https://p5js.org/reference/p5/color): Creates a p5.Color object.
- [green()](https://p5js.org/reference/p5/green): Gets the green value of a color.
- [hue()](https://p5js.org/reference/p5/hue): Gets the hue value of a color.
- [lerpColor()](https://p5js.org/reference/p5/lerpColor): Blends two colors to find a third color between them.
- [lightness()](https://p5js.org/reference/p5/lightness): Gets the lightness value of a color.
- [paletteLerp()](https://p5js.org/reference/p5/paletteLerp): Blends multiple colors to find a color between them.
- [red()](https://p5js.org/reference/p5/red): Gets the red value of a color.
- [saturation()](https://p5js.org/reference/p5/saturation): Gets the saturation value of a color.

### Setting:
- [background()](https://p5js.org/reference/p5/background): Sets the color used for the background of the canvas.
- [beginClip()](https://p5js.org/reference/p5/beginClip): Starts defining a shape that will mask any shapes drawn afterward.
- [clear()](https://p5js.org/reference/p5/clear): Clears the pixels on the canvas.
- [clip()](https://p5js.org/reference/p5/clip): Defines a shape that will mask any shapes drawn afterward.
- [colorMode()](https://p5js.org/reference/p5/colorMode): Changes the way color values are interpreted.
- [endClip()](https://p5js.org/reference/p5/endClip): Ends defining a mask that was started with `beginClip()`.
- [erase()](https://p5js.org/reference/p5/erase): Starts using shapes to erase parts of the canvas.
- [fill()](https://p5js.org/reference/p5/fill): Sets the color used to fill shapes.
- [noErase()](https://p5js.org/reference/p5/noErase): Ends erasing that was started with `erase()`.
- [noFill()](https://p5js.org/reference/p5/noFill): Disables setting the fill color for shapes.
- [noStroke()](https://p5js.org/reference/p5/noStroke): Disables drawing points, lines, and the outlines of shapes.
- [stroke()](https://p5js.org/reference/p5/stroke): Sets the color used to draw points, lines, and the outlines of shapes.

## Image
- [createImage()](https://p5js.org/reference/p5/createImage): Creates a new p5.Image object.
- [saveCanvas()](https://p5js.org/reference/p5/saveCanvas): Saves the current canvas as an image.
- [saveFrames()](https://p5js.org/reference/p5/saveFrames): Captures a sequence of frames from the canvas that can be saved as images.

## Transform
- [applyMatrix()](https://p5js.org/reference/p5/applyMatrix): Applies a transformation matrix to the coordinate system.
- [resetMatrix()](https://p5js.org/reference/p5/resetMatrix): Clears all transformations applied to the coordinate system.
- [rotate()](https://p5js.org/reference/p5/rotate): Rotates the coordinate system.
- [rotateX()](https://p5js.org/reference/p5/rotateX): Rotates the coordinate system about the x-axis in WebGL mode.
- [rotateY()](https://p5js.org/reference/p5/rotateY): Rotates the coordinate system about the y-axis in WebGL mode.
- [rotateZ()](https://p5js.org/reference/p5/rotateZ): Rotates the coordinate system about the z-axis in WebGL mode.
- [scale()](https://p5js.org/reference/p5/scale): Scales the coordinate system.
- [shearX()](https://p5js.org/reference/p5/shearX): Shears the x-axis so that shapes appear skewed.
- [shearY()](https://p5js.org/reference/p5/shearY): Shears the y-axis so that shapes appear skewed.
- [translate()](https://p5js.org/reference/p5/translate): Translates the coordinate system.

## Math

### Calculation:
- [abs()](https://p5js.org/reference/p5/abs): Calculates the absolute value of a number.
- [ceil()](https://p5js.org/reference/p5/ceil): Calculates the closest integer value that is greater than or equal to a number.
- [constrain()](https://p5js.org/reference/p5/constrain): Constrains a number between a minimum and maximum value.
- [dist()](https://p5js.org/reference/p5/dist): Calculates the distance between two points.
- [exp()](https://p5js.org/reference/p5/exp): Calculates the value of Euler's number \(e\) (2.71828...) raised to the power of a number.
- [floor()](https://p5js.org/reference/p5/floor): Calculates the closest integer value that is less than or equal to the value of a number.
- [fract()](https://p5js.org/reference/p5/fract): Calculates the fractional part of a number.
- [lerp()](https://p5js.org/reference/p5/lerp): Calculates a number between two numbers at a specific increment.
- [log()](https://p5js.org/reference/p5/log): Calculates the natural logarithm (base-e logarithm) of a number.
- [mag()](https://p5js.org/reference/p5/mag): Calculates the magnitude (length) of a vector.
- [map()](https://p5js.org/reference/p5/map): Re-maps a number from one range to another.
- [max()](https://p5js.org/reference/p5/max): Returns the largest value in a sequence of numbers.
- [min()](https://p5js.org/reference/p5/min): Returns the smallest value in a sequence of numbers.
- [norm()](https://p5js.org/reference/p5/norm): Maps a number from one range to a value between 0 and 1.
- [pow()](https://p5js.org/reference/p5/pow): Calculates exponential expressions such as \(2^3\).
- [round()](https://p5js.org/reference/p5/round): Calculates the integer closest to a number.
- [sq()](https://p5js.org/reference/p5/sq): Calculates the square of a number.
- [sqrt()](https://p5js.org/reference/p5/sqrt): Calculates the square root of a number.

### Noise:
- [noise()](https://p5js.org/reference/p5/noise): Returns random numbers that can be tuned to feel organic.
- [noiseDetail()](https://p5js.org/reference/p5/noiseDetail): Adjusts the character of the noise produced by the `noise()` function.
- [noiseSeed()](https://p5js.org/reference/p5/noiseSeed): Sets the seed value for the `noise()` function.

### Random:
- [random()](https://p5js.org/reference/p5/random): Returns a random number or a random element from an array.
- [randomGaussian()](https://p5js.org/reference/p5/randomGaussian): Returns a random number fitting a Gaussian (normal) distribution.
- [randomSeed()](https://p5js.org/reference/p5/randomSeed): Sets the seed value for the `random()` and `randomGaussian()` functions.

### Trigonometry:
- [acos()](https://p5js.org/reference/p5/acos): Calculates the arc cosine of a number.
- [angleMode()](https://p5js.org/reference/p5/angleMode): Changes the unit system used to measure angles.
- [asin()](https://p5js.org/reference/p5/asin): Calculates the arc sine of a number.
- [atan()](https://p5js.org/reference/p5/atan): Calculates the arc tangent of a number.
- [atan2()](https://p5js.org/reference/p5/atan2): Calculates the angle formed by a point, the origin, and the positive x-axis.
- [cos()](https://p5js.org/reference/p5/cos): Calculates the cosine of an angle.
- [degrees()](https://p5js.org/reference/p5/degrees): Converts an angle measured in radians to its value in degrees.
- [radians()](https://p5js.org/reference/p5/radians): Converts an angle measured in degrees to its value in radians.
- [sin()](https://p5js.org/reference/p5/sin): Calculates the sine of an angle.
- [tan()](https://p5js.org/reference/p5/tan): Calculates the tangent of an angle.

### Vector:
- [createVector()](https://p5js.org/reference/p5/createVector): Creates a new p5.Vector object.

## Data

### Array Functions:
- [append()](https://p5js.org/reference/p5/append): Adds a value to the end of an array.
- [arrayCopy()](https://p5js.org/reference/p5/arrayCopy): Copies an array (or part of an array) to another array.
- [concat()](https://p5js.org/reference/p5/concat): Concatenates two arrays.
- [reverse()](https://p5js.org/reference/p5/reverse): Reverses the order of an array.
- [shorten()](https://p5js.org/reference/p5/shorten): Decreases an array by one element.
- [shuffle()](https://p5js.org/reference/p5/shuffle): Shuffles the elements of an array.
- [sort()](https://p5js.org/reference/p5/sort): Sorts an array of numbers or words.
- [splice()](https://p5js.org/reference/p5/splice): Inserts a value or an array of values into an existing array.
- [subset()](https://p5js.org/reference/p5/subset): Extracts an array of elements from an existing array.

### Conversion:
- [boolean()](https://p5js.org/reference/p5/boolean): Converts a String or Number to a Boolean.
- [byte()](https://p5js.org/reference/p5/byte): Converts a value to its byte representation.
- [char()](https://p5js.org/reference/p5/char): Converts a number to a single-character string.
- [float()](https://p5js.org/reference/p5/float): Converts a value to a floating-point number.
- [hex()](https://p5js.org/reference/p5/hex): Converts a number to a hexadecimal string.
- [int()](https://p5js.org/reference/p5/int): Converts a value to an integer.
- [str()](https://p5js.org/reference/p5/str): Converts a number to a string.
- [unchar()](https://p5js.org/reference/p5/unchar): Converts a single-character string to a number.
- [unhex()](https://p5js.org/reference/p5/unhex): Converts a hexadecimal string to a number.

### String Functions:
- [join()](https://p5js.org/reference/p5/join): Combines an array of strings into one string.
- [match()](https://p5js.org/reference/p5/match): Finds matches in a string based on a regex.
- [matchAll()](https://p5js.org/reference/p5/matchAll): Finds all matches in a string based on a regex.
- [nf()](https://p5js.org/reference/p5/nf): Formats a number with a specified number of digits.
- [nfc()](https://p5js.org/reference/p5/nfc): Formats a number with commas for thousands.
- [split()](https://p5js.org/reference/p5/split): Splits a string into an array of substrings.
- [trim()](https://p5js.org/reference/p5/trim): Removes whitespace from a string.

## 3D

### Camera:
- [camera()](https://p5js.org/reference/p5/camera): Sets the position and orientation of the current camera in a 3D sketch.
- [createCamera()](https://p5js.org/reference/p5/createCamera): Creates a new p5.Camera object and sets it as the current (active) camera.
- [frustum()](https://p5js.org/reference/p5/frustum): Sets the frustum of the current camera in a 3D sketch.
- [linePerspective()](https://p5js.org/reference/p5/linePerspective): Enables or disables perspective for lines in 3D sketches.
- [ortho()](https://p5js.org/reference/p5/ortho): Sets an orthographic projection for the current camera in a 3D sketch.
- [perspective()](https://p5js.org/reference/p5/perspective): Sets a perspective projection for the current camera in a 3D sketch.
- [setCamera()](https://p5js.org/reference/p5/setCamera): Sets the current (active) camera of a 3D sketch.

### Lights:
- [ambientLight()](https://p5js.org/reference/p5/ambientLight): Creates a light that shines from all directions.
- [directionalLight()](https://p5js.org/reference/p5/directionalLight): Creates a light that shines in one direction.
- [imageLight()](https://p5js.org/reference/p5/imageLight): Creates an ambient light from an image.
- [lightFalloff()](https://p5js.org/reference/p5/lightFalloff): Sets the falloff rate for pointLight() and spotLight().
- [lights()](https://p5js.org/reference/p5/lights): Places an ambient and directional light in the scene.
- [noLights()](https://p5js.org/reference/p5/noLights): Removes all lights from the sketch.
- [panorama()](https://p5js.org/reference/p5/panorama): Creates an immersive 3D background.
- [pointLight()](https://p5js.org/reference/p5/pointLight): Creates a light that shines from a point in all directions.
- [specularColor()](https://p5js.org/reference/p5/specularColor): Sets the specular color for lights.
- [spotLight()](https://p5js.org/reference/p5/spotLight): Creates a light that shines from a point in one direction.

### Material:
- [ambientMaterial()](https://p5js.org/reference/p5/ambientMaterial): Sets the ambient color of shapes' surface material.
- [baseColorShader()](https://p5js.org/reference/p5/baseColorShader): Gets the shader used when no lights or materials are applied.
- [baseMaterialShader()](https://p5js.org/reference/p5/baseMaterialShader): Gets the default shader used with lights, materials, and textures.
- [baseNormalShader()](https://p5js.org/reference/p5/baseNormalShader): Gets the shader used by normalMaterial().
- [baseStrokeShader()](https://p5js.org/reference/p5/baseStrokeShader): Gets the shader used when drawing the strokes of shapes.
- [createFilterShader()](https://p5js.org/reference/p5/createFilterShader): Creates a p5.Shader object to be used with the filter() function.
- [createShader()](https://p5js.org/reference/p5/createShader): Creates a new p5.Shader object.
- [emissiveMaterial()](https://p5js.org/reference/p5/emissiveMaterial): Sets the emissive color of shapes' surface material.
- [loadShader()](https://p5js.org/reference/p5/loadShader): Loads vertex and fragment shaders to create a p5.Shader object.
- [metalness()](https://p5js.org/reference/p5/metalness): Sets the amount of "metalness" of a specularMaterial().
- [normalMaterial()](https://p5js.org/reference/p5/normalMaterial): Sets the current material as a normal material.
- [resetShader()](https://p5js.org/reference/p5/resetShader): Restores the default shaders.
- [shader()](https://p5js.org/reference/p5/shader): Sets the p5.Shader object to apply while drawing.
- [shininess()](https://p5js.org/reference/p5/shininess): Sets the amount of gloss ("shininess") of a specularMaterial().
- [specularMaterial()](https://p5js.org/reference/p5/specularMaterial): Sets the specular color of shapes' surface material.
- [texture()](https://p5js.org/reference/p5/texture): Sets the texture that will be used on shapes.
- [textureMode()](https://p5js.org/reference/p5/textureMode): Changes the coordinate system used for textures when they're applied to custom shapes.
- [textureWrap()](https://p5js.org/reference/p5/textureWrap): Changes the way textures behave when a shape's uv coordinates go beyond the texture.