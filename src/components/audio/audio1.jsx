import React, { useEffect, useState, useRef } from 'react';

function Audio() {
  const [tracks, setTracks] = useState([]);
  const [filteredTracks, setFilteredTracks] = useState([]);
  const [volumeFilter, setVolumeFilter] = useState(null);
  const [fullscreenIndex, setFullscreenIndex] = useState(null);
  const audioRefs = useRef([]);
  const [isPlaying, setIsPlaying] = useState({});
  const fullscreenCardRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/tracks/27/mar')
      .then((res) => res.json())
      .then((data) => {
        setTracks(data);

        const volumes = [...new Set(data.map(t => t.volume))].sort((a, b) => b - a);
        const latest = volumes[0];
        setVolumeFilter(latest);
        setFilteredTracks(data.filter(track => track.volume === latest));
      })
      .catch((err) => console.error('Error fetching tracks:', err));

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

  useEffect(() => {
    setFilteredTracks(tracks.filter(track => track.volume === volumeFilter));
  }, [volumeFilter, tracks]);

  const handlePlay = (index) => {
    setIsPlaying(prev => ({ ...prev, [index]: true }));

    audioRefs.current.forEach((audio, i) => {
      if (audio && i !== index) {
        audio.pause();
        setIsPlaying(prev => ({ ...prev, [i]: false }));
      }
    });

    if (fullscreenIndex !== index) {
      enterFullscreen(index);
    }
  };

  const handlePause = (index) => {
    setIsPlaying(prev => ({ ...prev, [index]: false }));
  };

  const enterFullscreen = (index) => {
    fullscreenCardRef.current = document.getElementById(`card-${index}`);
    if (fullscreenCardRef.current) {
      const request = fullscreenCardRef.current.requestFullscreen ||
                      fullscreenCardRef.current.webkitRequestFullscreen ||
                      fullscreenCardRef.current.msRequestFullscreen;

      if (request) {
        request.call(fullscreenCardRef.current)
          .then(() => setFullscreenIndex(index))
          .catch(err => {
            console.error('Error entering fullscreen:', err);
          });
      }
    }
  };

  const exitFullscreen = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const currentIndex = fullscreenIndex;

    const exit = document.exitFullscreen ||
                 document.webkitExitFullscreen ||
                 document.msExitFullscreen;

    if (exit) {
      exit.call(document).catch(err => {
        console.error('Error exiting fullscreen:', err);
        setFullscreenIndex(null);
      });
    }

    if (currentIndex !== null && audioRefs.current[currentIndex]) {
      const audio = audioRefs.current[currentIndex];
      if (isPlaying[currentIndex]) {
        setTimeout(() => {
          if (audio.paused) {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
              playPromise.catch(error => {
                console.log('Play prevented by browser:', error);
              });
            }
          }
        }, 50);
      }
    }
  };

  const handleLanguageRedirect = (language) => {
    const languageUrls = {
      english: 'http://localhost:3000/audio/V27/eng',
      hindi: 'http://localhost:3000/audio/V27/hin',
      marathi: 'http://localhost:3000/audio/V27/mar'
    };
    
    window.location.href = languageUrls[language];
  };

  const availableVolumes = [...new Set(tracks.map(t => t.volume))].sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-mist-texture p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🎵 Audio Gallery</h1>

      {/* Language navigation buttons */}
      <div className="flex justify-center mb-6 flex-wrap gap-2">
        <button
          onClick={() => handleLanguageRedirect('english')}
          className="px-4 py-2 rounded bg-white text-gray-800 border hover:bg-firefly hover:text-mist"
        >
          English
        </button>
        <button
          onClick={() => handleLanguageRedirect('hindi')}
          className="px-4 py-2 rounded bg-white text-gray-800 border hover:bg-firefly hover:text-mist"
        >
          Hindi
        </button>
        <button
          onClick={() => handleLanguageRedirect('marathi')}
          className="px-4 py-2 rounded bg-white text-gray-800 border hover:bg-firefly hover:text-mist"
        >
          Marathi
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-1">
        {filteredTracks.map((track, index) => {
          const isFullscreen = fullscreenIndex === index;

          return (
            <div
              key={index}
              id={`card-${index}`}
              className={`relative bg-white hover:bg-mist shadow-md rounded-lg px-4 flex items-center transition-all duration-300 ${isFullscreen
                ? 'flex-col fixed inset-0 bg-black z-50 justify-center items-center'
                : 'flex-row gap-x-4'
                }`}
            >
              {isFullscreen && (
                <button
                  className="absolute top-4 right-4 text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded z-50"
                  onClick={exitFullscreen}
                >
                  ✖ Close
                </button>
              )}

              <img
                src={`http://localhost:5000/images/${track.image}`}
                alt={track.title}
                className={`object-cover rounded my-2 ${isFullscreen ? 'lg:max-w-md max-w-lg w-full' : 'w-8'}`}
              />

              <div className='flex flex-row items-center w-full'>
                <h2
                  className={`font-semibold w-full text-gray-800 text-center ${isFullscreen ? 'text-2xl mb-4' : 'text-xl mb-2'}`}
                >
                  {track.title}
                </h2>

                <div className={`w-2/3 ${isFullscreen ? 'fixed bottom-0 left-0 right-0 p-4 shadow-inner z-50' : ''}`}>
                  <div className={isFullscreen ? 'max-w-2xl mx-auto' : 'w-full'}>
                    <audio
                      ref={(el) => (audioRefs.current[index] = el)}
                      controls
                      className={`w-full ${isFullscreen ? '' : 'h-10'}`}
                      onPlay={() => handlePlay(index)}
                      onPause={() => handlePause(index)}
                      key={`audio-${index}`}
                    >
                      <source
                        src={`http://localhost:5000/audio/27/mar/${track.file}`}
                        type="audio/mpeg"
                      />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
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