"use client"
import React,{useState} from 'react'

const InputField = () => {
    const [username,setUsername] = useState<string>("")
  return (
    <div>
        Username : <input 
        type="text" 
        placeholder="Enter Username" 
        onChange={(event) => {setUsername(event.target.value)}} 
        value={username} 
        className='border-2 p-2 m-2'
        />
    </div>
  )
}

export default InputField