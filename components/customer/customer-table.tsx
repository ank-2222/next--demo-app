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
  } from "@/components/ui/table"

  const handleRowData = async (id:string) => {

  }

  const fetchCustomerData = async () => {
    const axios = require('axios');
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://ec2-13-127-111-137.ap-south-1.compute.amazonaws.com/api/get-basic-user-data',
      headers: { }
    };

    axios.request(config)
    .then((response: { data: any }) => {
      console.log(response.data);
    })
    .catch((error: any) => {
      console.log(error);
    });

  }
  fetchCustomerData();
  // const customerData = fetchCustomerData();

const customerData = [{"user_name":"Rakesh Sinha", "user_phone":"1234"}]
// import customerData from "@/data/customer.json";


export const CustomerTable = () => {
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
      <div>
      <Table>
  <TableHeader>
    <TableRow>
      <TableHead className=" font-bold text-indigo-500 text-base ">Name</TableHead>
      <TableHead className=" font-bold text-indigo-500 text-base ">Contact Number</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {
        customerData?.map((item, index) => (
            <TableRow className="h-[10px]" key={index}>
              <a onClick={handleRowData(item.retrieval_assistant_id)}>
              <TableCell className="font-xs ">{item.user_name}</TableCell>
              <TableCell className="font-xs ">{item.user_phone}</TableCell>
              </a>
            </TableRow>
        ))
    }
  
  </TableBody>
</Table>

      </div>
    </div>
  );
};
