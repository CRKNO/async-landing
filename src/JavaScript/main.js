// import fetch from "node-fetch";
const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCi_zKr64k8WIx8miV36rr1w&part=snippet%2Cid&type=video&order=date&maxResults=8';
const API2 = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCi_zKr64k8WIx8miV36rr1w&part=snippet&type=video&chartmostpopular&maxResults=4';
const mostPopularSection = document.querySelector(".most-popular");
const lastVideosSection = document.querySelector(".last-videos");

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '42283b2d77msh9c22c331a971763p17bd53jsnedb20129b361',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

(async () =>{ //auto-executable anonimous function
    try{
        const videos = await (await fetch(API, options)).json();
        const popularVideos = await (await fetch(API2, options)).json();
        const popularVideosPlaceholders = document.querySelectorAll(".popular-videos-placeholder");
        const lastVideosPlaceholders = document.querySelectorAll(".last-videos-placeholder");

        for(let video of videos.items){
            let aux = createCards(video);
            aux.addEventListener("click", ()=>{
                window.location = `https://www.youtube.com/watch?v=${video.id.videoId}`
                console.log(video.id.videoId)
            })
            lastVideosSection.append(aux);
        }
        for(let placeholder of popularVideosPlaceholders){
            placeholder.remove();
        }

        for(let video of popularVideos.items){
            let aux = createCards(video);
            aux.addEventListener("click", ()=>{
                window.location = `https://www.youtube.com/watch?v=${video.id.videoId}`
                console.log(video.id.videoId)
            })
            mostPopularSection.append(aux);
        }
        for(let placeholder of lastVideosPlaceholders){
            placeholder.remove();
        }

        const cards = null || document.querySelectorAll(".video-card");
        console.log(cards)
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