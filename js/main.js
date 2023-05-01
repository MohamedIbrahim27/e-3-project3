let landing=document.querySelector('.landing-page')
let imgarry=['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg']

let backgroundoption =true;
let backgroundinterval;

document.querySelector('.ico-setting .set-icon').onclick = function(){
    document.querySelector('.settings-box').classList.toggle('open')
}

let maincolor=localStorage.getItem("color_option");
if (maincolor !==null){
    document.documentElement.style.setProperty('--five-color',localStorage.getItem("color_option"))
    document.querySelectorAll('.color-list li').forEach(element => {
        element.classList.remove('active');
    if(element.dataset.color===maincolor){
        element.classList.add('active')
    }
    });

}

const colorLi= document.querySelectorAll('.color-list li')
colorLi.forEach(li=>{
    li.addEventListener('click',(e)=>{
        document.documentElement.style.setProperty('--five-color',e.target.dataset.color);
        localStorage.setItem('color_option',e.target.dataset.color);
        handelactive(e);
        // document.querySelector('.color-list li').classList.add('active')
    });
});

let backgroundlocalitem=localStorage.getItem('background-option');
if (backgroundlocalitem!==null){
    if(backgroundlocalitem==='true'){
        backgroundoption=true;
    }else{
        backgroundoption=false;
    }
    document.querySelectorAll('.random-background span').forEach(element=>{
        element.classList.remove('active');
    });
    if(backgroundlocalitem==='true'){
        document.querySelector('.random-background .yes').classList.add('active')
    }else{
        document.querySelector('.random-background .no').classList.add('active')
    }
}

function randomimg(){
    if (backgroundoption===true){
        backgroundinterval= setInterval(()=>{
            let random=Math.floor(Math.random()*imgarry.length);
            landing.style.backgroundImage= 'url("img/'+ imgarry[random]+'")';
        },1000);
    }
}
randomimg();

const randombackground= document.querySelectorAll('.random-background span')
randombackground.forEach(span=>{
    span.addEventListener('click',(e)=>{
        handelactive(e);
        if(e.target.dataset.background==='yes'){
            backgroundoption=true;
            randomimg();
            localStorage.setItem('background-option',true)
        } else{
            backgroundoption=false;
            clearInterval(backgroundinterval);
            localStorage.setItem('background-option',false)
        }
    });
});


let skills =document.querySelector('.skills') 
window.onscroll=function(){
    let skillofsettop =skills.offsetTop;
    let skillsouterheight=skills.offsetHeight;
    let windowheight=this.innerHeight
    let windowscroolTop=this.pageYOffset
    
    if (windowscroolTop>(skillofsettop + skillsouterheight - windowheight )){
        let allskills= document.querySelectorAll('.skill-box .skill-progress span')
        allskills.forEach(skill=>{
            skill.style.width=skill.dataset.progress
        })
    }
}

let gallery =document.querySelectorAll('.gallery img')
gallery.forEach(img=>{
    img.addEventListener('click',(e)=>{
        let overlay=document.createElement('div');
        overlay.className='popup-overlay';
        document.body.appendChild(overlay);

        let popupbox=document.createElement('div');
        popupbox.className='popup-box';
        if(img.alt !== null){
            let imgheading=document.createElement('h3');
            let imgtext=document.createTextNode(img.alt);
            imgheading.appendChild(imgtext);
            popupbox.appendChild(imgheading);
        }
        let popupimg=document.createElement('img');
        popupimg.src=img.src;
        popupbox.appendChild(popupimg);
        document.body.appendChild(popupbox);
        
        let closebutton=document.createElement('span');
        let closebuttontext = document.createTextNode('X');
        closebutton.appendChild(closebuttontext);
        closebutton.className='closebutton'
        popupbox.appendChild(closebutton);
        
    })
})
document.addEventListener('click',function(e){
    if(e.target.className == 'closebutton'){
        e.target.parentNode.remove();
        document.querySelector('.popup-overlay').remove();
    }
})


let scrooldown =document.querySelectorAll('.scrool-option span');
let scrolcontainer =document.querySelector('.scrool-down')

let scrooldownlocal =localStorage.getItem('scrool-option')

if(scrooldownlocal !== null){
    scrooldown.forEach(span=>{
        span.classList.remove('active');
    });

    if(scrooldownlocal === 'flex'){
        scrolcontainer.style.display='flex';

        document.querySelector('.scrool-option .yes').classList.add('active');
    }else{
        scrolcontainer.style.display='none';

        document.querySelector('.scrool-option .no').classList.add('active');
    }
    
}

scrooldown.forEach(span=>{
    span.addEventListener('click',(e)=>{
        if(span.dataset.display==='show'){
            scrolcontainer.style.display='flex';
            localStorage.setItem('scrool-option','flex')
        }else{
            scrolcontainer.style.display='none';
            localStorage.setItem('scrool-option','none')
        }
        handelactive(e);
    });
});



function handelactive(event){
    event.target.parentElement.querySelectorAll('.active').forEach(element => {
        element.classList.remove('active');
    });
    event.target.classList.add('active')
}


document.querySelector('.reset-setting').onclick=function(){
    // localStorage.clear();
    localStorage.removeItem('color_option')
    localStorage.removeItem('background-option')
    localStorage.removeItem('scrool-option')
    
    window.location.reload();
}

let togel =document.querySelector('.toggle-menu');
let links=document.querySelector('.links');
togel.onclick=function(e){
    e.stopPropagation();
    this.classList.toggle('menuactive');
    links.classList.toggle('open');
}

document.addEventListener('click',(e)=>{
    if (e.target!== togel && e.target !==links){
        if(links.classList.contains('open')){
            togel.classList.toggle('menuactive');
            links.classList.toggle('open');
        }
    }
})

links.onclick=function(e){
    e.stopPropagation();
}
