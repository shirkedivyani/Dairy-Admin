import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Select,
    Option,
    Input
} from "@material-tailwind/react";
import {
    MagnifyingGlassIcon
} from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import React, {useState, Suspense, useEffect} from "react";
import axios from "axios";
import moment from "moment";
import AsyncSelect from 'react-select/async';

function ShowDateTime(props) {
    const date = new Date(props.timestamp);
    const tempDate = moment(date, 'DD MM YYYY, h:mm:ss a');
    const formatedDate = moment(tempDate).format('Do MMMM YYYY, h:mm:ss a');
    return <>{formatedDate}</>;
}

export function Reports() {
    const [tempToken, setTempToken] = useState(localStorage.getItem("auth_token"));
    const [customerList, setCustomerList] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(0);
    const [isPaid, setIsPaid] = useState('No');
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
            .get(`http://localhost:8000/api/customers`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + tempToken,
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    let tempArr = [];
                    response.data.map((obj) => {
                        tempArr.push({
                            value: obj.id,
                            label: obj.name
                        })
                    });
                    setCustomerList(tempArr);
                }
            })
            .catch((err) => {
            });
        refreshTable();
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

    const handleSelectChange = (value) => {
        setIsPaid(value);
    }

    const handleSelectInput = (newValue, actionMeta) => {
        const {name, action} = actionMeta;
        let value = '';
        let label = '';
        if (newValue != null) label = newValue.label;
        if (newValue != null) value = newValue.value;
        if (name === 'customerName') {
            if(value) {
                setSelectedCustomer( value);
            }
        }
    };
    const editRecord = (id, customer_name, customer_id, milk_type, lit, fat, snf, amount, date_created, is_paid) => {
        axios
            .put(`http://localhost:8000/api/milks/${id}`, {
                customer_id: customer_id,
                customer_name: customer_name,
                milk_type: milk_type,
                lit: lit,
                fat: fat,
                snf: snf,
                amount: amount,
                is_paid: 'Yes'
            },{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + tempToken,
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    refreshTable();
                    alert('Milk record updated');
                }
            })
            .catch((err) => {
                alert('Please try again')
            });
    }

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" color="blue" className="mb-4 p-3">
                    <div className="flex flex-row justify-between">
                        <Typography variant="h6" color="white">
                            Milk Reports
                        </Typography>
                    </div>
                   
                </CardHeader>
                   {/* <div className="flex items-center justify-center"> */}
                    <div className="datepicker relative form-floating mb-2 xl:w-96 px-40 py-1  self-end "
                     data-mdb-toggle-button="false">
                    <label className="text-xs  "  id="aria-label" htmlFor="aria-select-branch">
                            Select Date
                        </label>
                    <input  type="datetime-local" id="Test_DatetimeLocal"
                     className="form-control block w-sm px-2 py-1.5 text-base font-normal text-gray-700 bg-white
                     bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700
                    focus:bg-white focus:border-blue-600 focus:outline-none "
                    placeholder="Select a date" data-mdb-toggle="datepicker" />
                    
                 </div>
                <div className="flex flex-row gap-3 px-2 py-1 ">
                    <div className="w-full mx-2">
                        <label className="text-xs  "  id="aria-label" htmlFor="aria-select-branch">
                            Select Customer
                        </label>
                        <AsyncSelect
                            
                           
                            aria-labelledby="aria-label"
                            inputId="aria-select-branch"
                            fullWidth
                            
                            name="customerName"
                            defaultOptions={customerList}
                            onChange={handleSelectInput}
                        />
                    </div>
                    <div className="my-6 mx-2 w-full">
                    <Select
                        label="Select Milk Type *"
                        name="is_paid"
                        value={isPaid}
                        onChange={handleSelectChange}
                    >
                        <Option value="No">No</Option>
                        <Option value="Yes">Yes</Option>
                    </Select>
                    </div>
                </div>
                <hr />
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                        <tr>
                            {["Milk Type", "Total Lit.", "FAT", "SNF", "Amount", "Is Paid", "Created At", "Action"].map((el) => (
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
                            ({ id, customer_name, customer_id, milk_type, lit, fat, snf, amount, date_created, is_paid}, key) => {
                                const className = `py-3 px-5 ${
                                    key === apiData.length - 1
                                        ? ""
                                        : "border-b border-blue-gray-50"
                                }`;

                                return (
                                    <>
                                        {selectedCustomer === customer_id && is_paid === isPaid && (
                                            <tr key={id}>
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
                                                    {isPaid === 'No' && (
                                                        <div className="flex flex-row gap-2">
                                                            <Typography
                                                                as="button"
                                                                onClick={(event) => {event.preventDefault(); editRecord(id, customer_name, customer_id, milk_type, lit, fat, snf, amount, date_created, is_paid)}}
                                                                className="text-xs font-semibold text-blue-gray-600"
                                                            >
                                                                Mark as Paid
                                                            </Typography>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                );
                            }
                        )}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </div>
    );
}

export default Reports;
