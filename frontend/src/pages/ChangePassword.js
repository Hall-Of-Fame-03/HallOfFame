import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ChangePassword() {
    const navigate = useNavigate();
    const [oldPassword, setOldPassword]= useState(null);
    const [newPassword, setNewPassword] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/user/update/password", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                //"Access-Control-Allow-Origin": "*", // Required for CORS support to work
              },
              body: JSON.stringify({
                oldPassword,
                newPassword
              }),
              credentials: "include",
              mode: "cors",
            });
            const data = await res.json();
            if (data.success === true) {
              toast.success("Password Updated")
              navigate("/dashboard");
            } if (data.success !== true) {
              toast.error(data.message);
            }
          } catch (error) {
            toast.error("Password Updation Failed -An unexpected error occurred");
          }
    }

    const handleCancel = () => {
        navigate("/dashboard");
    }


  return (
    <>
        <form onSubmit={submitHandler}>
            <h1>Change Password</h1>
            
            <input type="password" placeholder='Old Password' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
            <input type="password" placeholder='New Password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

            <Button type="submit">Update</Button>
            <Button type="cancel" onClick={() => handleCancel()}>Back</Button>
        </form>

    </>
  )
}
