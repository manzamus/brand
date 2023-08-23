let Fname=document.getElementById("Fname");
let Lname=document.getElementById("Lname");
let email=document.getElementById("email");
let form=document.querySelector("form")

users=JSON.parse(localStorage.getItem("users"))

form.addEventListener("subscribe",(e)=>{
    e.preventDefault()
    
    let user={
        firstname:Fname.value,
        lastname:Lname.value,
        email:email.value

    };
    // hhh.find(yell)=yell.email==email.value
    users.push(user)
    const nay=JSON.stringify(users)
    localStorage,setITem("users",nay)
    alert("ok")


    // function forgot(){
    //     event.preventDefault();
    
    //     var email = document.getElementById("subscribe").value;
    
    //     if(emailArray.subscribe(email) == -1){
    //         if (email == ""){
    //             alert("Email required.");
    //             return ;
    //         }
    //         alert("Email does not exist.");
    //         return ;
    //     }
    
    //     alert("email is send to your email check it in 24hr. \n Thanks");
    //     document.getElementById("subscribe").value ="";
    // }
})
