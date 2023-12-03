import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { CustomerDetails } from "./customer-details";

interface CustomerDataType {
  customer_need: string;
  info_assistant_id: string;
  info_thread_id: string;
  retrieval_assistant_id: string;
  retrieval_thread_id: string;
  user_id: number;
  user_name: string;
  user_phone: string;
}

export const CustomerTable = () => {
  const [customerData, setCustomerData] = useState<CustomerDataType[]>([]);

  const [callSummary, setCallSummary] = useState("");
  const [customerIntent, setCustomerIntent] = useState("");
  const [customerNeed, setCustomerNeed] = useState("");
  const [customerSentiment, setCustomerSentiment] = useState("");
  const [noClaimBonus, setNoClaimBonus] = useState("");
  const [paymentOption, setPaymentOption] = useState("");
  const [previousPolicy, setPreviousPolicy] = useState("");
  const [qualityOfLead, setQualityOfLead] = useState("");
  const [reasonOfConversation, setReasonOfConversation] = useState("");
  const [typeOfInsurance, setTypeOfInsurance] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [userName, setUserName] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const [callHistory, setCallHistory] = useState("");
  const fetchCustomerData = async () => {
    const axios = require("axios");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://ec2-13-127-111-137.ap-south-1.compute.amazonaws.com/api/get-basic-user-data",
      headers: {},
    };

    axios
      .request(config)
      .then((response: { data: any }) => {
        setCustomerData(response.data.user_data);
        // console.log(response.data.user_data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCustomerData();
  }, []);

  const handleUserInfo = (retrieval_assistant_id: string) => () => {
    const axios = require("axios");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://ec2-13-127-111-137.ap-south-1.compute.amazonaws.com/api/get-all-user-data?retrieval_assistant_id=${retrieval_assistant_id}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response: { data: any }) => {
        setCallSummary(response.data.user_data.call_summary);
        setCustomerIntent(response.data.user_data.customer_intent);
        setCustomerNeed(response.data.user_data.customer_need);
        setCustomerSentiment(response.data.user_data.customer_sentiment);
        setNoClaimBonus(response.data.user_data.no_claim_bonus);
        setPaymentOption(response.data.user_data.payment_option);
        setPreviousPolicy(response.data.user_data.previous_policy);
        setQualityOfLead(response.data.user_data.quality_of_lead);
        setReasonOfConversation(response.data.user_data.reason_of_conversation);
        setTypeOfInsurance(response.data.user_data.type_of_insurance);
        setVehicleType(response.data.user_data.type_of_vehicle);
        setUserName(response.data.user_data.user_name);
        setContactNumber(response.data.user_data.user_phone);
        setCallHistory(response.data.user_data.all_conversation_history);
        // console.log(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };



  // const customerRegex = /Customer:(.*?)\n/g;
  // const agentRegex = /InsureRight agent:(.*?)\n/g;

  // // Function to extract matches using a regex
  // const extractMatches = (regex, text) => {
  //   const matches = [];
  //   let match;
  //   while ((match = regex.exec(text)) !== null) {
  //     matches.push(match[1].trim());
  //   }
  //   return matches;
  // };

  // // Extract customer and agent information
  // const customerHistory = extractMatches(customerRegex, callHistory);
  // const agentHistory = extractMatches(agentRegex, callHistory);

  // console.log(customerHistory);

  return (
    <div>
      <div className="flex justify-between items-center p-2">
        <h1 className="text-md font-bold tracking-tight text-indigo-500  ">
          Customer{" "}
        </h1>
        <div className="flex justify-center items-center">
          <span className="px-2 font-bold text-[#737373] ">Status</span>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="border-2  rounded-[3px] text-base">
                  Excalated
                </NavigationMenuTrigger>
                <NavigationMenuContent className="flex flex-col min-w-[110px] p-2 ">
                  <NavigationMenuLink>Active</NavigationMenuLink>
                  <NavigationMenuLink>Resolved</NavigationMenuLink>
                  <NavigationMenuLink>Problem</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <div className=" customerTable h-[250px] overflow-y-scroll ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className=" font-bold text-indigo-500 text-base ">
                Name
              </TableHead>
              <TableHead className=" font-bold text-indigo-500 text-base ">
                Contact Number
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {customerData?.map((item, index) => (
              <TableRow
                onClick={handleUserInfo(item.retrieval_assistant_id)}
                className="h-[10px] "
                key={index}
              >
                <TableCell className="font-xs">{item.user_name}</TableCell>
                <TableCell className="font-xs ">{item.user_phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CustomerDetails
        userName={userName}
        userPhone={contactNumber}
        callSummary={callSummary}
        customerIntent={customerIntent}
        customerNeed={customerNeed}
        customerSentiment={customerSentiment}
        noClaimBonus={noClaimBonus}
        paymentOption={paymentOption}
        previousPolicy={previousPolicy}
        qualityOfLead={qualityOfLead}
        reasonOfConversation={reasonOfConversation}
        typeOfInsurance={typeOfInsurance}
        vehicleType={vehicleType}
      />
    </div>
  );
};
