// import fetch from "node-fetch";
const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCi_zKr64k8WIx8miV36rr1w&part=snippet%2Cid&type=video&order=date&maxResults=8';
const API2 = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCi_zKr64k8WIx8miV36rr1w&part=snippet&type=video&chartmostpopular&maxResults=4';

const mostPopularSection = document.querySelector(".most-popular");
const lastVideosSection = document.querySelector(".last-videos");
const allVideosSection = document.querySelector(".all-videos");
const seriesSection = document.querySelector(".series")
const navItems = document.querySelectorAll(".nav-items");

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '42283b2d77msh9c22c331a971763p17bd53jsnedb20129b361',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
}

for(item of navItems){
    item.addEventListener("click", (e)=>{
        let target = e.target;
        console.log(target.textContent);
        switch(target.textContent){
            case "Home":
                mostPopularSection.classList.remove("inactive");
                lastVideosSection.classList.remove("inactive");
                allVideosSection.classList.add("inactive");
                seriesSection.classList.add("inactive");
                break;
            case "Videos":
                allVideosSection.classList.remove("inactive");
                mostPopularSection.classList.add("inactive");
                lastVideosSection.classList.add("inactive");
                seriesSection.classList.add("inactive");
                break;
            case "Series":
                seriesSection.classList.remove("inactive");
                mostPopularSection.classList.add("inactive");
                lastVideosSection.classList.add("inactive");
                allVideosSection.classList.add("inactive");
                break;
        }
    });
}

(async () =>{ //auto-executable anonimous function
    try{
        const videos = await (await fetch(API, options)).json();
        const popularVideos = await (await fetch(API2, options)).json();
        const popularVideosPlaceholders = document.querySelectorAll(".popular-videos-placeholder");
        const lastVideosPlaceholders = document.querySelectorAll(".last-videos-placeholder");

        putVideos(popularVideos, mostPopularSection);
        removeVideos(popularVideosPlaceholders);
        
        putVideos(videos, lastVideosSection);
        removeVideos(lastVideosPlaceholders);

        const cards = null || document.querySelectorAll(".video-card");
    }
    catch (error){
        console.log(error);
    }
})();

function createCards(video){

    let div = document.createElement("div");
    div.classList.add("video-card");

    let img = document.createElement("img");
    img.setAttribute("src", video.snippet.thumbnails.high.url);
    img.setAttribute("alt", video.snippet.title);

    let p = document.createElement("p");
    p.classList.add("card-title");
    p.textContent = video.snippet.title;

    div.append(img, p);
    return div;
}

function putVideos(newVideos, videosContainerSection){
    for(video of newVideos.items){
        let aux = createCards(video);
        aux.addEventListener("click", ()=>{
            window.location = `https://www.youtube.com/watch?v=${video.id.videoId}`
        })
        videosContainerSection.append(aux);
    }
}

function removeVideos(oldVideos){
    for(let video of oldVideos){
        video.remove();
    }
}