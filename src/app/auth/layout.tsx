import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-[100vh] ">
      <main className="flex justify-center items-center w-full h-[90vh]">
        {children}
      </main>
    </div>
  )
}

export default AuthLayout
