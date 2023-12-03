"use client";


import "./page.css";
import { useEffect } from "react";
import { ConversationSheet } from "@/components/conversation/conversation-sheet";
function Conversation() {


  useEffect(() => {
    const container = document.querySelector(".conversationContainer");
    container?.scrollTo(0, container.scrollHeight);

    sessionStorage.setItem("info_assistant_id", "");
    sessionStorage.setItem("info_thread_id", "");
    sessionStorage.setItem("retrieval_assistant_id", "");
    sessionStorage.setItem("retrieval_thread_id", "");
  }, []);
 






  return (
    <div>
      <div className="h-[90vh] w-[70vw] m-auto ">
      
        <ConversationSheet/>
  
      </div>
    </div>
  );
}

export default Conversation;
