const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const degToRad = (degrees) => {
  return (degrees / 180) * Math.PI
}
const randomRange = (min, max) => {
  return Math.random() * (max - min) + min;
}
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
      const slice = degToRad(360 / num)
      const angle = slice * i    
      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);
      context.save()
      context.translate(x, y)
      context.rotate(-angle)
      context.scale(randomRange(1,3), 1);
      context.beginPath()
      context.rect(-w / 2, -h / 2, w, h)
      context.fill()
      context.restore()
    }
  }
}

canvasSketch(sketch, settings);
