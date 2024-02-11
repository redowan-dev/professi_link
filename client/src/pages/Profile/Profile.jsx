import React, { useContext } from 'react'
import CandidateRegistration from '../register/CandidateRegistration'
import { AuthContext } from '../../contexts/AuthContext'

export default function Profile() {
    const {user} = useContext(AuthContext)
  return (
    <div>
      
                <CandidateRegistration/>
  
   
    </div>
  )
}
