import React from "react";
import "./dashboard.css";
import Card from 'react-bootstrap/Card';
import List from '../components/List';
import { UserAuth } from "../context/AuthContext";
import { getAuth } from "firebase/auth";



const Dashboard = () => {
  const { logOut, user } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  
  const auth = getAuth();
  const User = auth.currentUser;
  var photoURL;
  var email;
  var displayName;
  
  if (User !== null) {
    displayName = User.displayName;
    email = User.email;
    photoURL = User.photoURL;
  }



  return (
    <div className="w-[300px] m-auto">
      <div className="Navbar">
        <List />
      </div>
      <div className="Main">
        <div className="personalInfo">
          <br></br>
          <h2>Personal Information</h2>
          <div className="personContainer">
            <img
              src={photoURL}
              alt="user"
              className="person"
            />
          </div>
          <div className="Info">
            <h4>{displayName}</h4>
            <br></br>
            <h4>Year</h4>
            <br></br>
            <h4>Branch</h4>
            <br></br>
            <h4>{email}</h4>
          </div>
        </div>
        <div className="achievements">
          <br></br>
          <h2>Achievements</h2>
          <br></br>
          <div className="card">
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://assets.entrepreneur.com/content/3x2/2000/1661200766-shutterstock-1731355939.jpg"
                className="cardImage"
              />
              <Card.Body>
                <Card.Title className="cardTitle">Card Title</Card.Title>
                <Card.Text className="cardText">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Dashboard;
