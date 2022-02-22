const canvasSketch = require('canvas-sketch');
const settings={
    dimensions:[1080,1080]
};
const sketch =()=>{
    return({context,width,height})=>{
        context.fillStyle='#fff';
        context.fillRect(0,0,width,height);
        context.fillStyle='#000';
        context.font = '1200px serif';
        context.textBaseline = 'middle';
        context.textAlign = 'center';
        context.translate(width * 0.5,height * 0.5);
       
        context.fillText('A',0,0);
    };
};
canvasSketch(sketch,settings);