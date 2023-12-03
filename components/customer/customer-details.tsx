
interface CustomerDetailsProps {
  userName:string;
  userPhone:string;
  callSummary: string;
  customerIntent: string;
  customerNeed: string;
  customerSentiment: string;
  noClaimBonus: string;
  paymentOption: string;
  previousPolicy: string;
  qualityOfLead: string;
  reasonOfConversation: string;
  typeOfInsurance: string;
  vehicleType: string;
  
}

export const CustomerDetails = ({
  userName,
  userPhone,
callSummary,
customerIntent,
customerNeed,
customerSentiment,
noClaimBonus,
paymentOption,
previousPolicy,
qualityOfLead,
reasonOfConversation,
typeOfInsurance,
vehicleType,

}:CustomerDetailsProps) => {
  console.log(callSummary)
  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center">
        <div className="border-2 w-[40%] h-[150px] p-2 m-1 flex flex-col justify-between item-center">
          <p className="text-md font-bold tracking-tight text-indigo-500 ">
            Customer Details
          </p>
          <div className="text-[#737373] font-medium text-sm  ">
            <div className="flex  ">
              <p className="w-[50%]">Name:</p>
              <p className="w-[50%]">{userName}</p>
            </div>
            <div className="flex ">
              <p className="w-[50%]">Phone:</p>
              <p className="w-[50%]">{userPhone}</p>
            </div>
            <div className="flex ">
              <p className="w-[50%]">Insurance Type:</p>
              <p className="w-[50%]">{typeOfInsurance}</p>
            </div>
            <div className="flex ">
              <p className="w-[50%]">No Claim Bonus:</p>
              <p className="w-[50%]">{noClaimBonus}</p>
            </div>
          </div>
        </div>
        <div className="border-2 w-[60%] h-[150px] p-2 m-1 flex flex-col justify-between item-center">
            <div>

          <p className="text-md font-bold tracking-tight text-indigo-500 ">
            {" "}
            Call Summary
          </p>
          {/* <p className="text-md font-bold tracking-tight text-[#737373] ">15/10/2023</p> */}
            </div>
          <p className="text-sm ">
         {callSummary}
          </p>
        </div>
      </div>
      <div>
        <p className="text-md font-bold tracking-tight text-indigo-500 p-2 border-2 mx-1">Customer Intent: {customerIntent}</p>
      </div>
      <div>
      <div className="border-2 w-full flex-1 p-2 m-1 flex flex-col justify-between item-center">
          <p className="text-md font-bold tracking-tight text-indigo-500 ">
            Customer Details
          </p>
          <div className="text-[#737373] font-medium text-sm  ">
            <div className="flex  ">
              <p className="w-[30%]">customer Need:</p>
              <p >{customerNeed}</p>
            </div>
            <div className="flex ">
              <p className="w-[30%]">customer Sentiment</p>
              <p >{customerSentiment}</p>
            </div>
            <div className="flex ">
              <p className="w-[30%]">Payment:</p>
              <p >{paymentOption}</p>
            </div>
            <div className="flex ">
              <p className="w-[30%]">vehicle Type</p>
              <p >{vehicleType}</p>
            </div>
            <div className="flex ">
              <p className="w-[30%]">Previous Policy</p>
              <p >{previousPolicy}</p>
            </div>
            <div className="flex ">
              <p className="w-[30%]">Quality of Lead</p>
              <p >{qualityOfLead}</p>
            </div>
            <div className="flex ">
              <p className="w-[30%]">Conversation Reason</p>
              <p >{reasonOfConversation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
