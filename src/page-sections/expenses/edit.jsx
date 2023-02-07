import {Fragment, useEffect, useState} from "react";
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

export default function Edit(props) {
    const [tempToken, setTempToken] = useState(localStorage.getItem("auth_token"));
    const [formData, setFormData] = useState({
        remark: '',
        amount: ''
    });

    useEffect(() => {
        if(props.isEditOpen) {
            setFormData({
                remark: props.selectedRow.remark,
                amount: props.selectedRow.amount
            })
        }

    }, [props.isEditOpen]);

    const closeDialog = () => {
        setFormData({
            remark: '',
            amount: ''
        })
        props.setIsEditOpen(false);
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
                .put(`http://localhost:8000/api/expenses/${props.selectedRow.id}`, {
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
                        alert('Expense Record updated');
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
            <Dialog size={isMobile ? "xxl" : "md"} className="overflow-scroll z-40" open={props.isEditOpen} handler={closeDialog}>
                <DialogHeader className="bg-gray-100 text-center">Update Expense Record</DialogHeader>
                <DialogBody divider>
                        <div className="flex flex-col gap-3 w-full">
                            <Input
                                label="Remark*"
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
                        <span>Update</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </Fragment>
    );
}