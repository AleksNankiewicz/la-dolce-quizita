import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-[100vh] bg-[url('/donut-background.jpg')]">
      <main className="flex justify-center items-center w-full h-[90vh]">
        {children}
      </main>
    </div>
  )
}

export default AuthLayout
