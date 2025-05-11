import React, { useEffect, useState, useRef } from 'react';

function Audio() {
  const [tracks, setTracks] = useState([]);
  const [fullscreenIndex, setFullscreenIndex] = useState(null);
  const audioRefs = useRef([]);

  useEffect(() => {
    // Fetch audio tracks from backend
    fetch('http://localhost:5000/tracks')
      .then((res) => res.json())
      .then((data) => setTracks(data))
      .catch((err) => console.error('Error fetching tracks:', err));

    // Detect when fullscreen is exited via Esc or system controls
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setFullscreenIndex(null); // Don't touch audio — just update UI
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handlePlay = (index) => {
    // Pause other audio tracks
    audioRefs.current.forEach((audio, i) => {
      if (audio && i !== index) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    // Request fullscreen on the card
    const card = document.getElementById(`card-${index}`);
    if (card.requestFullscreen) card.requestFullscreen();
    else if (card.webkitRequestFullscreen) card.webkitRequestFullscreen();
    else if (card.msRequestFullscreen) card.msRequestFullscreen();

    setFullscreenIndex(index);
  };

  const handleExitFullscreen = () => {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
    // Do NOT pause audio here — let it keep playing unless user paused it
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🎵 Audio Gallery</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tracks.map((track, index) => (
          <div
            key={index}
            id={`card-${index}`}
            className={`relative bg-white shadow-md rounded-lg p-4 flex flex-col items-center transition-all duration-300 ${
              fullscreenIndex === index
                ? 'fixed inset-0 bg-black z-50 justify-center items-center'
                : ''
            }`}
          >
            {/* Fullscreen close button */}
            {fullscreenIndex === index && (
              <button
                onClick={handleExitFullscreen}
                className="absolute top-4 right-4 text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded z-50"
              >
                ✖ Close
              </button>
            )}

            {/* Track Image */}
            <img
              src={`http://localhost:5000/images/${track.image}`}
              alt={track.title}
              className="w-full max-w-lg object-cover rounded mb-4"
            />

            {/* Track Title */}
            <h2 className="text-2xl font-semibold text-center mb-4 text-white">
              {track.title}
            </h2>

            {/* Fixed bottom audio bar for fullscreen */}
            {fullscreenIndex === index && (
              <div className="fixed bottom-0 left-0 right-0 bg-gray-900 p-4 shadow-inner z-50">
                <div className="max-w-2xl mx-auto">
                  <audio
                    ref={(el) => (audioRefs.current[index] = el)}
                    controls
                    className="w-full"
                    onPlay={() => handlePlay(index)}
                  >
                    <source
                      src={`http://localhost:5000/audio/${track.file}`}
                      type="audio/mpeg"
                    />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
            )}

            {/* Regular audio controls (non-fullscreen view) */}
            {fullscreenIndex !== index && (
              <audio
                ref={(el) => (audioRefs.current[index] = el)}
                controls
                className="w-full mt-auto"
                onPlay={() => handlePlay(index)}
              >
                <source
                  src={`http://localhost:5000/audio/${track.file}`}
                  type="audio/mpeg"
                />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Audio;
