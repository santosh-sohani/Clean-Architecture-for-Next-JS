"use client"
import React,{useState} from 'react'

const ClickComponent = () => {
    const [count,setCount] = useState<number>(0)
  return (
    <div className='flex'>
        <button onClick={() => setCount(count + 1)} className='bg-purple-600 text-white p-2 m-2'>Click</button>
        <div className='text-3xl p-2 m-2'>{count}</div>
    </div>
  )
}

export default ClickComponent