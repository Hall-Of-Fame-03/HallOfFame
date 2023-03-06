import React, { useState } from 'react';
import Card from '@mui/material/Card';
import './form.css'
import Button from '@mui/material/Button';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



function Form() {

    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [achievement_desc, setDesc] = useState(null);
    const [category, setCategory] = useState(null);
    const [issuer_organisation, setOrganisaton] = useState(null);
    const [date, setDate] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const Reader = new FileReader();
        Reader.readAsDataURL(file);
        Reader.onload= (e) => {
            if(Reader.readyState ===2) {
                setImage(Reader.result);
            }
        };
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/post/post/upload", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                //"Access-Control-Allow-Origin": "*", // Required for CORS support to work
              },
              body: JSON.stringify({
                image,
                achievement_desc,
                category,
                issuer_organisation,
                date
              }),
              credentials: "include",
              mode: "cors",
            });
            const data = await res.json();
            if (data.success === true) {
              toast.success("Post Created")
              navigate("/dashboard");
            } if (data.success !== true) {
              toast.error(data.message);
            }
          } catch (error) {
            toast.error("Post Creation Failed -An unexpected error occurred");
          }
    }

    const handleCancel = () => {
        navigate("/dashboard");
    }

    return (
        <>

        
        <Card style ={{ maxWidth: 1500,
                        backgroundColor: "#ffffffd2",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "2rem",
                        marginTop: 120,
                        marginLeft: 70,
                        marginRight: 70
                        }}>
        
        <h3>ADD NEW ACHIEVEMENT</h3>
        
        <form onSubmit={submitHandler}>  
            {image && <img src={image} alt="post" />}
            <input type="file" accept='image/*' onChange={handleImageChange} />
            <input type="text" placeholder='Describe your achievement' value={achievement_desc} onChange={(e) => setDesc(e.target.value)} />
            <input type="text" placeholder='Category' value={category} onChange={(e) => setCategory(e.target.value)} />
            <input type="text" placeholder='Issuer Organisation' value={issuer_organisation} onChange={(e)=> setOrganisaton(e.target.value)} />
            <input type="text" placeholder='Issue Date- DD/MM/YYYY' value={date} onChange={(e)=> setDate(e.target.value)} />

            <Button variant="contained" style ={{ backgroundColor: '#494460', marginTop: 10, marginLeft:9}} type="submit">Post</Button>
            <Button variant="contained" style ={{ backgroundColor: '#494460', marginTop: 10, marginLeft: 17}} type="cancel" onClick={() => handleCancel()}>Back</Button>
        
        </form>
        </Card>
        </>
    )
}

export default Form
