import React, { useState, useEffect } from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  async function getUser() {
    const res = await fetch("/api/user/whoami", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
      credentials: "include",
    });
    const data = await res.json();
    if (data.success === true) {
      setUser(data.user);
    } else {
      navigate("/signin");
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="w-[300px] m-auto">
        <div
          style={{
            color: "white",
          }}
        >
          {user ? <pre>{JSON.stringify(user, null, 2)}</pre> : "Loading..."}
        </div>
      </div>
    </>
  );
};

export default Dashboard;

// return (
//   <div className="w-[300px] m-auto">
//     <div className="Navbar">
//       <List />
//     </div>
//     <div className="Main">
//       <div className="personalInfo">
//         <br></br>
//         <h2>Personal Information</h2>
//         <div className="personContainer">
//           <img
//             src={photoURL}
//             alt="user"
//             className="person"
//           />
//         </div>
//         <div className="Info">
//           <h4>{displayName}</h4>
//           <br></br>
//           <h4>Year</h4>
//           <br></br>
//           <h4>Branch</h4>
//           <br></br>
//           <h4>{email}</h4>
//         </div>
//       </div>
//       <div className="achievements">
//         <br></br>
//         <h2>Achievements</h2>
//         <br></br>
//         <div className="card">
//           <Card style={{ width: "18rem" }}>
//             <Card.Img
//               variant="top"
//               src="https://assets.entrepreneur.com/content/3x2/2000/1661200766-shutterstock-1731355939.jpg"
//               className="cardImage"
//             />
//             <Card.Body>
//               <Card.Title className="cardTitle">Card Title</Card.Title>
//               <Card.Text className="cardText">
//                 Some quick example text to build on the card title and make up
//                 the bulk of the card's content.
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </div>
//       </div>
//     </div>
//     {/* <Footer /> */}
//   </div>
// );
