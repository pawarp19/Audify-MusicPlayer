let songindex=1;
let audioelement=new Audio('songs/song1.mp3');
let masterplay=document.getElementById('masterplay');
let progressbar=document.getElementById('progressbar');
let gif=document.getElementById('gif');
let songitem=Array.from(document.getElementsByClassName('songitem'));
let songitemplay=Array.from(document.getElementsByClassName('songitemplay'));
let mastersongname=document.getElementById('mastersongname');
let isPlaying = false;

let songs=[
    {songname:"Leja Re",filePath:"songs/song1.mp3",coverpath:"songimg/song1.jpg"},
    {songname:"Makhna-Race3",filePath:"songs/song2.mp3",coverpath:"songimg/song2.jpg"},
    {songname:"Heeriye",filePath:"songs/song3.mp3",coverpath:"songimg/song3.jpg"},
    {songname:"Mummy Nu Pasand",filePath:"songs/song4.mp3",coverpath:"songimg/song4.jpg"},
    {songname:"Ghamand Kar",filePath:"songs/song5.mp3",coverpath:"songimg/song5.jpg"},
    {songname:"Tareefan",filePath:"songs/song6.mp3",coverpath:"songimg/song6.jpg"},
    {songname:"Main Lad Jana",filePath:"songs/song7.mp3",coverpath:"songimg/song7.jpg"},
    {songname:"Chhote Choote Peg",filePath:"songs/song8.mp3",coverpath:"songimg/song8.jpg"}
]

songitem.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByTagName("span")[0].innerHTML = songs[i].songname;
    const audio = new Audio(songs[i].filePath);

    // Set the initial duration in the timestamp
    audio.addEventListener('loadedmetadata', () => {
        const durationMinutes = Math.floor(audio.duration / 60);
        const durationSeconds = Math.floor(audio.duration % 60);
        const formattedMinutes = String(durationMinutes).padStart(2, '0');
        const formattedSeconds = String(durationSeconds).padStart(2, '0');

        element.querySelector('.acttime').innerHTML = `${formattedMinutes}:${formattedSeconds} `;

    });
})

masterplay.addEventListener('click',()=>{
    if(audioelement.paused || audioelement.currentTime<=0)
    {
        audioelement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
        isPlaying = true;

    }

    else{
        audioelement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
        gif.style.opacity=0;
        isPlaying = false;
             
    }
    updateTimestampIcon();
})

function updateTimestampIcon() {
    // Update the icon for the currently playing song
    const currentSongIcon = document.getElementById(`${songindex}`);
    if (currentSongIcon) {
        currentSongIcon.classList.toggle('fa-pause-circle', isPlaying);
        currentSongIcon.classList.toggle('fa-play-circle', !isPlaying);
    }
}


audioelement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate');

    progress=parseInt((audioelement.currentTime/audioelement.duration)*100);
    progressbar.value=progress;
    const currentTimeMinutes = Math.floor(audioelement.currentTime / 60);
    const currentTimeSeconds = Math.floor(audioelement.currentTime % 60);
    mastersongname.innerHTML = `${songs[songindex - 1].songname} - ${currentTimeMinutes}:${currentTimeSeconds}`;
});

progressbar.addEventListener('change' ,()=>{
    audioelement.currentTime=progressbar.value*audioelement.duration/100;
})

const makeallplays= ()=>{
    songitemplay.forEach((element)=>{
        element.classList.add('fa-play-circle');
        element.classList.remove('fa-pause-circle');
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
        gif.style.opacity=0;

    })
}


songitemplay.forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeallplays();
        songindex=parseInt(e.target.id);
        mastersongname.innerHTML=songs[songindex-1].songname;
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        gif.style.opacity=1;
        audioelement.src=`songs/song${songindex}.mp3`;
        audioelement.currentTime=0;
        audioelement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        

        isPlaying = true; // Update the overall play state
        updateTimestampIcon();
    })
    
})


document.getElementById('previous').addEventListener('click',()=>{
    if(songindex<=1)
    {
        songindex=8;
    }
    else{
        songindex-=1;
    }
    audioelement.src=`songs/song${songindex}.mp3`;
    mastersongname.innerHTML=songs[songindex-1].songname;
    audioelement.currentTime=0;
    audioelement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
})

document.getElementById('forward').addEventListener('click',()=>{
    if(songindex>=8)
    {
        songindex=1;
    }
    else{
        songindex+=1;
    }
    audioelement.src=`songs/song${songindex}.mp3`;
    mastersongname.innerHTML=songs[songindex-1].songname;
    audioelement.currentTime=0;
    audioelement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
})

