import { Radar } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { ConversationItem } from "./conversation-item";

interface ChatMessage {
  uId: string;
  user: boolean;
  message: string;
}

export const ConversationSheet = () => {
  const [message, setMessage] = useState<string>("");
  const [conversationData, setConversationData] = useState<ChatMessage[]>([]);
  //   const [replyConversationData, setReplyConversationData] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  //  const router = useRouter();
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      // Call your function here
      handleConversation();
    }
  };

  const handleConversation = async () => {
    console.log(message);
    const uId = uuidv4();
    const values = {
      uId: uId,
      user: true,
      message: message,
    };
    if (message) {
      setIsLoading(true);
      updateConversation(values);
      const axios = require("axios");
      const info_assistant_id = sessionStorage.getItem("info_assistant_id");
      const info_thread_id = sessionStorage.getItem("info_thread_id");
      const retrieval_assistant_id = sessionStorage.getItem(
        "retrieval_assistant_id"
      );
      const retrieval_thread_id = sessionStorage.getItem("retrieval_thread_id");
      let data = JSON.stringify({
        user_msg: `${message}`,
        session_storage: {
          info_assistant_id: `${info_assistant_id}`,
          info_thread_id: `${info_thread_id}`,
          retrieval_assistant_id: `${retrieval_assistant_id}`,
          retrieval_thread_id: `${retrieval_thread_id}`,
        },
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://ec2-13-127-111-137.ap-south-1.compute.amazonaws.com/api/completions",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response: { data: any }) => {
          setIsLoading(false);

          sessionStorage.setItem(
            "info_assistant_id",
            response.data.session_data.info_assistant_id
          );
          sessionStorage.setItem(
            "info_thread_id",
            response.data.session_data.info_thread_id
          );
          if (response.data.session_data.retrieval_assistant_id) {
            sessionStorage.setItem(
              "retrieval_assistant_id",
              response.data.session_data.retrieval_assistant_id
            );
          }
          if (response.data.session_data.retrieval_thread_id) {
            sessionStorage.setItem(
              "retrieval_thread_id",
              response.data.session_data.retrieval_thread_id
            );
          }

          const replyValues = {
            uId: uuidv4(),
            user: false,
            message: response.data.message,
          };

          updateConversation(replyValues);
          //   console.log((response.data.session_data.info_assistant_id));
        })
        .catch((error: any) => {
          setIsLoading(false);
          console.log(error);
        });

      setMessage("");
    } else {
      alert("Please Enter a Message");
    }
  };

  const updateConversation = (newMessage: ChatMessage) => {
    setConversationData((prevData) => [...prevData, newMessage]);
  };

  const handleEndChat = async () => {
    // sessionStorage.setItem("retrieval_assistant_id","asst_rm7nG0230AIW6rTJWDNBF0hB"); 
    console.log("retrieval_assistant_id: " + sessionStorage.getItem("retrieval_assistant_id"));
    const axios = require("axios");
    const res = await axios.get('http://ec2-13-127-111-137.ap-south-1.compute.amazonaws.com/api/bg-lead-qualifier', { params: { retrieval_assistant_id: sessionStorage.getItem("retrieval_assistant_id") } });
    res.data.status; // { answer: 42 }
    console.log("end chat: " + res.data.status);
    setIsLoading(true);
    setConversationData([]);
    sessionStorage.setItem("info_assistant_id", "");
    sessionStorage.setItem("info_thread_id", "");
    sessionStorage.setItem("retrieval_assistant_id", "");
    sessionStorage.setItem("retrieval_thread_id", "");
    setIsLoading(false);
    console.log("retrieval_assistant_id: " + sessionStorage.getItem("retrieval_assistant_id"));
  };

  return (
    <>
      <div className=" conversationContainer bg-accent h-[90%]  overflow-scroll flex flex-col items-start justify-end ">
        {!conversationData[0] && (
          <h1 className="text-center text-indigo-700/90 w-[100%] text-[2rem]  font-bold tracking-tighter mb-[200px] flex justify-center items-center ">
            <Radar size={36} className="mx-2 text-black" />
            How Can I Help You?
          </h1>
        )}

        {conversationData?.map((item, index) => (
          <ConversationItem
            key={index}
            uId={item?.uId}
            user={item?.user}
            message={item?.message}
          ></ConversationItem>
        ))}
        {isLoading && (
          <div className="flex justify-end  items-center w-full pr-[30px]  mb-[10px]">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500 "></div>
          </div>
        )}
      </div>
      <div className="flex flex-1 justify-center items-center h-[10%] ">
        <Input
          disabled={isLoading}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message Here..."
          className="mx-2 border-[3px] border-indigo-500"
        />
        <Button
          onClick={handleConversation}
          variant="conversation"
          className="mx-2"
          disabled={isLoading}
        >
          Enter
        </Button>
        <Button onClick={handleEndChat} variant="conversation" className="mx-2">
          End Chat
        </Button>
      </div>
    </>
  );
};
