import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail]= useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/user/forgot/password", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                //"Access-Control-Allow-Origin": "*", // Required for CORS support to work
              },
              body: JSON.stringify({
                email
              }),
              credentials: "include",
              mode: "cors",
            });
            const data = await res.json();
            if (data.success === true) {
              toast.success(data.message)
              navigate("/signin");
            } if (data.success !== true) {
              toast.error(data.message);
            }
          } catch (error) {
            toast.error("Reset Password Request Failed -An unexpected error occurred");
          }
    }

    const handleCancel = () => {
        navigate("/signin");
    }


  return (
    <>
        <form onSubmit={submitHandler}>
            <h1>Reset Password</h1>
            
            <input type="text" placeholder='Enter your Email' value={email} onChange={(e) => setEmail(e.target.value)} />

            <Button type="submit">Send Reset Password Token</Button>
            <Button type="cancel" onClick={() => handleCancel()}>Back</Button>
        </form>

    </>
  )
}
