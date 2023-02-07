import { Fragment, useState } from "react";
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
    const [formData, setFormData] = useState({
        customername: '',
        lit: '',
        amount: '',
        milk_type: ''
    });

    const closeDialog = () => {
        setFormData({
        customername: '',
        lit: '',
        amount: '',
        milk_type: ''
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

    const submitData = () => {
        if(!formData.customername)
            alert("Please enter customername");
        else if(!formData.lit)
            alert("Please enter liter");
        else if(!formData.amount)
            alert("Please enter amount");
        else {
            axios
                .post(`http://localhost:8000/api/sales`, {
                    customername: formData.customername,
                    milk_type: formData.milk_type,
                    lit: formData.lit,
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
                        alert('Sales Record added');
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
                <DialogHeader className="bg-gray-100 text-center">Add Customer</DialogHeader>
                <DialogBody divider>
                        <div className="flex flex-col gap-3 w-full">
                            <Input
                                label="Customer Name *"
                                name="customername"
                                value={formData.customername}
                                onChange={handleTextChange}
                            />
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