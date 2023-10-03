import React from 'react'
import Link from "next/link"

function Home() {
  return (
    <section className='text-center'>


      <Link  className='hover:border-b-2 hover:border-white-900 ' href="/laboratories/register">
        Criar laboratório
      </Link>
      

    </section>
  )
}

export default Home