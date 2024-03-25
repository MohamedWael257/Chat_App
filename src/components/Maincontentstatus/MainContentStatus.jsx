import Logo from "../logo/Logo";
import { AiOutlineArrowLeft } from 'react-icons/ai'
function MainContentStatus({ selectedStatus, setSelectedStatus }) {

    return (
        <>
            {selectedStatus ? (
                <div className="relative w-[400px]  dark:bg-stone-800 ">
                    <AiOutlineArrowLeft size={40} className=' dark:text-white ' onClick={() => setSelectedStatus(null)} />
                    {
                        selectedStatus.type !== "video/mp4" ?
                            <img src={selectedStatus.image} className='' alt="" />
                            : <video src={selectedStatus.image} className='' autoPlay controls />
                    }
                </div>
            ) : (
                <div className="bg-slate-200 dark:bg-stone-800 h-full flex justify-center items-center text-center flex-col">
                    <Logo />
                    <p className="mt-8 dark:text-white">Click on the user to see the stories...</p>
                </div>
            )}
        </>
        //     <>
        //         {selectedStatus ? (
        //             <div className="relative w-[400px]  dark:bg-stone-800 ">
        //                 <AiOutlineArrowLeft size={40} className=' dark:text-white ' onClick={() => setSelectedStatus(null)} />
        //                 {
        //                     selectedStatus.type !== "video/mp4" ?
        //                         <img src={selectedStatus.image} className='' alt="" />
        //                         : <video src={selectedStatus.image} className='' autoPlay controls />
        //                 }
        //             </div>
        //         ) : (
        //             <div className="bg-slate-200 dark:bg-stone-800 h-full flex justify-center items-center text-center flex-col">
        //                 <Logo />
        //                 <p className="mt-8 dark:text-white">Click on the user to see the stories...</p>
        //             </div>
        //         )}
        //     </>
    );
}

export default MainContentStatus;