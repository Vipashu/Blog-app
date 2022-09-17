import React from 'react'
import { Link } from 'react-router-dom'
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '../firebase'
import { signOut } from "firebase/auth";

export default function Navbar() {
  const [user] = useAuthState(auth);
  return (
    <div className='fixed-top border bg-dark'>
      <nav className='navbar'>
        <div>
          <img src="https://cdn.worldvectorlogo.com/logos/react-1.svg" 
          alt="logo" width={30} height={30} className="ms-5"/>
        </div>
        <Link className='nav-link' style={{color:"white"}} to='/'>Home</Link>
        <div className="">
          {
             user && (
              <>
                <span className="pe-4" style={{color:"white"}}>
                  Signed is as {user.displayName || user.email}
                </span>
                <button className='btn btn-primary btn-sm me-3'
                onClick={()=>{signOut(auth)}}>Logout</button>
                </>
             )
          }
        </div>
       
      </nav>

    </div>
  )
}
