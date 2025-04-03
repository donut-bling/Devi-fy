// Your Google Drive MP3 Link (Replace with your actual link)
const songURL = "https://drive.google.com/file/d/1SrM1llPHb0I56wN1O7IgthJT8SZr5TYD/view?usp=sharing";

// Function to extract file name from Google Drive URL
async function fetchSongName(url) {
    try {
        const response = await fetch(url, { method: "HEAD" });
        const contentDisposition = response.headers.get("content-disposition");

        if (contentDisposition) {
            // Extract file name from the header
            const match = contentDisposition.match(/filename="(.+?)"/);
            if (match) return match[1];
        }
    } catch (error) {
        console.error("Error fetching song name:", error);
    }
    return "Unknown Song"; // Fallback if extraction fails
}

// Initialize WaveSurfer
const wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'gray',
    progressColor: '#ff6600',
    barWidth: 3,
    responsive: true,
    height: 80,
});

// Load the song
wavesurfer.load(songURL);

// Update Song Name on the Page
fetchSongName(songURL).then(songName => {
    document.getElementById("songTitle").innerText = `Now Playing: ${songName}`;
});

// Play/Pause Button Functionality
document.getElementById("playPause").addEventListener("click", function () {
    if (wavesurfer.isPlaying()) {
        wavesurfer.pause();
        this.innerHTML = "▶ Play";
    } else {
        wavesurfer.play();
        this.innerHTML = "⏸ Pause";
    }
});
