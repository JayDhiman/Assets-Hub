import React from 'react'
import Layout from '../../Components/Dashboard/Layout'

const Employee = () => {
  return (
    <Layout>
     <div className='flex overflow-auto'>
        <div className='w-full overflow-hidden'>
        <div className='m-4 border-b'>
            {/* it needs to be dynamic */}
            <h1 className='text-2xl font-primary mx-1 font-medium '>Employee</h1>
            <h2 className='uppercase text-[15px] mx-2 mb-2 '>Dashboard / Employee</h2>
          </div>
        </div>

      </div>
    </Layout>
  )
}

export default Employee