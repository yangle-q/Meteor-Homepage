//Meteor Homepage
//Copyright (C) 2026 Yangle
//
//This program is free software: you can redistribute it and/or modify
//it under the terms of the GNU Affero General Public License as published by
//the Free Software Foundation, either version 3 of the License, or
//(at your option) any later version.
//
//This program is distributed in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//GNU Affero General Public License for more details.
//
//You should have received a copy of the GNU Affero General Public License
//along with this program.  If not, see https://www.gnu.org/licenses/.

// General Functions

function ViewTransition (updateDOM) {
    if (!document.startViewTransition) {
        updateDOM()
        return;
    };
    document.body.classList.add("disable-transition")
    const transition = document.startViewTransition(() => {
        updateDOM();
    });
    transition.finished.finally(() => {
        document.body.classList.remove("disable-transition");
    });
}

// Change Dark/Light Mode

const html = document.documentElement
const themeToggle = document.querySelectorAll("#theme-toggle, #theme-toggle-mobile");
const buttonIcon = document.querySelectorAll("#theme-toggle i, #theme-toggle-mobile i");

function toggleIconLight (){
    buttonIcon.forEach(icon => {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun")})
};

function toggleIconDark (){
    buttonIcon.forEach(icon => {
    icon.classList.add("fa-moon");
    icon.classList.remove("fa-sun")})
};

themeToggle.forEach(button => {
    button.addEventListener('click', function() {
        ViewTransition (() => {
        const isDark = html.classList.contains("dark-mode")
            if (isDark) {
                localStorage.setItem("theme", "light");
                html.classList.remove("dark-mode");
                toggleIconLight ()

            } else {
                localStorage.setItem("theme", "dark");
                html.classList.add("dark-mode");       
                toggleIconDark ()
            };
        });
    })
});

if (localStorage.getItem("theme") === "dark"){
    html.classList.add("dark-mode");
    toggleIconDark ()

    } else if (localStorage.getItem("theme") === "light") {
        html.classList.remove("dark-mode");
        toggleIconLight ()
    
    } else if (localStorage.getItem("theme") === null) {
    const isDark = html.classList.contains("dark-mode");
        if (isDark){
            toggleIconDark ()
            localStorage.setItem("theme", "dark");
        } else {
            toggleIconLight ();
            localStorage.setItem("theme", "light");
        }}

// Click to Show Mobile Navigation Bar 

const navMobileContent = document.getElementById('nav-mobile-content');
const faBars = document.querySelector('.fa-bars')
function showNavBar() {
    navMobileContent.style.display = 'block';
    navMobileContent.style.animation = 'nav-content-show 0.11s ease-out both';
}

function hideNavBar() {
    navMobileContent.style.animation = 'nav-content-hide 0.11s ease-in forwards';

    navMobileContent.addEventListener('animationend', function handler() {
        navMobileContent.style.display = 'none';
        navMobileContent.removeEventListener('animationend', handler);
    });
}

if (faBars && navMobileContent) {
    faBars.addEventListener('click', function(e) {
        e.stopPropagation();
        if (navMobileContent.style.display === 'block') {
            hideNavBar(); }
        else {
            showNavBar(); }
    });


    document.body.addEventListener('click', function() {
        if (navMobileContent.style.display === 'block') {
            hideNavBar() ; }
        
    });
}

// Age Calculate

function calculateAge () {
    const infoPage = document.getElementById('info-main')
    if (!infoPage) return;
    const birthday = new Date(2010, 7 ,7)
    const now = new Date()
    let age = now.getFullYear() - birthday.getFullYear()
    const birthdayHasPassed =
        now.getMonth() > birthday.getMonth() ||
        (now.getMonth() === birthday.getMonth() &&
         now.getDate() >= birthday.getDate());
    if (!birthdayHasPassed) {
        age--;
    }
    document.getElementById('age').textContent = 'Age : ' + age;
}

// Page Restoration After Resizing

const shortViewportQuery = window.matchMedia('(max-height: 630px)');
const mobileViewportQuery = window.matchMedia('(pointer: coarse) and (hover: none) and (max-width: 750px)');
let wasShortViewport = shortViewportQuery.matches;

window.addEventListener('resize', function() {
    const isShortViewport = shortViewportQuery.matches;

    if (wasShortViewport && !isShortViewport && !mobileViewportQuery.matches) {
        window.scrollTo(0, 0);
    }

    wasShortViewport = isShortViewport;
});

// Message Page Music Board

function initMusicPlayer(){
    //In Case of Music Mudule Inexist
    const bgmCard = document.querySelectorAll("#bgm-card, #music-page")
    if (!bgmCard.length) return

    const playButton = document.querySelector(".play-button")
    const volumeButton = document.querySelector(".volume-button")
    const replayButton = document.querySelector(".replay-button")
    const nextButton = document.querySelector(".next-button")
    const previousButton = document.querySelector(".previous-button")

    const audio = document.querySelector("#bgm")
    const musicCover = document.querySelector(".cover-rotate-paused")
    const progressBar = document.querySelector("#music-progress")

    const TitlePage = document.getElementById("title-page")
    const MusicPage = document.getElementById("music-page")
    const musicPageButton = document.querySelector(".music-page-button")
    const musicBackButton = document.querySelector("#music-page .back-button")

    const progressSvg = document.querySelector(".svg-progress circle")
    const volumeSvg = document.querySelector(".svg-volume circle")

    const currentTime = document.getElementById("current-time")
    const totalTime = document.getElementById("total-time")
    const volumeLevels = [1.0, 0.66, 0.33, 0]
    
    function playMusic () {
        if (!playButton) return
        audio.play()
        playButton.classList.remove("fa-play");
        playButton.classList.add("fa-pause");
    };

    if (!audio || !progressBar) return

    //Play Button
    if (playButton) {
    playButton.addEventListener("click", function() {
        const isPaused = audio.paused;
        playButton.classList.toggle("fa-play", !isPaused);
        playButton.classList.toggle("fa-pause", isPaused);
        if (isPaused === true) {
            audio.play()
            if (musicCover) musicCover.classList.remove("cover-rotate-paused");
        } else {
            audio.pause()
            if (musicCover) musicCover.classList.add("cover-rotate-paused");
        }
    })};

    //Progress Bar and Control
    let isDragging = false
    let progress = 0
    progressBar.addEventListener('input', () => { 
        isDragging = true
        if (!audio.duration) return;
        const progressValue = Number(progressBar.value)
        const timeChange = (progressBar.value /100) * audio.duration
        audio.currentTime = timeChange 
        progressBar.style.setProperty('--progress', `${progressValue}%`)
        if (progressSvg) {
            progressSvg.style.strokeDasharray = "100";
            progressSvg.style.strokeDashoffset = String(100 - progressValue);
        }
    });

    audio.addEventListener("timeupdate", () => { 
        if (!audio.duration) return;
        if (isDragging) return;
        progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.setProperty('--progress', `${progress}%`);
        progressBar.value = progress;
        if (progressSvg) {
            progressSvg.style.strokeDasharray = "100";
            progressSvg.style.strokeDashoffset = String(100 - progress);
        }
    });

    progressBar.addEventListener('change', () => {
        isDragging = false
    });

    //Volume Control

    if (volumeButton) {
    function updateVolumeIcon(vol) {
        volumeButton.classList.remove("fa-volume-high", "fa-volume", "fa-volume-low", "fa-volume-xmark");
        if (vol === 0) {
            volumeButton.classList.add("fa-volume-xmark")
        } else if (vol <= 0.33) {
            volumeButton.classList.add("fa-volume-low")
        } else if (vol <= 0.66){
            volumeButton.classList.add("fa-volume")
        } else {
            volumeButton.classList.add("fa-volume-high")
        };
        if (volumeSvg) {
            volumeSvg.style.strokeDasharray = "100";
            volumeSvg.style.strokeDashoffset = String(-(100 - vol*100));
        }
    };

    function initVolume() {
        let savedVolume = localStorage.getItem("volume")
        if (savedVolume === null) {
            savedVolume = 1.0
        } else {
            savedVolume = parseFloat(savedVolume)
        }

        audio.volume = savedVolume
        audio.muted = (savedVolume === 0);
        
        updateVolumeIcon(savedVolume)
    };

    volumeButton.addEventListener("click", () => {
        let currentVol = audio.muted ? 0 : audio.volume;
        let currentIndex = volumeLevels.indexOf(currentVol);

        if (currentIndex === -1) currentIndex = 0;

        let nextIndex = (currentIndex + 1) % volumeLevels.length;
        let nextVol = volumeLevels[nextIndex];

        audio.volume = nextVol;
        audio.muted = (nextVol === 0);

        localStorage.setItem("volume", nextVol);

        updateVolumeIcon(nextVol)
    });

    initVolume();
    }

    //Shift to Music Page
    if (musicPageButton && musicBackButton && TitlePage && MusicPage) {

    musicPageButton.addEventListener("click", () => {
        ViewTransition (() => {
        TitlePage.style.setProperty('display', 'none');
        MusicPage.style.setProperty('display', 'flex');
        });
    });
    
    musicBackButton.addEventListener("click", () => {
        ViewTransition (() => {
        TitlePage.style.setProperty('display', 'block');
        MusicPage.style.setProperty('display', 'none');
        });
    });
    };

    //Replay Button
    if (replayButton) {
    replayButton.addEventListener("click", () => {
        progressBar.style.setProperty('--progress', "0%");
        audio.currentTime = 0
        progressBar.value = 0
        if (musicCover) {
            musicCover.classList.remove("cover-rotate");
            void musicCover.offsetWidth;
            musicCover.classList.add("cover-rotate");
        }
        audio.play()
        playMusic()
    });
    };

    // Switch Tunes
    if (musicList && previousButton && nextButton) {
    let currentIndex = 0
    function updateTune () {
        ViewTransition (() => {
        document.getElementById("music-name").textContent = musicList[currentIndex].title
        document.getElementById("music-author").textContent = musicList[currentIndex].artist
        document.getElementById("music-cover").src = musicList[currentIndex].cover
        });
        audio.src = musicList[currentIndex].src
        progressBar.style.setProperty('--progress', '0%')
        progressBar.value = 0
    }

    previousButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + musicList.length) % musicList.length;
        updateTune();
        playMusic();
    });

    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % musicList.length;
        updateTune();
        playMusic();
    });

    audio.addEventListener("ended", () => {
        nextButton.click()
    })
    
    function initMusicList () {
        currentIndex = 0;
        updateTune ();
    };

    initMusicList ()
    };

    //Music Time 
    function culMin (second) {
        if (isNaN(second) || second === undefined) return "0:00"; 
        const Min = Math.floor(second / 60) + ":" + String(Math.floor(second) %60).padStart(2, '0');
        return Min
    }

    if (totalTime) {
        audio.addEventListener("loadedmetadata", () => { 
            totalTime.textContent = culMin(audio.duration)
        });
    }
    if (currentTime) {
        audio.addEventListener("timeupdate", () => { 
            currentTime.textContent = culMin(audio.currentTime)
        });
    }
};

// Message Page Time Board

function initTimeBoard (){

    const timePageButton = document.querySelector(".time-page-button")
    const TitlePage = document.getElementById("title-page")
    const TimePage = document.getElementById("time-page")

    const yearEl = document.getElementById("year")
    const monthEl = document.getElementById("month")
    const dateEl = document.getElementById("date")
    const dayEl = document.getElementById("day")
    const hourEl = document.getElementById("hour")
    const minuteEl = document.getElementById("minute")
    const secondEl = document.getElementById("second")

    const weatherCondition = document.getElementById("weather-condition")
    const greetingEl = document.getElementById("greeting")
    const thisYearEl = document.getElementById("this-year")
    const thisYearProgressEl = document.getElementById("this-year-progress")
    const delayEl = document.getElementById("delay")

    const hourSvg = document.querySelector(".svg-hour circle")
    const minuteSvg = document.querySelector(".svg-minute circle")
    
    const now = new Date()
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const weatherMap = {
        0: {text:"Sunny", emoji: "☀️"},
        1: {text:"Mostly Clear", emoji: "🌤️"},
        2: {text:"Cloudy", emoji: "⛅"},
        3: {text:"Overcast", emoji: "☁️"},
        45: {text:"Fog", emoji: "🌫️"},
        48: {text:"Fog", emoji: "🌫️"},
        51: {text:"Light Drizzle", emoji: "🌧️"},
        53: {text:"Drizzle", emoji: "🌧️"},
        55: {text:"Dense Drizzle", emoji: "🌧️"},
        61: {text:"Light Rain", emoji: "🌧️"},
        63: {text:"Moderate Rain", emoji: "🌧️"},
        65: {text:"Heavy Rain", emoji: "🌧️"},
        71: {text:"Light Snow", emoji: "❄️"},
        73: {text:"Moderate Snow", emoji: "❄️"},
        75: {text:"Heavy Snow", emoji: "❄️"},
        80: {text:"Showers", emoji: "🌦️"},
        81: {text:"Showers", emoji: "🌦️"},
        82: {text:"Showers", emoji: "🌦️"},
        85: {text:"Flurries", emoji: "🌨️"},
        86: {text:"Flurries", emoji: "🌨️"},
        95: {text:"Storm", emoji: "⛈️"}
    }

    //In Case of Time Mudule Inexist
    if (!TimePage) return

    //Shift to Time Page
    if (TimePage && TitlePage) {

    timePageButton.addEventListener("click", () => {
        ViewTransition (() => {
        TitlePage.style.setProperty('display', 'none');
        TimePage.style.setProperty('display', 'flex');
        });
    });
    
    TimePage.addEventListener("click", () => {
        ViewTransition (() => {
        TitlePage.style.setProperty('display', 'block');
        TimePage.style.setProperty('display', 'none');
        });
    });
    };

    //Clock and Calendar

    function updateClock () {
        const now = new Date()
        const year = now.getFullYear()
        const month = now.getMonth() + 1
        const date = now.getDate()
        const day = now.getDay()
        const hour = now.getHours()
        const minute = now.getMinutes()
        const second = now.getSeconds()
        const weekDay = weekDays[day]

        yearEl.textContent = year
        monthEl.textContent = String(month).padStart(2, '0')
        dateEl.textContent = String(date).padStart(2, '0')
        dayEl.textContent = weekDay
        hourEl.textContent = String(hour).padStart(2, '0')
        minuteEl.textContent = String(minute).padStart(2, '0')
        secondEl.textContent = String(second).padStart(2, '0')
        const msToNextSecond = 1000 - now.getMilliseconds();
        setTimeout(updateClock, msToNextSecond)
    };

    // Clock Svg
    function updateRing () {
        const now = new Date()
        const hour = now.getHours()
        const minute = now.getMinutes()
        let hourPercent

        if (hour <= 12) {
            hourPercent = (hour / 12) *100
            hourSvg.style.strokeDasharray = "100"
            hourSvg.style.strokeDashoffset = String(100 - hourPercent);
        } else {
            hourPercent = ((hour - 12) / 12) *100
            hourSvg.style.strokeDasharray = "100"
            hourSvg.style.strokeDashoffset = String(-hourPercent);
        }

        const minutePercent = (minute / 60) *100

        minuteSvg.style.strokeDasharray = "100"
        minuteSvg.style.strokeDashoffset = String(100 - minutePercent);
        const msToNextSecond = 1000 - now.getMilliseconds();
        setTimeout(updateRing, msToNextSecond)
    };

    // Greeting
    const hour = now.getHours()
    let greetingContent = ""
    if (hour >= 6 && hour < 11) {
        greetingContent = "🌤️ Morning~ Have a good day!"
    } else if (hour >= 11 && hour < 14){
        greetingContent = "☀️ Take a noon break~"
    } else if (hour >= 14 && hour < 17){
        greetingContent = "☕ Afternoon! Tea or coffee?"
    } else if (hour >= 17 && hour < 22){
        greetingContent = "🌇 To see the sun set?"
    } else if (hour >= 22 || hour < 6){
        greetingContent = "🌃 Have an early night~"
    }
    greetingEl.textContent = greetingContent;

    // Progress of This Year
    const year = now.getFullYear()
    const thisYearStart = new Date(year, 0, 1).getTime()
    const nextYearStart = new Date((year + 1), 0, 1).getTime()
    const thisYearTotal = nextYearStart - thisYearStart
    const thisYearPassedMs = now.getTime() - thisYearStart
    const thisYearPassed = ((thisYearPassedMs / thisYearTotal)*100).toFixed(0)

    thisYearProgressEl.textContent = `${thisYearPassed}%`
    thisYearEl.textContent = year

    // Network Delay
    const beforeFetch = Date.now();
    let afterFetch;
    let delay;
    fetch("static/img/avatar.webp?t=" + Date.now())
    .then (() => {
        afterFetch = Date.now()
        delay = afterFetch - beforeFetch;
        delayEl.textContent = `${delay}ms`
    })
    .catch(() => {
        delay = "Unknown";
        delayEl.textContent = `${delay}`
    });


    // Weather
    async function initWeather() {
        let regionData;
        let weathersData;
        try {
            let lat = 31.2304
            let lon = 121.4737
            const region = await fetch ('https://ipwho.is/?fields=success,city,latitude,longitude')
            if (!region.ok) { 
                throw new Error(`HTTP 错误：${region.status}`); 
            };
            regionData = await region.json()

            lat = regionData.latitude;
            lon = regionData.longitude;

            const weathers = await fetch (
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day`
            );
            if (!weathers.ok) { 
                throw new Error(`HTTP 错误：${weathers.status}`);
            }
            weathersData = await weathers.json()

        } catch (err) {
            console.error('API 获取失败：', err);
        };
        if(!regionData.success) {
            console.error('ipwho.is 返回失败：', regionData.message);
            return; 
        };

        //Update Weather
        const weatherCode = weathersData.current.weather_code;
        const weatherInfo = weatherMap[weatherCode] || {text:"Unknown", emoji: "🌈"}
        const displayWeatherInfo = hour > 18 ? {
            ... weatherInfo,
            ... (weatherCode === 0 ? {text: "Clear", emoji: "🌙"} : {}),
            ... (weatherCode === 1 ? {text: "Mostly Clear", emoji: "☁️"} : {})
        } : weatherInfo
        weatherCondition.innerHTML = `${displayWeatherInfo.emoji} <span id="weather-text">${displayWeatherInfo.text}</span> ${weathersData.current.temperature_2m} °C`;

    }
    updateClock();
    updateRing()
    initWeather();

}

// Contact Page Statistic

const startDate = new Date(2026, 10, 19)
const now = new Date()
const runningDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24)) +1
const runningDaysEl =document.getElementById("running-days")
const visitorsEl = document.getElementById("visitors")

if (runningDaysEl || visitorsEl) {
    let umapiData

    runningDaysEl.textContent = runningDays

    async function initUmamiStats() {
        try {
            const umapi = await fetch(`https://umapi-2.yoxo.top/`)
            if (!umapi.ok) { 
                throw new Error(`HTTP 错误：${umapi.status}`); 
            };
            umapiData = await umapi.json()
        } catch (err) {
            console.error('Umami API获取失败：', err);
            return;
        }

        visitorsEl.textContent = umapiData.total_uv
    }
    initUmamiStats()
}

// Mouse wheel left

const projectWrapEl = document.querySelectorAll(".project-set-wrap")

projectWrapEl.forEach( wrap => {
    let targetScrollLeft = wrap.scrollLeft
    let isAnimating = false
    function smoothScroll() {
        const distance = targetScrollLeft - wrap.scrollLeft
        if (Math.abs(distance) < 0.5) {
            wrap.scrollLeft = targetScrollLeft
            isAnimating = false
            return
        }
        wrap.scrollLeft += distance * 0.15
        requestAnimationFrame(smoothScroll)
    }
    wrap.addEventListener("wheel", (event) => {
    if (wrap.scrollWidth > wrap.clientWidth && Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        targetScrollLeft += event.deltaY
        targetScrollLeft = Math.max(0,Math.min(targetScrollLeft, wrap.scrollWidth - wrap.clientWidth))
        event.preventDefault()
        if (!isAnimating) {
            isAnimating = true
            requestAnimationFrame(smoothScroll)
        }       
    } 
}, { passive: false })
})

// Footer Years Update
const thisYear = new Date().getFullYear()
const startYear = 2026
const footerYearEl = document.querySelectorAll("#footer-year")

if (footerYearEl.length > 0){

    if (thisYear === startYear) {
        footerYearEl.forEach( year => {
        year.textContent = `${thisYear}`})
    } else {
        footerYearEl.forEach( year => {
        year.textContent = `${startYear} - ${thisYear}`})
    }
}

initMusicPlayer()
initTimeBoard()
calculateAge()
