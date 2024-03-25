import ChatHeader from "../chatheader/ChatHeader";
import Chats from "../chats/Chats";
import Input from "../input/Input";
import Logo from "../logo/Logo";
function MainContent({ selectedUser }) {
    return (
        <>
            {selectedUser ? (
                <div className="relative">
                    <ChatHeader user={selectedUser} />
                    <Chats selectedUser={selectedUser} />
                    <Input selectedUser={selectedUser} />
                    {/* <ChatPartnerHeader user={selectedUser} />
          <Chats selectedUser={selectedUser} />
          <Input selectedUser={selectedUser} /> */}
                </div>
            ) : (
                <div className="bg-slate-200  dark:bg-stone-800  dark:text-white h-full flex justify-center items-center text-center flex-col">
                    <Logo />
                    <p className="mt-8">Click on the user to start chatting...</p>
                </div>
            )}
        </>
    );
}

export default MainContent;