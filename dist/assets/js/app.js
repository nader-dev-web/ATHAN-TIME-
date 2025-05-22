const home=document.getElementById("home");
const infoBtn=document.querySelector("button[type='submit']");
const inputNbr=document.querySelector("form input[type='number']");
let x;
let inputFld=document.querySelectorAll("form input:not([type='number'])");
let usersDiv=document.getElementById("users");
let empty=document.getElementById("empty");

empty.addEventListener("click",(e)=>{
    e.preventDefault();
    usersDiv.innerHTML="";
})

// function to set the random background 

function randomBg() {
const imgarray=["assets/img/rain.jpg","assets/img/rain.jpg","assets/img/snow.jpg","assets/img/sun.jpg"];
let random=Math.floor(Math.random()*imgarray.length);
home.style.backgroundImage=`url(${imgarray[random]})`;
};

setInterval(() => {
    randomBg();
}, 5000);

// end of the function 


    let valuess=[];
    let attrbuts=[];
    infoBtn.addEventListener("click", async (e)=>{
    e.preventDefault();
    inputFld.forEach((field)=>{
    if(field.checked){
    attrbuts.push(field.dataset.name);
    
    valuess.push(field.value);
    }
    x=inputNbr.value;

    });
      // the action i want it to wait for the fetch 
      try {
        // Wait for the fetch to complete
        if(valuess.length!=0){

            await FETCH(); 
            
            // These will only execute after FETCH completes
            clear();
            valuess = [];
            attrbuts=[];
        }
        } catch (error) {
            console.error("Fetch failed:", error);
            
    };


});
// show the data 
function FETCH(params) {

    // the promise is the object returned in bottom it's obligatory for using then async 

  return fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => {
      for (let j = 0; j < x ; j++) {
          let user=document.createElement("div");
        for (let i = 0; i < valuess.length; i++) {
            let data=document.createElement("div");
            if (valuess[i] == "city") {

data.innerHTML=`${attrbuts[i]}: ${json[j].address.city}`;
            }else{
                data.innerHTML=`${attrbuts[i]}: ${json[j][valuess[i]]}`;
            }
user.appendChild(data);
        }
        usersDiv.appendChild(user);
      }
      return json; // Optional: return the data for further processing
    });
}


    
// function clear(params) {
function clear(params) {
    
    inputFld.forEach((field)=>{
        if(field.checked){
            field.checked = false
        }
    })
inputNbr.value=1;
}
// });

// clear();



