import os
from PIL import Image

# Force PIL to initialize and load all image plugins (including JPEG and PDF)
Image.init()

def compile_images_to_pdf(folder_path, output_pdf_name):
    # Find all slide images in the folder
    files = [f for f in os.listdir(folder_path) if f.startswith("slide_") and f.endswith(".png")]
    # Sort files by name to maintain correct slide order
    files.sort()
    
    if not files:
        print("No slide images found in the directory!")
        return
    
    print(f"Found {len(files)} slide images. Compiling...")
    
    # Open images and convert to RGB (since PIL requires RGB to save as PDF)
    images = []
    for f in files:
        img_path = os.path.join(folder_path, f)
        img = Image.open(img_path)
        if img.mode != 'RGB':
            img = img.convert('RGB')
        images.append(img)
    
    # Save as PDF
    output_path = os.path.join(folder_path, output_pdf_name)
    images[0].save(output_path, save_all=True, append_images=images[1:])
    print("Successfully compiled slides into PDF.")

if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    compile_images_to_pdf(script_dir, "smart_cushion_presentation.pdf")
