import { Fragment, useState } from "react";
import { isMobile } from 'react-device-detect';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input
} from "@material-tailwind/react";
import axios from "axios";

export default function Add(props) {
    const [tempToken, setTempToken] = useState(localStorage.getItem("auth_token"));
    const [formData, setFormData] = useState({
        remark: '',
        amount: ''
    });

    const closeDialog = () => {
        setFormData({
            remark: '',
            amount: ''
        })
        props.setIsAddOpen(false);
    }

    const handleTextChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const submitData = () => {
        if(!formData.remark)
            alert("Please enter remark");
        else if(!formData.amount)
            alert("Please enter amount");
        else {
            axios
                .post(`http://localhost:8000/api/expenses`, {
                    remark: formData.remark,
                    amount: formData.amount
                },{
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + tempToken,
                    }
                })
                .then((response) => {
                    if (response.status === 200) {
                        props.refreshTable();
                        alert('Remark added');
                        closeDialog();
                    }
                    console.log("see res",response);
                })
                .catch((err) => {
                    console.log("hi show  me err", err.response);
                    alert('Please try again')
                });
        }
    }

    return (
        <Fragment>
            <Dialog size={isMobile ? "xxl" : "md"} className="overflow-scroll z-40" open={props.isAddOpen} handler={closeDialog}>
                <DialogHeader className="bg-gray-100 text-center">Add Remark</DialogHeader>
                <DialogBody divider>
                        <div className="flex flex-col gap-3 w-full">
                            <Input
                                label="Remark *"
                                name="remark"
                                value={formData.remark}
                                onChange={handleTextChange}
                            />
                            <Input
                                type="number"
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