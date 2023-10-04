import React from 'react'
import Link from "next/link"

function Home() {
  return ( 
    <section className='text-center'>

      <h1>TROCAR RESERVA DE EXCLUIR PARA DESATIVAR COMO O RESTO</h1>

      <br />
      <br />
      <br />
      <hr />

      <Link  className='text-red-600 hover:border-b-2 hover:border-white-900 ' href="/laboratories/register">
        Criar reserva
      </Link>
      <br />
      
      <Link  className='text-red-600 hover:border-b-2 hover:border-white-900 ' href="/laboratories/register">
        Editar reserva
      </Link>
      <br />

      <Link  className='text-red-600 hover:border-b-2 hover:border-white-900 ' href="/laboratories/register">
        Desativar reserva
      </Link>

      <hr />
      <br />
      <br />
      <br />




      <br />
      <br />
      <br />
      <hr />

      <Link  className='hover:border-b-2 hover:border-white-900 ' href="/laboratories/register">
        Criar conta
      </Link>
      <br />

      <Link  className='text-red-600 hover:border-b-2 hover:border-white-900 ' href="/laboratories/register">
        Editar conta
      </Link>
      <br />

      <Link  className='text-red-600 hover:border-b-2 hover:border-white-900 ' href="/laboratories/register">
        Desativar conta
      </Link>

      <hr />
      <br />
      <br />
      <br />


      <br />
      <br />
      <br />
      <hr />

      <Link  className='hover:border-b-2 hover:border-white-900 ' href="/laboratories/register">
        Criar laboratório
      </Link>
      <br />
      <Link  className='text-red-600 hover:border-b-2 hover:border-white-900 ' href="/laboratories/register">
        Editar laboratório
      </Link>
      <br />

      <Link  className='text-red-600 hover:border-b-2 hover:border-white-900 ' href="/laboratories/register">
        Desativar laboratório
      </Link>

      <hr />
      <br />
      <br />
      <br />

    </section>
  )
}

export default Home