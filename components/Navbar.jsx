"use client"

import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import Image from 'next/image'


const Nav = () => {

    const {data: session} = useSession()
    const [navbar, setNavbar] = useState(false);

  return (
    <nav>
        {/* {console.log(session)} */}
        {session?.user ? (
                
          <div className="navbar bg-base-200">
              <div className="flex-1">
                <a onClick={()=>{window.location.href='/'; window.scrollTo({ top: 0, behavior: 'smooth' })}} className="btn btn-ghost text-xl">Lab booking</a>
              </div>
              <div className="flex-none gap-2">
                {/* <div className="form-control">
                  <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                </div> */}
                Olá, {session?.user.first_name}
                <div className="dropdown dropdown-end">
                  
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    
                    <div className="w-10 rounded-full">
                      
                      <Image
                        src="/images/user-placeholder.png"
                         width={100} 
                         height={100}
                        alt="Imagem do usuario - Placeholder"
                      />

                    </div>
                  </label>
                  <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52">
                    <li>
                      <Link href="/users/account" className="justify-between">
                        Conta
                        {/* <span className="badge">New</span> */}
                      </Link>
                    </li>
                    {/* <li><a>Settings</a></li> */}
                    <li onClick={()=>signOut({callbackUrl: `${window.location.origin}`})}><a>Sair</a></li>
                  </ul>
                </div>
              </div>
          </div>
          
        ):(
        <>
          <div className="navbar bg-base-200">
            <div className="flex-1">
              <a onClick={()=>{window.location.href='/'; window.scrollTo({ top: 0, behavior: 'smooth' })}} className="btn btn-ghost text-xl">Lab booking</a>
            </div>
            <div className="flex-none">
              <ul className="menu menu-horizontal px-1">
                <li><button onClick={signIn} >Entrar</button></li>
                <li><Link href="/users/register">Criar conta</Link></li>
                {/* <li>
                  <details>
                    <summary>
                      options?
                    </summary>
                    <ul className="p-2 bg-base-100">
                      <li><a>Link 1</a></li>
                      <li><a>Link 2</a></li>
                    </ul>
                  </details>
                </li> */}
              </ul>
            </div>
          </div>
        </>
        )}
    </nav>
  )
}

export default Nav