"use client";
import ShowImage from '@/components/ShowImage';
import { load, gaussianBlur, sobelFilter, nonMaximumSuppression, hysteresis } from 'image-js';
import { ChangeEvent, useRef, useState } from 'react';

const Page = () => {

    const canvasRef = useRef();
    const [image,setImage] = useState<string|null>(null);

    const handleImage = (e:ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const render = new FileReader();
    
        render.onload = () => {
          setImage(render.result as string);
        }
    
        if(file) {
          render.readAsDataURL(file);
        }
      }

     const handleImageLoad = async () => {
       // Load the image (replace with the actual path to your image file)
       const img = await load('/path/to/your/image.jpg');
        
       // Convert the image to grayscale
       const grayscaleImage = img.grey();

       // Apply Gaussian blur
       const blurredImage = gaussianBlur(grayscaleImage, 1);

       // Apply Sobel filter for gradient calculation
       const { gradientX, gradientY } = sobelFilter(blurredImage);

       // Calculate gradient magnitude
       const gradientMagnitude = gradientX.hypotenuse(gradientY);

       // Perform non-maximum suppression
       const suppressedImage = nonMaximumSuppression(gradientMagnitude, gradientX, gradientY);

       // Apply hysteresis for edge tracking
       const threshold = 20; // Adjust the threshold value as needed
       const edges = hysteresis(suppressedImage, threshold);

       // Draw the result on the canvas
       const canvas = canvasRef.current;
       const ctx = canvas.getContext('2d');
       ctx.drawImage(edges.toImageData(), 0, 0);


     }
  return (
    
    <div className="flex flex-col ">
      <h1 className="text-center font-bold text-red-700">Edge Detection using sobel operator</h1>

    <div className="flex justify-around text-white">
      <div className="flex flex-col justify-evenly">
        <label htmlFor="input" className=" bg-purple-400 rounded-lg w-60 text-center">Choose file</label>
        <input type="file" onChange={handleImage} id="input" className="hidden"/>
        {image && <ShowImage src={image} width={300} height={300}/>}
        {image && <button onClick={handleImageLoad} className=" bg-purple-400 rounded-lg w-60">Apply Edge detection</button>}
      </div>

      <div className="flex flex-col">
        <canvas id = "canvas"></canvas>
      </div>
      </div>


    </div>
  )
}

export default Page