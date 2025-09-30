(() => {
    const lastfmApiKey = '1f3e0e1f0032d07e4ee985e902dd7445';

    const fetchArtistInfo = (artist) => {
        const method = 'artist.getInfo';
        const url = `https://ws.audioscrobbler.com/2.0/?method=${method}&artist=${encodeURIComponent(artist)}&api_key=${lastfmApiKey}&format=json`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const output = document.getElementById('artistInfo');
                if (!output) {
                    console.error('Element with ID "artistInfo" not found.');
                    return;
                }
                if (data.error) {
                    output.innerHTML = `Error ${data.error}: ${data.message}`;
                } else {
                    output.innerHTML = `<h2>Artist Info: ${data.artist.name}</h2>
                                        <p>${data.artist.bio.summary}</p>`;
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                const output = document.getElementById('artistInfo');
                if (output) {
                    output.innerHTML = `Fetch error: ${error.message}`;
                }
            });
    };

    const fetchArtistTopAlbums = (artist) => {
        const method = 'artist.getTopAlbums';
        const url = `https://ws.audioscrobbler.com/2.0/?method=${method}&artist=${encodeURIComponent(artist)}&api_key=${lastfmApiKey}&format=json`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const output = document.getElementById('artistTopAlbums');
                if (!output) {
                    console.error('Element with ID "artistTopAlbums" not found.');
                    return;
                }
                if (data.error) {
                    output.innerHTML = `Error ${data.error}: ${data.message}`;
                } else {
                    let albums = '<h2>Top Albums:</h2><ul>';
                    data.topalbums.album.forEach(album => {
                        albums += `<li>${album.name}</li>`;
                    });
                    albums += '</ul>';
                    output.innerHTML = albums;
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                const output = document.getElementById('artistTopAlbums');
                if (output) {
                    output.innerHTML = `Fetch error: ${error.message}`;
                }
            });
    };

    const fetchSimilarArtists = (artist) => {
        const method = 'artist.getSimilar';
        const url = `https://ws.audioscrobbler.com/2.0/?method=${method}&artist=${encodeURIComponent(artist)}&api_key=${lastfmApiKey}&format=json`;


        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const output = document.getElementById('similarArtists');
                if (!output) {
                    console.error('Element with ID "similarArtists" not found.');
                    return;
                }
                if (data.error) {
                    output.innerHTML = `Error ${data.error}: ${data.message}`;
                } else {
                    let artists = '<h2>Similar Artists:</h2><ul>';
                    data.similarartists.artist.forEach(artist => {
                        artists += `<li>${artist.name}</li>`;
                    });
                    artists += '</ul>';
                    output.innerHTML = artists;
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                const output = document.getElementById('similarArtists');
                if (output) {
                    output.innerHTML = `Fetch error: ${error.message}`;
                }
            });
    };

    const fetchTopTracks = (artist) => {
        const method = 'artist.getTopTracks';
        const url = `https://ws.audioscrobbler.com/2.0/?method=${method}&artist=${encodeURIComponent(artist)}&api_key=${lastfmApiKey}&format=json`;


        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const output = document.getElementById('topTracks');
                if (!output) {
                    console.error('Element with ID "topTracks" not found.');
                    return;
                }
                if (data.error) {
                    output.innerHTML = `Error ${data.error}: ${data.message}`;
                } else {
                    let tracks = '<h2>Top Tracks:</h2><ul>';
                    data.toptracks.track.forEach(track => {
                        tracks += `<li>${track.name}</li>`;
                    });
                    tracks += '</ul>';
                    output.innerHTML = tracks;
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                const output = document.getElementById('topTracks');
                if (output) {
                    output.innerHTML = `Fetch error: ${error.message}`;
                }
            });
    };

    document.getElementById('artistForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const artist = document.getElementById('artistInput').value;
        fetchArtistInfo(artist);
        fetchArtistTopAlbums(artist);
        fetchSimilarArtists(artist);
        fetchTopTracks(artist);
    });

})();
