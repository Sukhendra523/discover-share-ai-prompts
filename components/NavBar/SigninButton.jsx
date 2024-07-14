'use client'

import { useEffect, useState } from "react"
import { signIn, getProviders , } from 'next-auth/react';


const SigninButton = ({providers}) => {
    // const [providers, setProviders] = useState({})
    // useEffect(()=>{
    //     (async ()=>{
    //         const response = await getProviders();
    //         console.log(" >>>>",response);
    //         setProviders(response);
    //     })()

    // },[]);
  return (
    providers && Object.values(providers).map((provider)=>{
        <button 
            type="button"
            key={provider.name}
            onClick={()=>{
                signIn(provider.id)
            }} 
            className="black_btn"
        >
            Sign In
        </button>
    })
  )
}

export default SigninButton