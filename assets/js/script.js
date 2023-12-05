const apiKey = "e1c5d15276badf59f1ba923206c682bd";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{
        var data = await response.json();


    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if(data.weather[0].main =="Clouds"){
        weatherIcon.src = "assets/images/clouds.png";
    }
    else if(data.weather[0].main =="Clear"){
        weatherIcon.src = "assets/images/clear.png";
    }
    else if(data.weather[0].main =="Rain"){
        weatherIcon.src = "assets/images/rain.png";
    }
    else if(data.weather[0].main =="Drizzle"){
        weatherIcon.src = "assets/images/drizzle.png";
    }
    else if(data.weather[0].main =="Mist"){
        weatherIcon.src = "assets/images/mist.png";
    }
    else if(data.weather[0].main =="Snow"){
        weatherIcon.src = "assets/images/snow.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    }

    
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
});

// navbar
const toggler = document.querySelector(".hamburger")
const navLinksContainer =document.querySelector(".navlinks-container");

const toggleNav = () => {
    toggler.classList.toggle("open")

    const ariaToggle = toggler.getAttribute("aria-expanded") === "true" ? "false" : "true" ;

    toggler.setAttribute("aria-expanded", ariaToggle)

    navLinksContainer.classList.toggle("open")
}

toggler.addEventListener("click", toggleNav)

// ResizeObserver permet de gérer en js la transition en responsive. Cela évite une saccade en cas de resize à la main qui sera présente en css 
new ResizeObserver(entries => {
    if(entries[0].contentRect.width <=900){
        navLinksContainer.style.transition = "transform 0.3s ease-out"
    } else {
        navLinksContainer.style.transition = "none"
    }
}).observe(document.body)