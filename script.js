const playlists = [
    {
        id: 1,
        title: "Top Hits 2025",
        description: "The hottest tracks around the globe. Cover: Taylor Swift",
        imgClass: "grad-1",
        type: "Playlist",
        songCount: 50,
        songs: [
            { id: 101, title: "Anti-Hero", artist: "Taylor Swift", album: "Midnights", date: "2 days ago", duration: "3:20", img: "https://via.placeholder.com/40/450af5/fff?text=T" },
            { id: 102, title: "As It Was", artist: "Harry Styles", album: "Harry's House", date: "5 days ago", duration: "2:47", img: "https://via.placeholder.com/40/c4efd9/000?text=H" },
            { id: 103, title: "I'm Good (Blue)", artist: "David Guetta", album: "Single", date: "1 week ago", duration: "2:55", img: "https://via.placeholder.com/40/450af5/000?text=D" }
        ]
    },
    {
        id: 2,
        title: "Chill Vibes",
        description: "Just relax and listen.",
        imgClass: "grad-2",
        type: "Playlist",
        songCount: 88,
        songs: [
            { id: 201, title: "Cold Heart", artist: "Elton John", album: "The Lockdown", date: "Jan 12, 2024", duration: "3:22", img: "https://via.placeholder.com/40/FF9A9E/000?text=E" },
            { id: 202, title: "Stay", artist: "The Kid LAROI", album: "F*CK LOVE", date: "Jan 10, 2024", duration: "2:21", img: "https://via.placeholder.com/40/FECFEF/000?text=S" }
        ]
    },
    {
        id: 3,
        title: "Discover Weekly",
        description: "Your weekly mixtape of fresh music. Updated every Monday.",
        imgClass: "grad-3",
        type: "Playlist",
        songCount: 30,
        songs: [
            { id: 301, title: "Flowers", artist: "Miley Cyrus", album: "Endless Summer", date: "Yesterday", duration: "3:20", img: "https://via.placeholder.com/40/a18cd1/fff?text=M" },
            { id: 302, title: "Kill Bill", artist: "SZA", album: "SOS", date: "2 days ago", duration: "2:33", img: "https://via.placeholder.com/40/fbc2eb/000?text=S" }
        ]
    },
    {
        id: 4,
        title: "Rock Classics",
        description: "Rock legends & epic songs.",
        imgClass: "grad-4",
        type: "Playlist",
        songCount: 150,
        songs: []
    },
    {
        id: 5,
        title: "Mega Hit Mix",
        description: "A mega mix of 75 favorites from the last few years!",
        imgClass: "grad-5",
        type: "Playlist",
        songCount: 75,
        songs: []
    }
];

document.addEventListener('DOMContentLoaded', () => {

    const hour = new Date().getHours();
    let greeting = 'Good morning';
    if (hour >= 12 && hour < 18) greeting = 'Good afternoon';
    else if (hour >= 18) greeting = 'Good evening';
    document.getElementById('greeting-text').textContent = greeting;

    const mixesGrid = document.getElementById('mixes-grid');
    const recentGrid = document.getElementById('recent-grid');

    function createCard(item) {
        const div = document.createElement('div');
        div.className = 'playable-card';
        div.onclick = () => openPlaylist(item);
        div.innerHTML = `
            <div class="img-container">
                <div class="${item.imgClass}" style="width:100%; height:100%;"></div>
                <button class="play-fab"><i class="fa-solid fa-play"></i></button>
            </div>
            <div class="card-title">${item.title}</div>
            <div class="card-desc">${item.description}</div>
        `;
        return div;
    }

    playlists.slice(0, 3).forEach(pl => mixesGrid.appendChild(createCard(pl)));
    playlists.slice(3, 5).forEach(pl => recentGrid.appendChild(createCard(pl)));

    const libList = document.getElementById('library-list');
    libList.innerHTML = '';
    playlists.forEach(pl => {
        const item = document.createElement('div');
        item.className = 'lib-item';
        item.onclick = () => openPlaylist(pl);
        item.innerHTML = `
            <div class="${pl.imgClass}" style="width:48px;height:48px;border-radius:4px;"></div>
            <div class="lib-item-text">
                <div class="lib-item-title">${pl.title}</div>
                <div class="lib-item-desc">${pl.type} • ${pl.songCount} songs</div>
            </div>
        `;
        libList.appendChild(item);
    });

    const homeView = document.getElementById('home-view');
    const playlistView = document.getElementById('playlist-view');
    const mainView = document.querySelector('.main-view');

    function showHome() {
        homeView.style.display = 'block';
        playlistView.style.display = 'none';
        playlistView.classList.remove('active');
        document.querySelector('.top-nav').style.backgroundColor = 'rgba(18,18,18,0.7)';
    }

    const plTitle = document.getElementById('playlist-title');
    const plDesc = document.getElementById('playlist-desc');
    const plCover = document.getElementById('playlist-cover');
    const songsContainer = document.getElementById('songs-container');

    function openPlaylist(playlistData) {
        homeView.style.display = 'none';
        playlistView.style.display = 'block';
        playlistView.classList.add('active');
        mainView.scrollTop = 0;

        plTitle.textContent = playlistData.title;
        plDesc.textContent = playlistData.description;
        plCover.className = `playlist-cover-lg shadow-lg ${playlistData.imgClass}`;

        songsContainer.innerHTML = '';
        if (playlistData.songs.length === 0) {
            songsContainer.innerHTML = '<div style="padding:24px; color:#b3b3b3;">No songs here yet.</div>';
        } else {
            playlistData.songs.forEach((song, index) => {
                const row = document.createElement('div');
                row.className = 'song-row';
                row.onclick = () => playSong(song);
                row.innerHTML = `
                    <div class="col-index">${index + 1}</div>
                    <div class="col-title">
                        <img src="${song.img}" alt="">
                        <div class="song-info">
                            <span class="song-name">${song.title}</span>
                            <span class="artist-name">${song.artist}</span>
                        </div>
                    </div>
                    <div class="col-album">${song.album}</div>
                    <div class="col-date">${song.date}</div>
                    <div class="col-dur">${song.duration}</div>
                `;
                songsContainer.appendChild(row);
            });
        }

        document.querySelector('.main-view').style.backgroundImage =
            `linear-gradient(to bottom, #444, #121212 300px)`;
    }

    document.querySelectorAll('.nav-item').forEach(nav => {
        nav.addEventListener('click', function () {
            if (this.innerText.includes('Home')) showHome();
        });
    });

    document.querySelector('.nav-circle:nth-child(1)').addEventListener('click', showHome);

    const playerTitle = document.getElementById('player-title');
    const playerArtist = document.getElementById('player-artist');
    const playerImg = document.getElementById('player-img');
    const mainPlayBtn = document.getElementById('main-play-btn');
    const progressFill = document.getElementById('progress-fill');
    const progressThumb = document.getElementById('progress-thumb');
    const currTimeElem = document.getElementById('curr-time');
    const totTimeElem = document.getElementById('tot-time');

    let isPlaying = false;
    let currentProgress = 0;
    let progressInterval = null;

    function playSong(song) {
        playerTitle.textContent = song.title;
        playerArtist.textContent = song.artist;
        playerImg.src = song.img;
        totTimeElem.textContent = song.duration;
        isPlaying = true;
        currentProgress = 0;
        updatePlayButton();
        startProgress();
    }

    mainPlayBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        updatePlayButton();
        if (isPlaying) startProgress();
        else clearInterval(progressInterval);
    });

    function updatePlayButton() {
        mainPlayBtn.innerHTML = isPlaying
            ? '<i class="fa-solid fa-pause"></i>'
            : '<i class="fa-solid fa-play"></i>';
    }

    function startProgress() {
        clearInterval(progressInterval);
        progressInterval = setInterval(() => {
            currentProgress += 0.2;
            if (currentProgress > 100) {
                currentProgress = 0;
                isPlaying = false;
                updatePlayButton();
                clearInterval(progressInterval);
            }
            progressFill.style.width = `${currentProgress}%`;
            progressThumb.style.left = `calc(${currentProgress}% - 6px)`;

            let totalSeconds = 180;
            let currentSec = Math.floor((currentProgress / 100) * totalSeconds);
            let min = Math.floor(currentSec / 60);
            let sec = currentSec % 60;
            if (sec < 10) sec = '0' + sec;
            currTimeElem.textContent = `${min}:${sec}`;
        }, 200);
    }

    mainView.addEventListener('scroll', () => {
        const topNav = document.querySelector('.top-nav');
        if (mainView.scrollTop > 50) topNav.classList.add('scrolled');
        else topNav.classList.remove('scrolled');
    });

});
