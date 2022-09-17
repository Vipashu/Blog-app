import React, {useState} from 'react'
import {Timestamp, collection, addDoc} from 'firebase/firestore'
import {ref,  uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import {storage, db, auth} from '../firebase'
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';

export default function AddArticle() {
  const [user] = useAuthState(auth)
  const[formData,setFormData] = useState({
    title: "",
    description: "",
    image: "",
    createdAt: Timestamp.now().toDate(),
  });
  const [progress, setProgress] = useState(0);
  const handleChange =(e)=>{
    setFormData({...formData, [e.target.name]: e.target.value});
  }
  const handleImageChange = (e)=>{
    setFormData({...formData, image: e.target.files[0]})
  }
  const handlePublish = (e)=>{
    if (!formData.title || !formData.description || !formData.image ) {
      alert ('Please fill all the fields') ;
      return ;
  }
const storageRef = ref( storage, `/images/${Date.now()}${formData.image.name}`);
const uploadImage = uploadBytesResumable(storageRef, formData.image);

uploadImage.on(
  "state_changed",
  (snapshot) => {
    const progressPercent = Math.round(
      (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    );
    setProgress(progressPercent);
  },
  (err) => {
    console.log(err);
  },
  () => {
    setFormData({
      title: "",
      description: "",
      image: "",
    });
    getDownloadURL(uploadImage.snapshot.ref).then((url)=>{
      const articleRef = collection(db, "Articles")
      addDoc(articleRef,{
        title: formData.title,
        description: formData.description,
        imgUrl: url,
        createdAt: Timestamp.now().toDate(),
        createdBy: user.displayName,
        userId: user.uid,
      })
      .then(()=>{
        toast.success("Article added successfully", {type: "success"});
        setProgress(0);
      })
      .catch((err)=>{
        toast.error("Error adding article", {type: "error"})
      })
    })
    }
);
}
  return (
    <div className='border p-3 mt-3 bg-light' style={{position:"fixed"}}>
      { !user?
        <>
        <Link to ="/signin"><h2>Login to create article</h2></Link>
        Don't have an account? <Link to="/register">Sign up</Link>
        </>
        :<>
         <h2>Create Article</h2>
      {/*title*/}
      <label htmlFor="">Title</label>
      <input type="text" name='title' className='form-control' value={formData.title} onChange={(e)=>handleChange(e)}/>
      {/*description*/}
      <label htmlFor="">Description</label>
      <textarea name="description" className='form-control' value={formData.description}onChange={(e)=>handleChange(e)}></textarea>
      {/*image*/}
      <label htmlFor="">Image</label>
      <input type="file" name='image' accept='image/*' className='form-control' onChange={(e)=>handleImageChange(e)}/>
{progress === 0 ?null :(
   <div className="progress">
   <div className="progress-bar progress-bar-striped mt-2" style={{width:`${progress}%`}}>
    { `Uploading image ${progress}%`}
   </div>
 </div>  
)}
       
      <button className='form-control btn btn-primary mt-2' onClick={handlePublish}>Publish</button>
        </>
      }
     
    </div>
  )
}
