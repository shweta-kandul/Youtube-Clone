const videoCardContainer = document.querySelector('.video-container');
let api_key = "AIzaSyBa-1Sd8_umXraOxlouSOxC534YmxJF7xs";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?"

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 100,
    regionCode: 'IN'
}))
.then(res => res.json())
.then(data => {
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})
.catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })
}

const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video-content-cover" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
                    <div class="video-content">
                        <a href="#" class="video-box">
                            <img src="${data.snippet.thumbnails.high.url}" alt="">
                        </a>
                        <div class="video-details">
                            <div class="channel-logo">
                               <img src="${data.channelThumbnail}" alt="">
                            </div>
                            <div class="detail">
                                <h3 class="title">${data.snippet.title}</h3>
                                <div class="channel-name">${data.snippet.channelTitle}</div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            
    `;
}

//search bar

const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search');
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})