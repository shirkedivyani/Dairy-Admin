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
const Add = React.lazy(() => import('../../page-sections/milk/add'));
const Edit = React.lazy(() => import('../../page-sections/milk/edit'));
function refreshPage() {
    window.location.reload(false);
  }
function ShowDateTime(props) {
    const date = new Date(props.timestamp);
    const tempDate = moment(date, 'DD MM YYYY, h:mm:ss a');
    const formatedDate = moment(tempDate).format('Do MMMM YYYY, h:mm:ss a');
    return <>{formatedDate}</>;
}

export function MilkMaster() {
    const [tempToken, setTempToken] = useState(localStorage.getItem("auth_token"));
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState({
        id: 0,
        customer_id: 0,
        customer_name: '',
        milk_type: '',
        lit: '',
        fat: '',
        snf: '',
        amount: '',
        is_paid: ''
    });
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/milks`, {
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
            .get(`http://localhost:8000/api/milks`, {
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
            .get(`http://localhost:8000/api/milks/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + tempToken,
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    setSelectedRow({
                        id: response.data.id,
                        customer_id: response.data.customer_id,
                        customer_name: response.data.customer_name,
                        milk_type: response.data.milk_type,
                        lit: response.data.lit,
                        fat: response.data.fat,
                        snf: response.data.snf,
                        amount: response.data.amount,
                        is_paid: response.data.is_paid
                    });
                    setIsEditOpen(true);
                }
            })
            .catch((err) => {
            });
    }

    const deleteRecord = (id) => {
        axios
            .delete(`http://localhost:8000/api/milks/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + tempToken,
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    refreshTable();
                    alert('Record deleted');
                }
            })
            .catch((err) => {
            });
    }

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" color="blue" className="mb-4 p-3">
                    <div className="flex flex-row justify-between">
                        <Typography variant="h6" color="white">
                            Milk Master
                        </Typography>
                        <div className="flex flex-row justify-end gap-2">
                            <div className="flex border border-white-200 text-white rounded">
                            {<div className="inline-flex" variant="outlined" color="white" size="sm">
                       
                       <Input className="text-white " label="Search here" />
               
                     </div>}
              </div>       
                    <Button onClick={event => {event.preventDefault(); setIsAddOpen(true)}} className="inline-flex" variant="outlined" color="white" size="sm"><PlusIcon className="w-4 h-4 text-inherit mr-1"/>ADD</Button>
                    <Button onClick={refreshPage} className="inline-flex hover:animate-spin" variant="outlined" color="white" size="sm">
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                 <path fill-rule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clip-rule="evenodd" />
                             </svg>

                            </Button>
                    </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                        <tr>
                            {["Sr.No.", "Customer Name",  "Milk Type", "Total Lit.", "FAT", "SNF", "Amount", "Is Paid", "Created At", "Action"].map((el) => (
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
                            ({ id, customer_name, milk_type, lit, fat, snf, amount, date_created, is_paid}, key) => {
                                const className = `py-3 px-5 ${
                                    key === apiData.length - 1
                                        ? ""
                                        : "border-b border-blue-gray-50"
                                }`;

                                return (
                                    <tr key={id}>
                                        <td className={className}>
                                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                                {key + 1}.
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                                {customer_name}
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                                {milk_type}
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                                {lit}
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                                {fat}
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                                {snf}
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                                {amount}
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                                {is_paid}
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                                <ShowDateTime timestamp={date_created} />
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <div className="flex flex-row gap-2">
                                                <Typography
                                                    as="button"
                                                    onClick={(event) => {event.preventDefault(); editRecord(id)}}
                                                    className="text-xs font-semibold text-blue-gray-600"
                                                >
                                                    Edit
                                                </Typography>
                                                <Typography
                                                    as="button"
                                                    onClick={(event) => {event.preventDefault(); deleteRecord(id)}}
                                                    className="text-xs font-semibold text-blue-gray-600"
                                                >
                                                    Delete
                                                </Typography>
                                            </div>
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

export default MilkMaster;
