import subprocess
import os
import sys

try:
    ffmpeg_path = os.path.join(os.getcwd(), 'node_modules', 'ffmpeg-static', 'ffmpeg.exe')
    print(f"Checking ffmpeg at: {ffmpeg_path}")
    if not os.path.exists(ffmpeg_path):
        print("FFmpeg not found at path!")
    
    video_path = os.path.join('public', 'Tiguan3.mp4')
    print(f"Checking video at: {video_path}")
    if not os.path.exists(video_path):
        print("Video not found at path!")
        
    result = subprocess.run([ffmpeg_path, '-i', video_path], capture_output=True, text=True)
    with open('info_v2.txt', 'w', encoding='utf-8') as f:
        f.write(result.stderr or "No stderr")
    print("Done")
except Exception as e:
    print(f"Error: {e}")
