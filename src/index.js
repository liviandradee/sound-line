const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    rewindBtn = document.getElementById('rewind'),
    forwardBtn = document.getElementById('forward'),
    repeatBtn = document.getElementById('repeat'); 

const music = new Audio();

const songs = [
    {
        path: 'src/audio/A-Chegada-do-Hobgoblin-A Lenda-de-Ruff-Ghanor-Áudio-Drama-1.mp3',
        displayName: 'A lenda de Ruff Ghanor',
        cover: 'src/image/a-lenda-de-ruff-ghanor.jpg',
        artist: 'Leonel Cadela',
    },
    {
        path: 'src/audio/A-Aventura-no-Reino-Encantado.mp3',
        displayName: 'A Aventura no Reino Encantado',
        cover: 'src/image/A-Aventurano-ReinoEncantado.jpg',
        artist: 'Gustavo Bill',
    },
    {
        path: 'src/audio/EcosdaMente.mp3',
        displayName: 'Ecos da Mente',
        cover: 'src/image/ecosdamente.jpg',
        artist: 'Marina Costa',
    }
];

let musicIndex = 0;
let isPlaying = false;
let repeatMode = 'none';

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

function rewind10Seconds() {
    music.currentTime = Math.max(0, music.currentTime - 10);
}

function forward10Seconds() {
    music.currentTime = Math.min(music.duration, music.currentTime + 10);
}

function toggleRepeat() {
    switch (repeatMode) {
        case 'none':
            repeatMode = 'one';
            repeatBtn.classList.add('active');
            repeatBtn.setAttribute('title', 'Repetir uma');
            break;
        case 'one':
            repeatMode = 'all';
            repeatBtn.classList.remove('active');
            repeatBtn.setAttribute('title', 'Repetir todas');
            break;
        case 'all':
            repeatMode = 'none';
            repeatBtn.classList.remove('active');
            repeatBtn.setAttribute('title', 'Não repetir');
            break;
        default:
            break;
    }
}

function repeatOne() {
    loadMusic(songs[musicIndex]);
    playMusic();
}

function repeatAll() {
    changeMusic(1);
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => {
    switch (repeatMode) {
        case 'none':
            changeMusic(1);
            break;
        case 'one':
            repeatOne();
            break;
        case 'all':
            repeatAll();
            break;
        default:
            break;
    }
});
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);
rewindBtn.addEventListener('click', rewind10Seconds);
forwardBtn.addEventListener('click', forward10Seconds);
repeatBtn.addEventListener('click', toggleRepeat);

loadMusic(songs[musicIndex]);