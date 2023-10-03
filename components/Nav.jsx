"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import Popup from '@utils/popup'


const Nav = () => {

    const {data: session} = useSession()
    const [navbar, setNavbar] = useState(false);
    const [showModal, setShowModal] = useState(false);

  return (
    <nav>
        {console.log(session)}
        {session?.user ? (
                
                <div>
                <nav className="w-full border-b-2 border-white-900">
                  <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                    <div>
                      <div className="flex items-center justify-between py-3 md:py-5 md:block">
                          <a href='/account' className="text-2xl  font-bold">BEM VINDO, {session?.user.first_name}</a>
                        
                        <div className="md:hidden">
                          <button
                            className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                            onClick={() => setNavbar(!navbar)}
                          >
                            {navbar ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 "
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 "
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M4 6h16M4 12h16M4 18h16"
                                />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                          navbar ? 'block' : 'hidden'
                        }`}
                      >
                        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                          <li className="">
                            <Link className='hover:border-b-2 hover:border-white-900 ' href="/">
                              Início
                            </Link>
                          </li>
                          <li className="">
                            <Link className='hover:border-b-2 hover:border-white-900 ' href="/about">
                              Sobre
                            </Link>
                          </li>
                          <li className="">
                            <Link  className='hover:border-b-2 hover:border-white-900 ' href="/account">
                              Conta
                            </Link>
                          </li>
                          <li className="">
                            <button className='hover:border-b-2 hover:border-white-900 '  onClick={signOut}>
                                Sair
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
          
        ):(
        <>
        <div>
        <nav className="w-full border-b-2 border-white-900">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
            <div>
                <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    <a href='/' className="text-2xl  font-bold">Lab-Book</a>
                
                <div className="md:hidden">
                    <button
                    className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                    onClick={() => setNavbar(!navbar)}
                    >
                    {navbar ? (
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 "
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                        </svg>
                    ) : (
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                        </svg>
                    )}
                    </button>
                </div>
                </div>
            </div>
            <div>
                <div
                className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                    navbar ? 'block' : 'hidden'
                }`}
                >
                <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                    <li className="">
                    <Link className='hover:border-b-2 hover:border-white-900 ' href="/">
                        Início
                    </Link>
                    </li>
                    <li className="">
                    <Link className='hover:border-b-2 hover:border-white-900 ' href="/about">
                        Sobre
                    </Link>
                    </li>
                    <li className="">
                    <button className='hover:border-b-2 hover:border-white-900'  onClick={signIn}>
                        Entrar
                    </button>
                    </li>
                    <li className="">
                    <button className='hover:border-b-2 hover:border-white-900' onClick={()=>setShowModal(true)}>
                        Criar conta
                    </button>
                    
                    </li>
                </ul>
                </div>
            </div>
            </div>
        </nav>
        </div>
        <Popup onClose={()=> setShowModal(false)} isVisible={showModal} />
        </>
        )}
    </nav>
  )
}

export default Nav