
import React from 'react'
import Link from "next/link"
import LabFeed from '@components/LabFeed'

function Home() {

  return ( 
    <section className='text-center'>

      <br></br>

      <section className='max-w-4xl'>
        <LabFeed/> 
      </section>
      
    </section>
  )
}

export default Home