import {Fragment, useEffect, useState} from "react";
import { isMobile } from 'react-device-detect';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Select,
    Option
} from "@material-tailwind/react";
import axios from "axios";
import AsyncSelect from 'react-select/async';

export default function Add(props) {
    const [tempToken, setTempToken] = useState(localStorage.getItem("auth_token"));
    const [customerList, setCustomerList] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [formData, setFormData] = useState({
        customerId: 0,
        customerName: '',
        lit: '',
        fat: '',
        snf: '',
        amount: '',
        milk_type: 'Cow'
    });

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
    }, [tempToken]);

    const closeDialog = () => {
        setFormData({
            name: '',
            mobile: ''
        })
        props.setIsAddOpen(false);
    }

    const handleTextChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSelectChange = (value) => {
        setFormData({
            ...formData,
            milk_type: value
        })
    }

    const handleSelectInput = (newValue, actionMeta) => {
        const {name, action} = actionMeta;
        let value = '';
        let label = '';
        if (newValue != null) label = newValue.label;
        if (newValue != null) value = newValue.value;
        if (name === 'customerName') {
            if(value) {
                setFormData({
                    ...formData,
                    customerId: value,
                    customerName: label
                });
                setSelectedCustomer({
                    label: label,
                    value: value
                });
            }
        }
    };

    const submitData = () => {
        if(formData.customerId === 0)
            alert("Please select customer");
        else if(!formData.lit)
            alert("Please enter Total lit");
        else if(!formData.amount)
            alert("Please enter amount");
        else {
            axios
                .post(`http://localhost:8000/api/milks`, {
                    customer_id: formData.customerId,
                    customer_name: formData.customerName,
                    milk_type: formData.milk_type,
                    lit: formData.lit,
                    fat: formData.fat,
                    snf: formData.snf,
                    amount: formData.amount,
                    is_paid: 'No'
                },{
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + tempToken,
                    }
                })
                .then((response) => {
                    if (response.status === 200) {
                        props.refreshTable();
                        alert('Milk record added');
                        closeDialog();
                    }
                })
                .catch((err) => {
                    alert('Please try again')
                });
        }
    }

    return (
        <Fragment>
            <Dialog size={isMobile ? "xxl" : "md"} className="overflow-scroll z-40" open={props.isAddOpen} handler={closeDialog}>
                <DialogHeader className="bg-gray-100 text-center">Add Milk Record</DialogHeader>
                <DialogBody divider>
                        <div className="flex flex-col gap-3 w-full">
                            <div>
                                <label className="text-xs"  id="aria-label" htmlFor="aria-select-branch">
                                    Select Customer
                                </label>
                                <AsyncSelect
                                    aria-labelledby="aria-label"
                                    inputId="aria-select-branch"
                                    fullWidth
                                    placeholder={'Search and select Customer...'}
                                    name="customerName"
                                    value={selectedCustomer}
                                    defaultOptions={customerList}
                                    onChange={handleSelectInput}
                                />
                            </div>
                            <Select
                                label="Select Milk Type *"
                                name="milk_type"
                                value={formData.milk_type}
                                onChange={handleSelectChange}
                            >
                                <Option value="Cow">Cow</Option>
                                <Option value="Buffalo">Buffalo</Option>
                            </Select>
                            <Input
                                label="Total Lit *"
                                name="lit"
                                value={formData.lit}
                                onChange={handleTextChange}
                            />
                            <Input
                                label="FAT"
                                name="fat"
                                value={formData.fat}
                                onChange={handleTextChange}
                            />
                            <Input
                                label="SNF"
                                name="snf"
                                value={formData.snf}
                                onChange={handleTextChange}
                            />
                            <Input
                                label="Amount *"
                                name="amount"
                                value={formData.amount}
                                onChange={handleTextChange}
                            />
                        </div>
                </DialogBody>
                <DialogFooter className="bg-gray-100">
                    <Button
                        variant="text"
                        color="red"
                        onClick={closeDialog}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={submitData}>
                        <span>Add</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </Fragment>
    );
}