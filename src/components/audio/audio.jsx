import React, { useEffect, useState, useRef } from 'react';

function Audio() {
  const [tracks, setTracks] = useState([]);
  const [fullscreenIndex, setFullscreenIndex] = useState(null);
  const audioRefs = useRef([]);

  useEffect(() => {
    // Fetch tracks
    fetch('http://localhost:5000/tracks')
      .then(res => res.json())
      .then(data => setTracks(data))
      .catch(err => console.error('Error fetching tracks:', err));

    // Handle fullscreen change
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setFullscreenIndex(null);
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handlePlay = (index) => {
    // Pause other audio
    audioRefs.current.forEach((audio, i) => {
      if (audio && i !== index) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    // Fullscreen the card
    const card = document.getElementById(`card-${index}`);
    if (card.requestFullscreen) card.requestFullscreen();
    else if (card.webkitRequestFullscreen) card.webkitRequestFullscreen();
    else if (card.msRequestFullscreen) card.msRequestFullscreen();
    setFullscreenIndex(index);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🎵 Audio Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tracks.map((track, index) => (
          <div
            key={index}
            id={`card-${index}`}
            className={`bg-white shadow-md rounded-lg p-4 flex flex-col ${
              fullscreenIndex === index ? 'overflow-y-auto min-h-screen bg-black' : ''
            }`}
          >
            <img
              src={`http://localhost:5000/images/${track.image}`}
              alt={track.title}
              className="w-full object-cover rounded mb-4"
            />
            <h2 className="text-lg font-semibold text-center mb-2">{track.title}</h2>
            <audio
              ref={(el) => (audioRefs.current[index] = el)}
              controls
              className="w-full mt-auto"
              onPlay={() => handlePlay(index)}
            >
              <source src={`http://localhost:5000/audio/${track.file}`} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Audio;