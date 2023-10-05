
import React from 'react'
import Link from "next/link"
import AppFeed from '@components/AppFeed'

function Home() {

  return ( 
    <section className='text-center'>

      <br></br>

      <section className='max-w-4xl'>
        <AppFeed/> 
      </section>
      
    </section>
  )
}

export default Home