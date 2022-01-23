const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)
    context.fillStyle = 'black'
    const cx = width * 0.5 //  axis x -  move to center
    const cy = height * 0.5 //  axis y -  move to center
    const w = width * 0.01
    const h = height * 0.1
    let x,y;
    const num = 12
    const radius = width * 0.3;
    for (i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num)
      const angle = slice * i    
      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);
      context.save()
      context.translate(x, y)
      context.rotate(-angle)
      context.scale(random.range(1,3), 1);  // with random values in X we have some strokes most thin
      //Scale takes two parameters (x and y), default value is 1. 
      context.beginPath()
      context.rect(-w * 0.5, -h * 0.5, w, h)
      context.fill()
      context.restore()

      context.save();
      context.translate(cx,cy);
      context.rotate(-angle);
      
      context.lineWidth  = 20;
      context.beginPath();
      context.arc(0,0, radius, slice * -0.3 , slice * 0.6);
      context.stroke();

      context.restore()
    }
  }
}

canvasSketch(sketch, settings);
