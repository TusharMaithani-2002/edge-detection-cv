const Home = () => {
    return (
        <div className="h-full flex flex-col justify-evenly">
            <h1 className="text-center text-red-700 font-bold mb-10">
                This is Comupter vision Project
            </h1>
           
           <p className="text-center mb-10">In this application we are using Nextjs or basically javascript to perform some computer vision concepts</p>

           <div className="text-center">
            <p>Implementing using canny and sobel operator</p>

            <h3 className="font-bold text-red-700">Team Member</h3>
            <ul>
                <li>Tushar Maithani (202051194)</li>
                <li>Ayush Singh (202051042)</li>
                <li>Abhishek Yadav (202051004)</li>
                <li>Haja Ram (202051078)</li>
                <li>Dinesh Kumar (20205213)</li>
            </ul>
           </div>

        </div>
    )
};


export default Home;