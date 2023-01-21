import React from 'react';
import { NavLink } from 'react-router-dom';
import logo1 from '../images/logo.png';
import SearchIcon from '@mui/icons-material/Search';
import './List.css';
import {UserAuth} from '../context/AuthContext'

const List=()=>{

    const {user, logOut} = UserAuth();

    const handleSignOut = async () => {
      try{
        await logOut()
      } catch(error){
        console.log(error);
      }
    }


    return(
        <>
        <header>
            <div className='container container-flex'>
                <div className='logoContainer'>
                    <img src={logo1} alt="logo" className='logo'/>
                </div>
                <nav>
                    <div className='list'>
                        <NavLink exact to="/achievements" className="listItem" activeClassName="active">Home</NavLink>
                        <NavLink exact to="/About" className="listItem" activeClassName="active">About</NavLink>
                        <NavLink to="/edit" className="listItem" activeClassName="active">Edit Profile</NavLink>
                        <NavLink to="/Form" className="listItem" activeClassName="active">Add Achievements</NavLink>
                        <NavLink to="/achievements" className="listItem" activeClassName="active" onClick={handleSignOut}>Logout</NavLink>
                        
                    </div>
                </nav>
                <div className='icons'>
                    {/* <SearchIcon className='icon'/> */}
                    {/* <PersonIcon className='icon'/>
                    <EmailIcon className='icon'/> */}

                </div>

            </div> 
            
        </header>
        </>
    )

}
export default List;