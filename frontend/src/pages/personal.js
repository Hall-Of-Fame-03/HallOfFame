import React from "react";
import './personal.css';
import NavBar from "../components/Navbar";

/*please add a feature to upload image in this form 
as well as the original image that shall be displayed
will be from the google image of  the user which is 
not uploaded for all users. Also add a feature to
scale/resize this image so that it can be showed clearly.
Also change the look of this form as per the add acheivement 
form for uniformity.
*/

const edit = () => {
  return (
    <>

    <NavBar/>

      <div className='details'>
  
        <div className='info'>
          <div class="name">
            <label for="fullName">Full Name   </label>
            <input type="text" class="form-control" id="fullName" placeholder="Enter full name" />
          </div>
          <div class="year">
            <label for="year">Year  </label>
            <input type="text" class="form-control" id="year" placeholder="Enter year(First/Second/Third/Fourth)" />
          </div>
          <div class="branch">
            <label for="branch">Branch  </label>
            <input type="text" class="form-control" id="branch" placeholder="Enter branch" />
          </div>
          <div class="email">
            <label for="email">Email ID   </label>
            <input type="text" class="form-control" id="email" placeholder="Enter Email ID" />
          </div>
          <div className='Buttons'>
            <div className="updateButton">
              <button type="submit" className="updateButtons">Update</button>
            </div>
            <div className='cancelButton'>
              <button type="submit" className="cancelButtons">Cancel</button>
            </div>

          </div>

        </div>

      </div>



    </>
  );


}

export default edit;