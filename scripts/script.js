var scale, status;
function getRandomArbitary(min, max)
{
    return Math.floor(Math.random() * (max - min)) + min
}

function start(){
    if(window.status!=false){
            location.reload();
    }
    var k = document.getElementById('qustionImg').offsetWidth/46; // коэффициент умножения для постройки кривой по верным координатам по Х
    window.scale=k;
    a=getRandomArbitary(6,9);
    window.status=true;
    maxForB = 14-a;
    minForB = 11-a;
    b=getRandomArbitary(minForB,maxForB);
    document.getElementById("val1").appendChild(document.createTextNode(a));
    document.getElementById("val2").appendChild(document.createTextNode(b));
    drawLine(k,(a+1)*k)
    positionInput("firstValues", a+1)
}
function blockElement(idName){
    document.getElementById(idName).style.border="none";
    document.getElementById(idName).style.color="black"
    document.getElementById(idName).setAttribute("readonly", "readonly");
}
function positionInput(idName, x){
    var elem = document.getElementById(idName).style.cssText=
    " \
    margin-left:"+x+"em; !important \
    text-align: center; \
    opacity: 1; \
    transition: 0.3s; "
}
function drawLine(startPosition/*по Х*/, endPosition/*по Y*/){
    var canvas = document.getElementById("canvasSection");
    var ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'purple';
    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.moveTo(startPosition,100);
    ctx.quadraticCurveTo((endPosition+startPosition)/2,0/*точка для изгиба по Y*/, endPosition, 100);
    ctx.stroke();
    ctx.quadraticCurveTo(endPosition-10,0,endPosition,100);
    drawArrow(endPosition)
}
function drawArrow(drawPositionX){
    var canvas = document.getElementById("canvasSection");
    var ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'purple';
    ctx.beginPath();
    ctx.lineWidth = 1.2;
    ctx.moveTo(drawPositionX,100);
    ctx.quadraticCurveTo(drawPositionX, 100, drawPositionX-7, 96);
    ctx.moveTo(drawPositionX,100);
    ctx.quadraticCurveTo(drawPositionX, 100, drawPositionX-3, 88);
    ctx.stroke();
}
function checkValues(obj){
    var summOfElements = (Number(document.getElementById('val1').innerHTML)+Number(document.getElementById('val2').innerHTML));
    if(obj.id=="firstValues"){
        if(obj.value==document.getElementById('val1').innerHTML){
            document.getElementById('val1').style.cssText="none";
            blockElement(obj.id)
            positionInput("secondValues", b+a-2)
            drawLine((Number(document.getElementById('val1').innerHTML)+1)*window.scale,summOfElements*(1.1*scale));
        }
        else{
            document.getElementById('val1').style.background="orange";
            document.getElementById('firstValues').style.color="red";
        }
    }
    if(obj.id=="secondValues"){
        if(obj.value==document.getElementById('val2').innerHTML){
            document.getElementById('val2').style.cssText="none";
            blockElement(obj.id)
            document.getElementById("summ").innerHTML="<input id='summ' type='text' onchange='checkValues(this)'>";
        }
        else{
            document.getElementById('val2').style.background="orange";
            document.getElementById('secondValues').style.color="red";
        }
    }
    if(obj.id=="summ"){
        if(obj.value==summOfElements){
            document.getElementById(obj.id).lastChild.style.cssText="background:white; color: black; border: none; font-size:16px;";
            blockElement(obj.id)
            alert("Верно!")
        }
        else{
            document.getElementById(obj.id).lastChild.style.cssText="background: orange; color: red;";
        }
    }
}
