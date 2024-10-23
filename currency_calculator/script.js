const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn =document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
const excbtn=document.querySelector("#exchangeButton");



window.addEventListener("load",()=>
{
    updateExchangeRate();
})
let i=0;
for(let select of dropdowns)
{
    for (currCode in countryList)
        {
             let newoption =document.createElement("option");
             newoption.innerText=currCode ;
             newoption.value=currCode;
           
             if(select.name==="from" && currCode==="USD")
             {
                newoption.selected="selected";
             }
             else if(select.name==="to" && currCode==="INR")
             {
                newoption.selected="selected";
             }
             select.append(newoption);
        }
            select.addEventListener("change",(evt)=>{
                updateFlag(evt.target);
            });
        
}
excbtn.addEventListener("click",()=>
    {
        const a=fromCurr.value;
        const b=toCurr.value; 
        fromCurr.value=b;
        toCurr.value=a;
        updateFlag(fromCurr);
        updateFlag(toCurr);
        updateExchangeRate();

    })

const updateFlag = (element)=>
{
    let currCode=element.value;

    let countryCode=countryList[currCode];
    let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img  =  element.parentElement.querySelector("img");
    img.src=newsrc;
}

btn.addEventListener("click",  (evt)=>
{
    evt.preventDefault();
    updateExchangeRate();
    

}
);
const updateExchangeRate= async()=>
       {
        let amount = document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal===""||amtVal<1)
    {
        amtVal=1;
        amount.value=1;
    }
    const URl = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(URl);
    let data=await response.json();
    let fromrate=fromCurr.value.toLowerCase();
    let torate=toCurr.value.toLowerCase();
    let rate=data[fromrate];
    let newrate=rate[torate];
    let FinalAmount=amtVal*newrate;
    msg.innerText = `${amtVal} ${fromCurr.value}=${FinalAmount} ${toCurr.value}`
       }