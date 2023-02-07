import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import {useEffect, useState, useContext} from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";

export function SignIn() {
  const navigate = useNavigate();
  const [tempToken, setTempToken] = useState(localStorage.getItem("auth_token"));
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [token, setToken] = useContext(UserContext);
  useEffect(() => {
    // * auto login if already authenticated
    const fetchUser = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + tempToken,
        },
      };
      const response = await fetch("http://localhost:8000/api/users/me", requestOptions);
      if (!response.ok) {
      }
      else navigate('/dashboard/home', { replace: true });
    };
    fetchUser();
  }, [token]);

  const handleTextFieldChange = (event) =>{
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const submitLogin = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: JSON.stringify(
          `grant_type=&username=${formData.username}&password=${formData.password}&scope=&client_id=&client_secret=`
      ),
    };
    const response = await fetch("http://localhost:8000/api/token", requestOptions);
    const data = await response.json();
    if (!response.ok) {
      alert("Please enter valid details")
    } else {
      setToken(data.access_token);
      navigate('/dashboard/home', { replace: true });
    }
  };

  const handleSubmit= (event) => {
    event.preventDefault();
    submitLogin();
  }

  return (
    <>
      <img
        src="/img/login-background.jpeg"
        className="absolute inset-0 z-0 h-full w-full object-cover brightness-50"
       alt="Login Background"/>
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4 shadow-2xl">
          <form onSubmit={handleSubmit}>
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center text-center"
          >
            <img
                src="/img/logo-large.png"
                className="absolute inset-0 z-0 h-full w-full object-cover"
                alt="stn"/>
          </CardHeader>
          <CardBody className="flex flex-col gap-3 py-2 px-6">
            <Typography variant="h5" color="gray" className="text-center">
              Admin Sign-In
            </Typography>

              <Input name="username" value={formData.username} onChange={handleTextFieldChange} type="text" label="Enter username" required size="lg" icon={<i className="fas fa-mobile" />}/>
              <Input name="password" value={formData.password} onChange={handleTextFieldChange} type="password" label="Enter password" required size="lg" icon={<i className="fas fa-lock" />}/>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" type="submit" value="Submit" fullWidth>
              Sign In
            </Button>
          </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
