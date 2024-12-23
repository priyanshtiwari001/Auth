import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router'
import {toast} from 'sonner';
const User = () => {
    const [data,setData] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const fetchData = async ()=>{
   
        
      const response = await fetch('/api/v1/dashboard',{
        method:'GET',
        headers:{
            'Content-Type':'application/json', 
            'x-access-token': token
            },
       
      })
      const data = await response.json();
      setData(data.message);

      if(!response.ok){
        toast.error("Access Denied! Don't have access");
        navigate('/login');
      }

    }
   
    useEffect(()=>{
        console.log('component mount')
       fetchData(); 
    },[])
    
    console.log("renderingg")
  return (
    <div>
      <h1 className='text-3xl text-emerald-600'>
        {data}
      </h1>
    </div>
  )
}

export default User;
