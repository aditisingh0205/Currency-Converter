const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

const updateFlag = (element)=>{
const currCode = element.value;
const countryCode = countryList[currCode];
const img = element.parentElement.querySelector("img");
img.src = `https://flagsapi.com/${countryCode}/flat/32.png`;
}

for(let select of dropdowns){
    for(let currCode in countryList){
        let option = document.createElement("option");
        option.value = currCode;
        option.innerText = currCode;

           if(select === fromCurr && currCode === "USD"){
            option.selected = true;
           }
           if(select === toCurr && currCode === "INR"){
            option.selected = true;
           }
        select.append(option);

        
    }
    updateFlag(select);
     select.addEventListener("change", (e) => {
        updateFlag(e.target);
    });
}

btn.addEventListener("click", async (e)=>{
e.preventDefault();

let amount = document.querySelector(".amount input");
let amtVal = amount.value;

if(amtVal==="" || isNaN(amtVal) || amtVal<=0){
    msg.innerText = "Please enter a valid amount."
    return;
}

const URL = `https://api.exchangerate-api.com/v4/latest/${fromCurr.value}`;

try {
   const res = await fetch(URL);
   const data = await res.json()
   const rate = data.rates[toCurr.value];
   const finalAmt = (amtVal * rate).toFixed(2);
   msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
 
} catch (error) {
    msg.innerText = "Something went wrong. Please try again later";
}
});