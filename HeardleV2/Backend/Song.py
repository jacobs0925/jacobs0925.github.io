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

Song('https://youtu.be/77ZF50ve6rs', 'test','test')