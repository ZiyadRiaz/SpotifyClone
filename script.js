console.log('Welcome to Spotify');
//initialize Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3'); //one semicolon Missing and the song Doesn't Play
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let index;


let songs = [
    {songsName: "Good for you feat Burras" , filePath:"songs/1.mp3", coverPath:"covers/3.jpg"},
    {songsName: "this is a song" , filePath:"songs/2.mp3", coverPath:"covers/2.jpg"},
    {songsName: "song 3" , filePath:"songs/3.mp3", coverPath:"covers/3.jpg"},
    {songsName: "song 4" , filePath:"songs/1.mp3", coverPath:"covers/4.jpg"},
    {songsName: "song 5" , filePath:"songs/2.mp3", coverPath:"covers/6.jpg"},
    {songsName: "song 6" , filePath:"songs/3.mp3", coverPath:"covers/6.jpg"}
    
]  

//using array to change the songName and imgCover in the songItem Class

songItem.forEach((element,i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songsName;

})

// audioElement.play(); //used to play the song

//Handling Play pause event
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = "1";

    }
    else{
        audioElement.pause();
        masterPlay.classList.add('fa-circle-play');
        masterPlay.classList.remove('fa-pause');
        gif.style.opacity = "0";

    }
})

//listening to events 
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate'); //time udpdate works when Music starts Playing

    //listening to seek bar as well

    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100) 
    // console.log(prgoress); // providing the progress of the song

    //setting the progress bar to move accordingly to the song
    progressBar.value = progress;

})

//adding the Movement to Bar with the Song Duration and onClick Change

progressBar.addEventListener('change',()=>{
    audioElement.currentTime = progressBar.value * audioElement.duration / 100;
})

//making the songs Play
const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName("songItemsPlay")).forEach((element)=>{
     element.classList.add("fa-circle-play");
     element.classList.remove("fa-circle-pause");

    }) 
    
}

//using on Click event to play the songs

// Array.from(document.getElementsByClassName("songItemsPlay")).forEach((element)=>{
//     element.addEventListener('click', (e) =>{
//         makeAllPlays();
//         index = parseInt(e.target.id);
//         e.target.classList.remove("fa-circle-play");
//         e.target.classList.add("fa-circle-pause");
//         audioElement.src = `songs/${index}.mp3`;
//         audioElement.currentTime = 0;
//         audioElement.play();
//         masterPlay.classList.remove('fa-circle-play');
//         masterPlay.classList.add('fa-pause');


//     })
// })

Array.from(document.getElementsByClassName("songItemsPlay")).forEach((element, index) => {
    element.addEventListener('click', (e) => {
      makeAllPlays();
      songIndex = index; // Update the songIndex with the index of the clicked song
      console.log(songIndex); // This will show the correct index of the clicked song
      e.target.classList.remove("fa-circle-play");
      e.target.classList.add("fa-circle-pause");
      audioElement.src = `songs/${songIndex + 1}.mp3`;
      masterSongName.innerText = songs[songIndex].songsName;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = "1";
      masterPlay.classList.remove('fa-circle-play');
      masterPlay.classList.add('fa-pause');
      
    });
  });
  //now lets Enable next and Forward Buttons in the Bottom
  document.getElementById('next').addEventListener('click', ()=>{
 
    if (songIndex>=6){
        songIndex = 0;
    }
    else{
        songIndex +=1;
    }
    masterSongName.innerText = songs[songIndex].songsName;
    audioElement.src = `songs/${songIndex+1}.mp3`; // Use the index to get the correct song path
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-pause');

  })

   //now lets Enable previous and Forward Buttons in the Bottom
   document.getElementById('previous').addEventListener('click', ()=>{
 
    if (songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -=1;
    }
    masterSongName.innerText = songs[songIndex].songsName;
    audioElement.src = `songs/${songIndex+1}.mp3`; // Use the index to get the correct song path
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-pause');
  })