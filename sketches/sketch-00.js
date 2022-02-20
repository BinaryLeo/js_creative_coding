let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
context.fillStyle = '#05d4d4';
context.fillRect(100,100,400,400); //** */ --> 100 (Right) ↓ (Down) 100 start drawing 400 -> (Right) ↓ 400 (Down)
context.lineWidth =4;
context.beginPath();
context.rect(100,100,400,400);
context.stroke();

//**Circle
context.fillStyle = '#fff';
context.lineWidth =10; //** */ border
context.beginPath();
context.arc(300,300,100,0,Math.PI * 2);//** */ starting angle of 0 and the ending angle of 2 * Math.PI
context.stroke();//** */ apply the stroke and fill
context.fill();
