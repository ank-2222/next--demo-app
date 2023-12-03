import { Bot, User } from "lucide-react";

interface conversationItemProps {
  uId: String;
  user: boolean;
  message: String;
}

export const ConversationItem = ({
  uId,
  user,
  message,
}: conversationItemProps) => {
  return (
    <div className="w-full" >
      {user && (
        <p className=" ml-[10px] pt-[10px] text-zinc-600 font-black tracking-tight text-md capitalize flex items-center justify-start w-full">
          <User size={30} /> {" "}<span className="w-fit max-w-[80%] bg-gray-300  px-4 py-2 font-bold  ml-[10px]  lowercase rounded-[8px] "> {" "}{message}</span>
        </p>
      )}
      {!user && (
        <p className="mr-[10px] pt-[10px]  text-zinc-600 font-black tracking-tight text-md capitalize flex items-center justify-end w-[full]">
         {" "}<span className="w-fit max-w-[80%] bg-gray-300  px-4 py-2 font-bold  mr-[10px]  lowercase rounded-[8px]"> {" "}{message}</span>{" "} <Bot size={30}  /> 
        </p>
      )}
    </div>
  );
};
