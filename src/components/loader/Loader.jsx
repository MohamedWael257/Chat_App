import icon from "../../assets/icon.png";
import loader from "../../assets/puff.svg";
function Loader() {
    return (
        <div className="bg-slate-100 dark:bg-stone-800 min-h-screen w-screen absolute top-0 left-0 z-50 flex justify-center items-center text-center flex-col">
            <div className="flex gap-4 items-center mb-8 dark:bg-stone-800">
                <img src={icon} className="w-10" />
                <h1 className="font-black text-slate-700 dark:text-white text-2xl">ChatApp</h1>
            </div>
            <img src={loader} alt="Loader" />
        </div>
    );
}

export default Loader;