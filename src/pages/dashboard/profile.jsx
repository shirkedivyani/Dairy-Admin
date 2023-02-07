import {
  Card,
  CardBody,
  Avatar,
  Typography
} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import axios from 'axios';

export function Profile() {
  const [tempToken, setTempToken] = useState(localStorage.getItem("auth_token"));
  const [email, setEmail] = useState(localStorage.getItem(""));

  useEffect(() => {
    // * auto logout if already authenticated
    axios
        .get(`http://localhost:8000/api/users/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tempToken,
          }
        })
        .then((response) => {
          if (response.status === 200) {
            setEmail(response.data.email)
          }
        })
        // eslint-disable-next-line no-unused-vars
        .catch((err) => {
        });
    }, [tempToken]);

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(/img/login-background.jpeg)] bg-cover bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src="/img/logo-small.png"
                alt="bruce-mars"
                size="xl"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {email}
                </Typography>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
