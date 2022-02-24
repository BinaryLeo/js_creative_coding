const canvasSketch = require('canvas-sketch');
const settings={
    dimensions:[1080,1080],
    animation: true
};
let manager;
let text ='A';
let fontSize = 1200;
let fontFamily = 'serif';
const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');
const sketch =({context,width,height})=>{
    const cell = 20; // cell size
    const cols = Math.floor(width/cell);
    const rows = Math.floor(height/cell);
    const numCells = cols * rows;
    
    typeCanvas.width = cols;
    typeCanvas.height = rows;

    return({context,width,height})=>{
       
        typeContext.fillStyle='#000';//background
        typeContext.fillRect(0,0,cols,rows);
        fontSize = cols;
        typeContext.fillStyle='#fff';// color
        typeContext.font =`${fontSize}px ${fontFamily}`;
        typeContext.textBaseline = 'top';

        
        const metrics = typeContext.measureText(text);
        const mx = metrics.actualBoundingBoxLeft * -1;
        const my = metrics.actualBoundingBoxAscent * -1;
        const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
        const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

        const tx = (cols - mw) * 0.5 - mx;
        const ty = (rows - mh)* 0.5 - my;

        
        console.log(metrics); // returns the metrics of the text
        typeContext.save();
        typeContext.translate(tx,ty);
        typeContext.beginPath();
        typeContext.rect(mx,my,mw,mh);
        typeContext.stroke();
      
        typeContext.fillText(text,0,0);
        typeContext.restore();
        const typeData = typeContext.getImageData(0,0,cols,rows).data;

        context.drawImage(typeCanvas,0,0);
        for(let i = 0;i < numCells;i++){
            const col = i % cols;
            const row = Math.floor(i / cols);
            const x = col * cell;
            const y = row * cell;

            // ----------------------- the pixelated version of big type
            const r = typeData[i * 4 + 0];//Red color
            const g = typeData[i * 4 + 1];//Green color
            const b = typeData[i * 4 + 2];//Blue color
            const a = typeData[i * 4 + 3]; // alpha channel 
            context.fillStyle = `rgb(${r},${g},${b},${a})`; // compose the string

            context.save();
            context.translate(x,y);
            context.fillRect(0,0,cell,cell);
         
            /* option: Circle instead of rectangle
            context.beginPath();
            context.arc(0,0,cell,0,Math.PI * 2);
            context.fill();

            or

            context.beginPath();
           context.arc(cell * 0.5,cell * 0.5,cell * 0.5,0,Math.PI * 2);
           context.fill();

            */
            context.restore();    
        }
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