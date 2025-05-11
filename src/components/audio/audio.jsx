import React, { useEffect, useState, useRef } from 'react';

function Audio() {
  const [tracks, setTracks] = useState([]);
  const [fullscreenIndex, setFullscreenIndex] = useState(null);
  const audioRefs = useRef([]);
  const [isPlaying, setIsPlaying] = useState({});
  const fullscreenCardRef = useRef(null);

  useEffect(() => {
    // Fetch audio tracks from backend
    fetch('http://localhost:5000/tracks')
      .then((res) => res.json())
      .then((data) => setTracks(data))
      .catch((err) => console.error('Error fetching tracks:', err));
    
    // Create event listener for fullscreen changes
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && fullscreenIndex !== null) {
        setFullscreenIndex(null);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [fullscreenIndex]);

  // Handle play for a track
  const handlePlay = (index) => {
    // Update playing status
    setIsPlaying(prev => ({ ...prev, [index]: true }));
    
    // Pause all other tracks
    audioRefs.current.forEach((audio, i) => {
      if (audio && i !== index) {
        audio.pause();
        setIsPlaying(prev => ({ ...prev, [i]: false }));
      }
    });
    
    // Only enter fullscreen if not already there
    if (fullscreenIndex !== index) {
      enterFullscreen(index);
    }
  };

  // Handle pause for a track
  const handlePause = (index) => {
    setIsPlaying(prev => ({ ...prev, [index]: false }));
  };

  // Enter fullscreen mode
  const enterFullscreen = (index) => {
    fullscreenCardRef.current = document.getElementById(`card-${index}`);
    if (fullscreenCardRef.current) {
      if (fullscreenCardRef.current.requestFullscreen) {
        fullscreenCardRef.current.requestFullscreen().then(() => {
          setFullscreenIndex(index);
        }).catch(err => {
          console.error('Error attempting to enter fullscreen:', err);
        });
      } else if (fullscreenCardRef.current.webkitRequestFullscreen) {
        fullscreenCardRef.current.webkitRequestFullscreen();
        setFullscreenIndex(index);
      } else if (fullscreenCardRef.current.msRequestFullscreen) {
        fullscreenCardRef.current.msRequestFullscreen();
        setFullscreenIndex(index);
      }
    }
  };

  // Exit fullscreen mode
  const exitFullscreen = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Store the currently playing audio index before exiting fullscreen
    const currentIndex = fullscreenIndex;
    
    // Exit fullscreen
    if (document.exitFullscreen) {
      document.exitFullscreen().then(() => {
        // We'll update the state in the fullscreenchange event handler
      }).catch(err => {
        console.error('Error attempting to exit fullscreen:', err);
        setFullscreenIndex(null); // Update state anyway to stay in sync
      });
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    
    // Important: Ensure audio keeps playing by temporarily removing the onPlay handler
    // This prevents the audio element from pausing during the transition
    if (currentIndex !== null && audioRefs.current[currentIndex]) {
      const audioElement = audioRefs.current[currentIndex];
      
      // If the audio should be playing, ensure it continues
      if (isPlaying[currentIndex]) {
        // We use a timeout to ensure this happens after the fullscreen transition
        setTimeout(() => {
          if (!audioElement.paused) return; // Already playing, no need to interfere
          
          const playPromise = audioElement.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.log('Play prevented by browser:', error);
            });
          }
        }, 50);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🎵 Audio Gallery</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tracks.map((track, index) => {
          const isFullscreen = fullscreenIndex === index;
          
          return (
            <div
              key={index}
              id={`card-${index}`}
              className={`relative bg-white shadow-md rounded-lg p-4 flex flex-col items-center transition-all duration-300 ${
                isFullscreen
                  ? 'fixed inset-0 bg-black z-50 justify-center items-center'
                  : ''
              }`}
            >
              {/* Fullscreen close button */}
              {isFullscreen && (
                <button
                  className="absolute top-4 right-4 text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded z-50"
                  onClick={exitFullscreen}
                >
                  ✖ Close
                </button>
              )}

              {/* Track Image */}
              <img
                src={`http://localhost:5000/images/${track.image}`}
                alt={track.title}
                className={`object-cover rounded mb-4 ${
                  isFullscreen ? 'max-w-lg w-full' : 'w-full'
                }`}
              />

              {/* Track Title */}
              <h2 
                className={`text-2xl font-semibold text-center mb-4 ${
                  isFullscreen ? 'text-white' : 'text-gray-800'
                }`}
              >
                {track.title}
              </h2>

              {/* Audio Element - Single instance that changes position based on fullscreen state */}
              <div className={`w-full ${isFullscreen ? 'fixed bottom-0 left-0 right-0 bg-gray-900 p-4 shadow-inner z-50' : ''}`}>
                <div className={isFullscreen ? 'max-w-2xl mx-auto' : 'w-full'}>
                  <audio
                    ref={(el) => (audioRefs.current[index] = el)}
                    controls
                    className="w-full"
                    onPlay={() => handlePlay(index)}
                    onPause={() => handlePause(index)}
                    // Add the following to prevent re-mounting issues
                    key={`audio-${index}`}
                  >
                    <source
                      src={`http://localhost:5000/audio/${track.file}`}
                      type="audio/mpeg"
                    />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Audio;