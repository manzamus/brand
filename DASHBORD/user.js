
let table=document.querySelector("table")
let users=JSON.parse(localStorage.getItem("users"))  || []
let employee=JSON.parse(localStorage.getItem("employee")) || []
users.forEach((user,index) => {
    table.innerHTML+=`<td>${index+1}</td><td>${user.name}</td><td>${user.email}</td><td>${user.password}</td>`
    table.innerHTML+=`<td>${index+2}</td><td>${user.name}</td><td>${user.email}</td><td>${user.password}</td>`
});