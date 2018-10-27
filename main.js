const box = document.querySelector('.box');
const span = document.querySelector('#direction');
let isDragging = false;
let x;
let draggingElement;
let isTriggerMatch = false;
let isTriggerNope = false;

document.addEventListener("mousedown", (e) => {
    draggingElement = null;
    if(e.target.className === 'box') startDrag(e)
})
document.addEventListener("mouseup", endDrag)
document.addEventListener('mousemove', moveDrag)

function startDrag(e){
    draggingElement = e.target;
    isDragging = true;
    x = e.clientX;
    y = e.clientY;
}

function endDrag(e){
    isDragging = false;

    if(e.clientX - x > 100){
        span.innerHTML = "right";
        draggingElement.style.transitionDuration = '700ms'
        draggingElement.style.transform = `translateX(${window.innerWidth}px)`;
    }
    else if(e.clientX - x < -100){
        span.innerHTML = "left";
        draggingElement.style.transitionDuration = '700ms'
        draggingElement.style.transform = `translateX(-${window.innerWidth}px)`;
    }
    else{
        draggingElement.style.transform = "translateX(0)";
    }

    untriggerIgnore();
    untriggerMatch();
}
function moveDrag(e){
    if(!isDragging) return;

    let moveX = e.clientX - x;
    let moveY = e.clientY - y;
    draggingElement.style.transform = `translateX(${moveX}px)`;
    draggingElement.style.transform += `translateY(${moveY}px)`;
    
    if(moveX > 0){
        draggingElement.style.transform += `rotate(15deg)`;
    }
    if(moveX < 0){
        draggingElement.style.transform += `rotate(-15deg)`;        
    }
    if(e.clientX - x  > 100){
        triggerMatch();
    }
    else{
        untriggerMatch();
    }
    if(e.clientX - x  < -100){
        triggerIgnore();
    }
    else{
        untriggerIgnore();
    }
}

function triggerMatch(){
    draggingElement.querySelector(".like").style.display = 'inline-block';
    setTimeout(() => draggingElement.querySelector(".like").style.opacity = '1', 100)
}

function untriggerMatch(){
    draggingElement.querySelector(".like").style.opacity = '0';
    setTimeout(() => draggingElement.querySelector(".like").style.display = 'none', 500);
}
function triggerIgnore(){
    draggingElement.querySelector(".nope").style.display = 'inline-block';
    setTimeout(() => draggingElement.querySelector(".nope").style.opacity = '1', 10)
}
function untriggerIgnore(){
    draggingElement.querySelector(".nope").style.opacity = '0';
    setTimeout(() => draggingElement.querySelector(".nope").style.display = 'none', 500)
}