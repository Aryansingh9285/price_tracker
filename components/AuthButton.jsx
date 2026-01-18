'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import {  LogIn, LogOut } from 'lucide-react';
import { AuthModel } from './AuthModel';
import { signOut } from '@/app/action';

const AuthButton = ({user}) => {
  const [showAuthModel , setShowAuthModel] = useState(false)

  if(user){
    return(
      <form action={signOut}>
      <Button
  variant="ghost"
  size="sm"
  type="submit"
  className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
>
  <LogOut className="w-4 h-4" />
  Sign out
</Button>

    </form>
    )
  }
  return (
    <div>
      {""}
       <Button
       onClick={()=>{setShowAuthModel(true  )}}
                  variant="default"
                  size="sm"
                  className="bg-orange-500 hover:bg-orange-600 flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Sign in
                </Button>

                <AuthModel
                isOpen={showAuthModel}
                onClose={()=>setShowAuthModel(false)}
                />
    </div>
  )
}

export default AuthButton