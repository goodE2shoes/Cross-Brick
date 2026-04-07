const layout=["GEM#CHUB#BETA","..........","..........","..........","..........","..........","..........","..........","..........",".........."];
const solution=layout.join("").split("");
const bricks=["GEM","CHUB","BETA","IEF","TR","ISE","SW","ROFF"];
let selected=null;

function createBoard(){
const b=document.getElementById("board");
layout.forEach(r=>{
r.split("").forEach(c=>{
if(c=="#"){let d=document.createElement("div");d.className="cell block";b.appendChild(d);}
else{let i=document.createElement("input");i.maxLength=1;i.className="cell";b.appendChild(i);}
});
});
}

function createBricks(){
const c=document.getElementById("bricks");
bricks.forEach(b=>{
let d=document.createElement("div");
d.className="brick";
d.innerText=b;
d.onclick=()=>selected=b;
c.appendChild(d);
});
}

document.addEventListener("click",e=>{
if(e.target.classList.contains("cell")&&selected){
let cells=[...document.querySelectorAll(".cell:not(.block)")];
let idx=cells.indexOf(e.target);
for(let i=0;i<selected.length;i++){
if(cells[idx+i])cells[idx+i].value=selected[i];
}
}
});

function check(){
let cells=document.querySelectorAll(".cell:not(.block)");
let i=0;
cells.forEach(c=>{
if(c.value.toUpperCase()==solution.filter(s=>s!="#")[i])c.style.background="#8f8";
else c.style.background="#f88";
i++;
});
}

createBoard();
createBricks();
