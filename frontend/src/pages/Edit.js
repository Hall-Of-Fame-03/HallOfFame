import React, { useState } from "react";
import './Edit.css';
import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

/*please add a feature to upload image in this form 
as well as the original image that shall be displayed
will be from the google image of  the user which is 
not uploaded for all users. Also add a feature to
scale/resize this image so that it can be showed clearly.
Also change the look of this form as per the add acheivement 
form for uniformity.
*/

const Edit = () => {

  const navigate = useNavigate();
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [branch, setBranch] = useState(null);
  const [year, setYear] = useState(null);
  const [bio, setBio] = useState(null);
  const [course, setCourse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await fetch("/api/user/update/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            //"Access-Control-Allow-Origin": "*", // Required for CORS support to work
          },
          body: JSON.stringify({
            name: name,
            email: email,
            bio: bio,
            course: course,
            branch: branch,
            year: year
          }),
          credentials: "include",
          mode: "cors",
        });
        const data = await res.json();
        if (data.success === true) {
          toast.success("Profile Updated")
          navigate("/dashboard");
        } if (data.success !== true) {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Profile Updation Failed -An unexpected error occurred");
      }
  }


  function handleCancel() {
    navigate("/dashboard");
  }
  return (
    <>

    <NavBar/>

      <div className='details'>

        <form onSubmit={handleSubmit}>
        <div className='info'>
          <div class="name">
            <label >Full Name   </label>
            <input type="text" className="form-control" id="fullName" placeholder="Enter full name"  value={name} onChange={(e)=> setName(e.target.value)}  />
          </div>
          <div class="name">
            <label >Bio  </label>
            <input type="text" className="form-control" id="bio" placeholder="Describe yourself"  value={bio} onChange={(e)=> setBio(e.target.value)}  />
          </div>
          <div class="year">
            <label>Year  </label>
            <input type="text" className="form-control" id="year" placeholder="Enter year(First/Second/Third/Fourth)"  value={year} onChange={(e)=> setYear(e.target.value)}  />
          </div>
          <div class="branch">
            <label >Course  </label>
            <input type="text" className="form-control" id="course" placeholder="Enter Course"  value={course} onChange={(e)=> setCourse(e.target.value)}  />
          </div>
          <div class="branch">
            <label >Branch  </label>
            <input type="text" className="form-control" id="branch" placeholder="Enter branch"  value={branch} onChange={(e)=> setBranch(e.target.value)}  />
          </div>
          <div class="email">
            <label >Email ID   </label>
            <input type="email" className="form-control" id="email" placeholder="Enter Email ID"  value={email} onChange={(e)=> setEmail(e.target.value)}  />
          </div>
          <div className='Buttons'>
            <div className="updateButton">
              <button type="submit" className="updateButtons">Update</button>
            </div>
            <div className='cancelButton'>
              <button type="cancel" className="cancelButtons" onClick={handleCancel}>Cancel</button>
            </div>

          </div>

        </div>
        </form>

      </div>



    </>
  );


}

export default Edit;