const canvasSketch = require('canvas-sketch');
const settings={
    dimensions:[1080,1080],
    animation: true
};
let manager;
let text ='A';
let fontSize = 1200;
let fontFamily = 'serif';

const sketch =()=>{
    return({context,width,height})=>{
        context.fillStyle='#fff';
        context.fillRect(0,0,width,height);
        context.fillStyle='#000';
        context.font =`${fontSize}px ${fontFamily}`;
        context.textBaseline = 'top';
        //context.textAlign = 'center';
        
        const metrics = context.measureText(text);
        const mx = metrics.actualBoundingBoxLeft * -1;
        const my = metrics.actualBoundingBoxAscent * -1;
        const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
        const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

        const x = (width - mw) * 0.5 - mx;
        const y = (height - mh)* 0.5 - my;
        console.log(metrics); // returns the metrics of the text
        context.save();
        context.translate(x,y);
        context.beginPath();
        context.rect(mx,my,mw,mh);
        context.stroke();
      
        //context.translate(width * 0.5,height * 0.5); //translate to center
        context.fillText(text,0,0);
        context.restore();
    };
};
const onKeyUp = (e) => {
    text = e.key.toUpperCase(); // Just update if animate is true
    manager.render();
}
document.addEventListener('keyup', onKeyUp);
const start = async () => {
 manager = await canvasSketch(sketch,settings);
}
start();