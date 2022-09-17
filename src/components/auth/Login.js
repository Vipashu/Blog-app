import React, {useState} from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    const handleLogin = async ()=>{
        try {
          await signInWithEmailAndPassword(auth, email, password);
          navigate("/")
        } catch (error) {
          toast(error.code, {type:"error"});
        }
      }
  return (
    <div className='border p-3 bg-light mx-auto'
    style={{maxWidth:400, marginTop:80}}>
      <h1>Login</h1>
      <div className="form-group">
        <label htmlFor="">Email</label>
        <input type="email" className='form-control' placeholder='Enter Your Email' onChange={(e)=>{setEmail(e.target.value)}}/>
      </div>
      <div className="form-group">
        <label htmlFor="">Password</label>
        <input type="password" className='form-control' placeholder='Password' onChange={(e)=>(setPassword(e.target.value))}/>
      </div>
      <br/>
      <button className='btn btn-primary' onClick={handleLogin}>Login</button>
    </div>
  )
}
