"use client";

import ShowImage from "@/components/ShowImage";
import { ChangeEvent, useState } from "react";

export default function Home() {

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

    const applySobel = (imageData:ImageData) => {
      const data = imageData.data;
      const width = imageData.width;
      const height = imageData.height;

      const outputData = new Uint8ClampedArray(data.length);


      // sobel operator kernels

      const sobelX = [-1,0,1,-2,0,2,-1,0,1];
      const sobelY = [-1,-2,-1,0,0,0,1,2,1];

      for(let y=1;y<height-1;y++) {
        for(let x=1;x<width-1;x++) {
          let sumX =0;
          let sumY = 0;

          for(let j=0;j<3;j++) {
            for(let i=0;i<3;i++) {
              const pixelX = (x+i-1);
              const pixelY = (y+j-1);
              const offset = (pixelY*width + pixelX) * 4;
              const value = data[offset];

              sumX += value * sobelX[i + j * 3];
              sumY += value * sobelY[i + j * 3];
            }
          }

          const offset = (y*width+x) * 4;
          const magnitude = Math.sqrt(sumX * sumX + sumY * sumY);

          outputData[offset] = magnitude;
          outputData[offset + 1] = magnitude;
          outputData[offset + 2] = magnitude;
          outputData[offset + 3] = 255; // alpha channel
        }
      }

      return new ImageData(outputData,width,height);
    }
  

  const handleImageLoad = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas?.getContext('2d');
    const img = new Image();
    img.src = image;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img,0,0,img.width,img.height);

      const imageData = ctx.getImageData(0,0,canvas?.width,canvas?.height)
      const edges = applySobel(imageData);

      ctx.putImageData(edges,0,0);
    }
   
  }
  return (
    <div className="flex flex-col ">
      <h1 className="text-center font-bold text-red-700">Edge Detection using Canny operator</h1>

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
