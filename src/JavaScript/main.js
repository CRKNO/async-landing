// import fetch from "node-fetch";
const APIVIDEOS = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCi_zKr64k8WIx8miV36rr1w&part=snippet%2Cid&type=video&order=date&maxResults=';
const APIMOSTPOPULAR = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCi_zKr64k8WIx8miV36rr1w&part=snippet&type=video&chartmostpopular&maxResults=';

const mostPopularSection = document.querySelector(".most-popular");
const lastVideosSection = document.querySelector(".last-videos");
const allVideosSection = document.querySelector(".all-videos");
const seriesSection = document.querySelector(".series");
const allSections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-items");

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '42283b2d77msh9c22c331a971763p17bd53jsnedb20129b361',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
}

let activeView = "";
let pageToken = "";
let recived = [];
let b = "";

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
    // console.log(newVideos)
    for(video of newVideos.items){
        if(activeView === "videos") {recived.push(video)};
        b = video;
        console.log(video.id)
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

function removeVideosOfSection(section){
    const videos = section.querySelectorAll(".video-card");
    console.log(videos);
    for(let video of videos){
        video.remove();
    }
}

async function fetchAllVideos(pgToken){
    pgToken = pgToken || "";
    // console.log(pgToken)
    const allVideos = await ((await fetch(`${APIVIDEOS}12&pageToken=${pgToken}`, options)).json());
    console.log("allVideos: " + allVideos)
    pageToken = allVideos.nextPageToken;
    if(activeView != "videos"){
        activeView = "videos";
        removeVideosOfSection(allVideosSection);
    }  
    putVideos(allVideos, allVideosSection);
}



(async () =>{ //auto-executable anonimous function
    try{
        const videos = await (await fetch(`${APIVIDEOS}8`, options)).json();
        const popularVideos = await (await fetch(`${APIMOSTPOPULAR}4`, options)).json();
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

for(item of navItems){
    item.addEventListener("click", (e)=>{
        window.scroll(0, 0);
        let target = e.target;
        console.log(target.textContent);
        switch(target.textContent){
            case "Home":
                for(let section of allSections){
                    if(section.classList.contains("most-popular") || section.classList.contains("last-videos")){
                        section.classList.remove("inactive");
                    }
                    else{
                        section.classList.add("inactive");
                    }
                }

                break;
            case "Videos":
                for(let section of allSections){
                    if(section.classList.contains("all-videos")){
                        section.classList.remove("inactive");
                    }
                    else{
                        section.classList.add("inactive");
                    }
                }
                fetchAllVideos();
                break;
            case "Series":
                for(let section of allSections){
                    if(section.classList.contains("series")){
                        section.classList.remove("inactive");
                    }
                    else{
                        section.classList.add("inactive");
                    }
                }
                break;
        }
    });
}

window.addEventListener("scroll", (e) =>{
    // console.log(window.scrollY);
    if(window.scrollY + window.innerHeight >= document.body.clientHeight && activeView === "videos"){
        console.log('lllllllllllllllllllllllllllllllll');
        fetchAllVideos(pageToken);
    }
})

function a(arr){
    arr.map((video) =>{
        let aux = 0;
        for(let item of arr){
            if(video.id.videoId === item.id.videoId){
                aux++;
            }
            if(aux === 2){
                console.log(item.id.videosId);
            }
        }
    })
}