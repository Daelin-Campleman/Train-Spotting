(async () => {
    let response = await fetch("/userInfo");
    let data = await response.json();
    
    document.getElementById("userName").textContent = data.name;
    document.getElementById("userPicture").src = data.image;
})()

document.getElementById("theme").addEventListener("click", function(e){
    if(e.currentTarget.textContent.includes("Dark")){
        e.currentTarget.innerHTML = `<i class="fa-solid fa-sun"></i> Light Mode`;
        document.getElementsByTagName("html")[0].classList.add("dark");
        localStorage.setItem("theme", "dark");
    } else {
        e.currentTarget.innerHTML = `<i class="fa-solid fa-moon"></i> Dark Mode`;
        document.getElementsByTagName("html")[0].classList.remove("dark");
        localStorage.setItem("theme", "light");
    }
});

// check if theme localStorage is set
if (localStorage.getItem("theme") != null && localStorage.getItem("theme") == "dark") {
    document.getElementById("theme").innerHTML = `<i class="fa-solid fa-sun"></i> Light Mode`;
    document.getElementsByTagName("html")[0].classList.add("dark");
} else if(localStorage.getItem("theme") != null && localStorage.getItem("theme") == "light"){
    document.getElementById("theme").innerHTML = `<i class="fa-solid fa-moon"></i> Dark Mode`;
    document.getElementsByTagName("html")[0].classList.remove("dark");
} else if(localStorage.getItem("theme") == null){
    localStorage.setItem("theme", "light");
}