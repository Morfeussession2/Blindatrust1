import subprocess
import os

ffmpeg_path = os.path.join(os.getcwd(), 'node_modules', 'ffmpeg-static', 'ffmpeg.exe')
frames_pattern = os.path.join('public', 'tiguan_frames', 'output-%03d.png')
output_video = os.path.join('public', 'Tiguan3_transparent.webm')

cmd = [
    ffmpeg_path,
    '-framerate', '30',
    '-i', frames_pattern,
    '-c:v', 'libvpx-vp9',
    '-pix_fmt', 'yuva420p',
    '-b:v', '2000k',
    '-y',
    output_video
]

print(f"Running: {' '.join(cmd)}")
process = subprocess.run(cmd, capture_output=True, text=True)

if process.returncode != 0:
    print("Error creating video:")
    print(process.stderr)
else:
    print("Video created successfully.")
    print(process.stderr) # ffmpeg writes progress to stderr
