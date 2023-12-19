import Image from "next/image";

interface Props {
    src:string;
    width:number;
    height:number;
}

const ShowImage = ({src,width,height}:Props) => {
  return (
    <Image src={src} alt={"display"} width={width} height={height}/>
  )
}

export default ShowImage