import sys
import subprocess
import numpy as np
from rembg import remove
from PIL import Image
import os
import shutil

# Configuration
input_video = os.path.join('public', 'Tiguan3.mp4')
output_folder = os.path.join('public', 'tiguan_frames')
ffmpeg_path = os.path.join(os.getcwd(), 'node_modules', 'ffmpeg-static', 'ffmpeg.exe')

width = 1280
height = 704
start_time = '10'

# Clean/Create output
if os.path.exists(output_folder):
    shutil.rmtree(output_folder)
os.makedirs(output_folder, exist_ok=True)

print(f"Processing {input_video}...")
print(f"Output: {output_folder}")
print(f"Resolution: {width}x{height}")

command = [
    ffmpeg_path,
    '-i', input_video,
    '-ss', start_time,
    '-an',
    '-f', 'rawvideo',
    '-pix_fmt', 'rgb24',
    '-'
]

process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL, bufsize=10**8)

frame_size = width * height * 3
frame_count = 0

try:
    while True:
        raw_frame = process.stdout.read(frame_size)
        if len(raw_frame) != frame_size:
            break
        
        # Create image from raw bytes
        img = Image.frombytes('RGB', (width, height), raw_frame)
        
        # Remove background
        # rembg remove takes PIL image and returns PIL image (RGBA)
        output = remove(img)
        
        # Save
        filename = f"output-{frame_count:03d}.png"
        output_path = os.path.join(output_folder, filename)
        output.save(output_path)
        
        sys.stdout.write(f"\rProcessed frame {frame_count}")
        sys.stdout.flush()
        frame_count += 1

    print(f"\nDone. Processed {frame_count} frames.")
    
except Exception as e:
    print(f"\nError: {e}")
finally:
    process.stdout.close()
    process.wait()
