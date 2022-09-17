import { deleteDoc, doc} from 'firebase/firestore'
import React from 'react'
import { db, storage } from '../firebase'
import { toast } from 'react-toastify';
import { ref,deleteObject } from 'firebase/storage';

export default function DeleteArticle({id, imgUrl}) {
    const handleDelete = async()=>{
      if (window.confirm("Are you sure you want to delete this article?")) {
        try {
            deleteDoc(doc(db, "Articles", id));
            toast("Article Deleted Successfully", {type: "success"});
            const storageRef = ref(storage, imgUrl);
            await deleteObject(storageRef);
        } catch (error) {
            toast("Error Deleting Article", {type: "error"});   
        }
       
    }}
  return (
    <div>
      <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
    </div>
  )
}
