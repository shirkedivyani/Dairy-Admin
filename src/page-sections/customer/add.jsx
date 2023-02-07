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
        name: '',
        mobile: '',
        email: '',
        pan: '',
        address: ''

        
    });

    const closeDialog = () => {
        setFormData({
            name: '',
            mobile: '',
            email: '',
            pan: '',
            address: ''


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
        if(!formData.name)
            alert("Please enter name");
        else if(!formData.mobile)
            alert("Please enter mobile");
        else if(!formData.email)
           
            alert("Please enter email ");
        else if(!formData.pan)
            alert("Please enter pan no.");
        else if(!formData.address)
            alert("Please enter address ");
        else {
            axios
                .post(`http://localhost:8000/api/customers`, {
                    name: formData.name,
                    mobile: formData.mobile,
                    email: formData.email,
                    pan: formData.pan,
                    address: formData.address
                    
                },{
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + tempToken,
                    }
                })
                .then((response) => {
                    if (response.status === 200) {
                        props.refreshTable();
                        alert('Customer added');
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
                                label="Name *"
                                name="name"
                                value={formData.name}
                                onChange={handleTextChange}
                            />
                            <Input
                                type="number"
                                label="mobile *"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleTextChange}
                            />
                             <Input
                                type="string"
                                label="email *"
                                name="email"
                                value={formData.email}
                                onChange={handleTextChange}
                            />
                            
                             <Input
                                type="string"
                                label="pan*"
                                name="pan"
                                value={formData.pan}
                                onChange={handleTextChange}
                            />
                             <Input
                                type="string"
                                label="address*"
                                name="address"
                                value={formData.address}
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