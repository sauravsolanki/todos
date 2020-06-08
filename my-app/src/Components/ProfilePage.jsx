import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { navigate } from "@reach/router";
import { auth } from "../firebase";
import { Button, Card, Row, Col, Image } from 'react-bootstrap';

let intial_data={ photoURL:"Loading Profile Pic ...", displayName:"fetching..", email:"fetching.." };

const ProfilePage = () => {

  const user = useContext(UserContext);

  let { photoURL, displayName, email} = intial_data;
  if (user){
    photoURL = user.photoURL;
    displayName = user.displayName;
    email = user.email;
  }
  
  return (
    <Card style={{ width: '18rem',boxShadow: "3px 3px 3px 3px #9E9E9E" }}>
      <Card.Header>
      <Image src={photoURL} alt={photoURL} style={{borderRadius:"50%",width:"100%"}} />
      </Card.Header>
      
      <Card.Body>
        <Card.Title>{displayName}</Card.Title>
        <Card.Text>
          <p>
            Email-id: {email}
            <br/>
          </p>
        </Card.Text>
       </Card.Body>
       <Card.Footer>
       <Button variant="primary" onClick={() => {
        localStorage.removeItem('userloggedin');
        localStorage.removeItem("user");
        auth.signOut();
      }}> Log out</Button>
       </Card.Footer>

    </Card>
  )

  return (
    <div>
      <div style={{
        float: "right"
      }}>
        <div
          style={{
            background: `url(${photoURL || 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})  no-repeat center center`,
            backgroundSize: "cover",
            height: "200px",
            width: "200px"
          }}
        ></div>
        <div>
          <h2>{displayName}</h2>
          <h3>{email}</h3>
        </div>
      </div>
      <button onClick={() => {
        localStorage.removeItem('userloggedin');
        localStorage.removeItem("user");
        auth.signOut();
      }}>Sign out</button>
    </div>
  )
};

export default ProfilePage;

