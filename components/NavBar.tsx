import Link from "next/link";


const NavBar = () => {
    return (
        <div className="bg-purple-700 w-full h-[50px] flex justify-between px-5 py-2 text-white">
            <Link href="/">
            <div className="text-center">CV Project</div>
            </Link>
            <div className="text-white flex justify-around gap-x-4">
                <Link href="/edge-detection-sobel">
                <span>Sobel operator</span>
                </Link>
                <Link href="/canny">
                <span>Canny operator</span>
                </Link>
            </div>
        </div>
    )
};

export default NavBar;