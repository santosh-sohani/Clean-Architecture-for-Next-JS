import React from 'react'
import { useAppSelector } from '@/lib/store/hooks'

const UserIDComponent = () => {
    const user =  useAppSelector((state)=> state.userID.userID)
  return (
    <div>
        UserID : {user}
    </div>
  )
}

export default UserIDComponent