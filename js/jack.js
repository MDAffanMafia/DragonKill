/*this project is a game developed in pure js
Developer:MD Affan MD Habibuddin
Lines of code:
*/ 
const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
//loadind images
//declaring image referencers
//for me player
  let imageMeL=[];
  let imageMeR=[];
  let imageMeU=[];
  let imageMeD=[];
  //for the metroit
  let imageMFire=[];
  //for enemys
  let imageRedS=[];
  let imageBooT=[];
  let imageMeto=[];
  //reference helpers
  let counter=1;
  let redCount=0;
  let booCount=0;
  let metoCount=0;
  let fCount=0;
  let SpCount=0;
  let score=0;
  var imageMe=new Image;
  function load(url){
    return new Promise(r=>{let i=new Image();i.onload=(()=>r(i)); i.src=url;});
}
  async function loadImage(){
       //player images
       try {
       imageMeL[0]=await load("img/tile004.png");
       imageMeL[1]=await load("img/tile005.png");
       imageMeL[2]=await load("img/tile006.png");
       imageMeL[3]=await load("img/tile007.png");
       imageMeR[0]=await load("img/tile008.png");
       imageMeR[1]=await load("img/tile009.png");
       imageMeR[2]=await load("img/tile010.png");
       imageMeR[3]=await  load("img/tile011.png");
       imageMeD[0]=await load("img/tile000.png");
       imageMeD[1]=await load("img/tile001.png");
       imageMeD[2]=await load("img/tile002.png");
       imageMeD[3]=await load("img/tile003.png");
       imageMeU[0]=await load("img/tile012.png");
       imageMeU[1]=await load("img/tile013.png");
       imageMeU[2]=await load ("img/tile014.png");
       imageMeU[3]=await load("img/tile015.png");
       //enemy 1 image
       imageRedS[0]=await load("img/red005.png");
       imageRedS[1]=await load("img/red006.png");
       imageRedS[2]=await load("img/red007.png");
       imageRedS[3]=await load("img/red008.png");
       //enemy 2 image
      imageBooT[0]=await load("img/boo1.png");
      imageBooT[1]=await load("img/boo2.png");
      imageBooT[2]=await load("img/boo3.png");
      imageBooT[3]=await load("img/boo4.png");
      //enymy 3 image
      imageMeto[0]=await load ("img/meto001.png");
      imageMeto[1]=await load("img/meto002.png");
      imageMeto[2]=await load("img/meto003.png");
      imageMeto[3]=await load("img/meto004.png");
      //loading the fire
      imageMFire[0]=await load("img/fire001.png");
      imageMFire[1]=await load("img/fire002.png");
      imageMFire[2]=await load("img/fire003.png");
      imageMFire[3]=await load("img/fire004.png");
    }catch(err){
        document.write("failed to exe");
    }
       
   }
const affanActions =['right','up'];
const affans=[];
let Keys=[];
//paramters for the modules
//for the player
me={
mwidth:96,
mheight:96,
meX:100,
meY:500,
mspeed:10,
}
var rightPressed = false;
var leftPressed = false;
var upPressed=false;
var downPressed=false;
var spacePressed=false;
var next=false;
moving=false;
//for enemy 1 
 affan={
        width:32,
        height:48,
        stdFrameX:3,
        stdX:800,
        stdY:Math.random()*canvas.height,
        speed:(Math.random()*2.4)+3.5, 
        action:'right',
    }
    //for enemy 2
    booT={
        width:50,
        height:48,
        BoX:200,
        BoY:Math.random()*canvas.height,
        speed:(Math.random()*2.6)+3.7,
    }
    //for enemy 3
    metO={
        width:32,
        height:48,
        mtX:500,
        mtY:Math.random()*canvas.height,
        speed:(Math.random()*2.3)+3.9,
    }
    fire={
        width:64,
        height:128,
        fX:200,
        fY:200,
        speed:15,
    }
    //drawing different modules
    //for enemy1
  function  draw1(){
        if(redCount==3){
            redCount=0;
        }
        imageEnemy1=imageRedS[redCount];
        ctx.drawImage(imageEnemy1,affan.stdX,affan.stdY,affan.width,affan.height);
        
        ctx.shadowColor="#000000";
        ctx.fillRect(affan.stdX+50,affan.stdY+38,15,10);
        redCount+=1;
}
//for enemy2
  function draw2(){
    if(booCount==3){
        booCount=0;
    }
    imageEnemy2=imageBooT[booCount];
    ctx.drawImage(imageEnemy2,booT.BoX,booT.BoY,booT.width,booT.height);
    ctx.shadowColor="#000000";
    ctx.fillRect(booT.BoX+50,booT.BoY+50,15,10);
    booCount+=1;
  }
  //for enemy3
  function draw3(){
      if(metoCount==3){
          metoCount=0;
      }
      imageEnemy3=imageMeto[metoCount];
      ctx.drawImage(imageEnemy3,metO.mtX,metO.mtY,metO.width,metO.height);
      ctx.shadowColor="#000000";
    ctx.fillRect(metO.mtX+40,metO.mtY+50,15,10);
      metoCount+=1;
  }
  //for the fire
    function drawF(){
        if(fCount==3){
            fCount=0;
        }
        imageAttack=imageMFire[fCount];
        ctx.drawImage(imageAttack,fire.fX,fire.fY,fire.width,fire.height);
        fCount+=1;
    }
   //the update functiion
function update(){
    //updating the first enemy 
    if(Math.abs((affan.stdX+30)-me.meX)<me.mwidth && Math.abs(affan.stdY-me.meY)<me.mheight ||Math.abs((affan.stdX+30)-fire.fX)<fire.width && Math.abs(affan.stdY-fire.fY)<fire.height)
    {
        score+=1;
        spacePressed=false;
        SpCount=0;
        fire.fX=-10;
        fire.fY=-10;
        affan.stdX=window.innerWidth-affan.width;
        affan.stdY=Math.random()*canvas.height-affan.height;
        console.log(score);
    }
    else{
    if(affan.action==='right'){
     if (affan.stdX > 0)
    {
             
        affan.stdX-=affan.speed;
        
    }
    else {
        affan.stdX=canvas.width-affan.width;
        affan.stdY=Math.random()*canvas.height-affan.height;
        }
        }
    }
    //updating the second enemy
    if(Math.abs((booT.BoX+30)-me.meX)<me.mwidth && Math.abs(booT.BoY-me.meY)<me.mheight ||Math.abs((booT.BoX+30)-fire.fX)<fire.width && Math.abs(booT.BoY-fire.fY)<fire.height)
          {
             score+=1;
             spacePressed=false;
             SpCount=0;
             fire.fX=-10;
             fire.fY=-10;
             booT.BoX=canvas.width-booT.width;
             booT.BoY=Math.random()*canvas.height-booT.height;
            console.log(score);
          }
        else{
            if(booT.BoX>0)
     {
         booT.BoX-=booT.speed;
     }
     else{
         booT.BoX=canvas.width-booT.width;
         booT.BoY=Math.random()*canvas.height-booT.height;
     
        }
    }
    //updating the third enemy
    if(Math.abs((metO.mtX+30)-me.meX)<me.mwidth && Math.abs(metO.mtY-me.meY)<me.mheight ||Math.abs((metO.mtX+30)-fire.fX)<fire.width && Math.abs(metO.mtY-fire.fY)<fire.height)
    {
        score+=1;
        spacePressed=false;
        SpCount=0;
        fire.fX=-10;
        fire.fY=-10;
        metO.mtX=canvas.width-metO.width;
        metO.mtY= Math.random()*canvas.height-metO.height;
        console.log(score);
    }
    else{
        if(metO.mtX>0)
     {
         metO.mtX-=metO.speed;
     }
     else{
        metO.mtX=canvas.width-metO.width;
        metO.mtY=Math.random()*canvas.height-metO.height;
        }
        
    }

    
}
//the draw function
function medraw(){
          ctx.drawImage(imageMe,me.meX,me.meY,me.mwidth,me.mheight);
   }
   //moving the character
   function moveMe(){
      if(rightPressed){
          SpCount=1;
          if(counter==3)
          {
              counter=0;
          }
          else{
              imageMe=  imageMeR[counter];
            counter=counter+1;
            me.meX+=me.mspeed;
          }
         console.log(21);
      }
     if(leftPressed){
         SpCount=2;
          if(counter==3)
          {
              counter=0;
          }
          else{
            imageMe= imageMeL[counter];
            counter=counter+1;
         me.meX-=me.mspeed;
          }
         console.log(31);
     } 
     if(upPressed){
        SpCount=3;
    if(counter==3)
    {
        counter=0;
    }
    else{
        imageMe= imageMeU[counter];
        counter=counter+1;
        me.meY-=me.mspeed;
    }
        console.log(41);
    } 
    if(downPressed){
       SpCount=4;
          if(counter==3)
          {
              counter=0;
          }
          else{
            imageMe= imageMeD[counter];
            counter=counter+1;
            me.meY+=me.mspeed;
          }
        
        console.log(51);
    } 
    if(spacePressed){
        
        if(SpCount==1){
            if(fire.fX<1000){
           fire.fX+=fire.speed;
           drawF();
            }
            else{
             SpCount=0;
              spacePressed=false;
            }
        
        }
       else if(SpCount==2){
           
            if(fire.fX>0){
               
                fire.fX-=fire.speed;
                drawF();
                 }
                 else{
                  SpCount=0;
                  spacePressed=false;
                 }
      }
     else if(SpCount==3){
       
        if(fire.fY>0){
           
            fire.fY-=fire.speed;
            drawF();
             }
             else{
              SpCount=0;
              spacePressed=false;
             }
      }
      else if(SpCount==4){
        
        if(fire.fY<1000){
            fire.fY+=fire.speed;
            drawF();
             }
             else{
              SpCount=0;
              spacePressed=false;
             }
        }
        console.log(8888);
    }
}
//the click fire function
function attack()
{
   
       
 

  }

/*for(i=0;i<10;i++){
affans.push(new affan());
}*/
//calling the load images function
loadImage();
//drawing the sprite function
function drawSprite(img,sX,sY,sW,sH,dX,dY,dW,dH){
      ctx.drawImage(img,sX,sY,sW,sH,dX,dY,dW,dH);
}
//the first function of enemy functions
function animation1(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
   //the function called
       draw1();
       draw2();
       draw3();
       update();
}

//the second function of  player functions
function animation2(){
    medraw();
   moveMe();
  
  
}

//the main function containing the animation Loop
function animationLoop(){
   animation1();
    animation2();
}
//the game Loop
window.onload=setInterval(animationLoop,1000/30);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }
    else if(e.key == "Right" || e.key =="ArrowRight"){
         rightPressed =true;   
    }
    else if(e.keyCode ==32 ){
        spacePressed=true;
        fire.fX=me.meX;
        fire.fY=me.meY;
   }
    else if(e.key == "Left" || e.key =="ArrowLeft"){
        leftPressed =true;   
   }
  
}

function keyUpHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }
    else if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
   /* else if(e.keyCode ==32){
        spacePressed=false;
    }*/
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed =false; 
    }
   
    
}
window.addEventListener('resize',function(){
    canvas.height=window.innerHeight;
    canvas.width=window.innerWidth;
})