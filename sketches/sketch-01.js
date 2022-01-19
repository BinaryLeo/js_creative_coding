const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = '#00808e'
    context.fillRect(0, 0, width, height)
    context.fillStyle = 'black';
    const x = width * 0.5 //  axis x -  move to center
    const y = height * 0.5 // axis y -  move to center
    const w = width * 0.3 // 30%
    const h = height * 0.3  // 30%
    context.translate(x, y); //remaps the position
    context.beginPath() //Begins a path, or resets the current path
    context.rect(-w * 0.5, -h * 0.5, w, h) //create a rectangle
    context.fill() //Fills the current drawing (path)

  }
};

canvasSketch(sketch, settings);
