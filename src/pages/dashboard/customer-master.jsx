import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Input
} from "@material-tailwind/react";
import {
    PlusIcon
} from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import React, {useState, Suspense, useEffect} from "react";
import axios from "axios";
import moment from "moment";
const Add = React.lazy(() => import('../../page-sections/customer/add'));
const Edit = React.lazy(() => import('../../page-sections/customer/edit'));
function refreshPage() {
    window.location.reload(false);
  }
  

function ShowDateTime(props) {
    const date = new Date(props.timestamp);
    const tempDate = moment(date, 'DD MM YYYY, h:mm:ss a');
    const formatedDate = moment(tempDate).format('Do MMMM YYYY, h:mm:ss a');
    return <>{formatedDate}</>;
}


export function CustomerMaster() {
    const [tempToken, setTempToken] = useState(localStorage.getItem("auth_token"));
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState({
        id: 0,
        name: '',
        mobile: '',
        email: '',
        pan: '',
        address: ''

    });
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/customers`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + tempToken,
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    setApiData(response.data)
                }
            })
            .catch((err) => {
            });
    }, [tempToken]);

    const refreshTable = () => {
        axios
            .get(`http://localhost:8000/api/customers`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + tempToken,
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    setApiData(response.data)
                }
            })
            .catch((err) => {
            });
    }

    const editRecord = (id) => {
        axios
            .get(`http://localhost:8000/api/customers/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + tempToken,
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    setSelectedRow({
                        id: response.data.id,
                        name: response.data.name,
                        mobile:  response.data.mobile,
                        email: response.data.email,
                        pan: response.data.pan,
                        address: response.data.address
                    });
                    setIsEditOpen(true);
                }
            })
            // eslint-disable-next-line no-unused-vars
            .catch((err) => {
            });
    }

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" color="blue" className="mb-4 p-3">
                    <div className="flex flex-row justify-between">
                        <Typography  variant="h6" color="white">
                            Customer Master
                        </Typography>
                        <div className="flex flex-row justify-end gap-2">
                        <div className="flex border border-white-200 rounded">
                        {/* <input
                            type="text"
                            className="block w-full px-4 py-2 text-blue-700 bg-blue border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder="Search..."
                        />
                        <button className="px-4 text-blue bg-blue-600 border-l rounded ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>

                        </button> */}

                        {/* {<div className="mr-auto md:mr-4 md:w-56 "> */}
                        {<div className="inline-flex " variant="outlined" color="white" size="sm" >
                       
                        <Input label="Search here " />
                      
                        </div>}
                        
                    </div>
                    <Button onClick={event => {event.preventDefault(); setIsAddOpen(true)}} className="inline-flex " variant="outlined" color="white" size="sm">
                            <PlusIcon className="w-4 h-4 text-inherit mr-1  delay-150 "/>ADD</Button>
                    <Button onClick={refreshPage} className="inline-flex hover:animate-spin" variant="outlined" color="white" size="sm">
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                 <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
                             </svg>

                            </Button>
                               
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                        <tr>
                            {["Sr.No.", "Name",  "Mobile", "E-mail", "Address", "Created At", "Action"].map((el) => (
                                <th
                                    key={el}
                                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                                >
                                    <Typography
                                        variant="small"
                                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                                    >
                                        {el}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {apiData.map(
                            ({ id, name, mobile, email, address,  date_created}, key) => {
                                const className = `py-3 px-5 ${
                                    key === apiData.length - 1
                                        ? ""
                                        : "border-b border-blue-gray-50"
                                }`;

                                return (
                                    <tr key={name}>
                                        <td className={className}>
                                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                                {key + 1}.
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                                {name}
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                                {mobile}
                                            </Typography>
                                        
                                        </td>
                                        <td className={className}>
                                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                                {email}
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                                {address}
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                                <ShowDateTime timestamp={date_created} />
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography
                                                as="button"
                                                onClick={(event) => {event.preventDefault(); editRecord(id)}}
                                                className="text-xs font-semibold text-blue-gray-600"
                                            >
                                                Edit
                                            </Typography>
                                        </td>
                                    </tr>
                                );
                            }
                        )}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
            <Suspense fallback={<div>Loading...</div>}>
                <Add isAddOpen={isAddOpen} setIsAddOpen={setIsAddOpen} refreshTable={refreshTable} />
                <Edit isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen} selectedRow={selectedRow} setSelectedRow={setSelectedRow} refreshTable={refreshTable} />
            </Suspense>
        </div>
    );
}

export default CustomerMaster;
