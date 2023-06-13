from __future__ import annotations
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import requests
import io
from pytube import YouTube

class Song:
    artist: str
    title: str
    song_addr: str
    error: str
    
    def to_dict(self):
        self_dict = {}
        
        self_dict['artist'] = self.artist
        self_dict['title'] = self.title
        self_dict['song_addr'] = self.song_addr
        self_dict['error'] = self.error
        
        return self_dict
        
    def YTtomp3(self, youtube_url):
        audio_file = ""
        exception = ""
        
        try:
            # Create a PyTube YouTube object using the URL
            video = YouTube(youtube_url, use_oauth=True, allow_oauth_cache=True)
            # Get the first available audio stream and download it
            audio_stream = video.streams.filter(only_audio=True).order_by('bitrate').first()
            audio_file = audio_stream.download(filename="TempFile.mp3")
        except Exception as e:
            exception = str(e)

        return (audio_file, exception)
    
    def __init__(self, url: str, artist: str, title: str):
        song_addr, exception = self.YTtomp3(url)
        
        self.song_addr = song_addr
        self.artist = artist
        self.title = title
        self.error = exception
        
        
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

# Set up your Spotify API credentials
client_id = 'ef254e2bf7df4ee687c4c99ea5f8978b'
client_secret = '1766af344baf4ed1b1f72d634c04a7e9'

# Create an instance of the Spotify client
auth_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
spotify = spotipy.Spotify(auth_manager=auth_manager)

def getAlbumArtLinks(artist_name, song_name):
    results = spotify.search(q=f"track:{song_name} artist:{artist_name}", type='track', limit=1)

    # Check if any results were found
    if results['tracks']['items']:
        track = results['tracks']['items'][0]
        album = track['album']
        track_url = track['external_urls']['spotify']
        album_art_url = album['images'][0]['url']  # Get the URL of the first album art image

        return track_url, album_art_url
    else:
        print("Song not found.")
        
print(getAlbumArtLinks('SZA', 'Love Galore'))
Song('https://youtu.be/YJV-4IyNUfA', 'test','test')