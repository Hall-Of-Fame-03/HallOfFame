import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function ResetPassword() {
    const navigate = useNavigate();
    const [password, setPassword]= useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const params = useParams();

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`/api/user/password/reset/${params.token}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                //"Access-Control-Allow-Origin": "*", // Required for CORS support to work
              },
              body: JSON.stringify({
                password,
                confirmPassword
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
            
            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

            <Button type="submit">Reset Password</Button>
            <Button type="cancel" onClick={() => handleCancel()}>Back</Button>
            <Link to="/forgot/password">Request Another Token</Link>
            <h5>OR</h5>
            <Link to="/signin">Login</Link>
        </form>

    </>
  )
}
