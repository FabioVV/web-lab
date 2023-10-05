"use client"

import { signIn } from "next-auth/react"
import { useRef } from "react"
import Link from "next/link"
import { useState } from "react"
import Image from 'next/image'
import { getSession } from "next-auth/react"

export default function LoginPage() {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const email = useRef('')
  const password = useRef('')

  const submit = async() => {

    setIsLoading(true)
    setError(null)

    try{
      const result = await signIn("credentials", {
        email:email.current,
        password:password.current,
        redirect:false,
        //callbackUrl:'/'
      })

      if (!result.ok) {

        throw new Error('Email ou senha incorretos.')

      } else {

        window.location.replace('/')

      }

    } catch(error){

      window.flash(error.message, 'error')
      console.log(error)

    } finally {

      setIsLoading(false)

    }

  }


  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 rounded-md shadow-lg lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center ">  Digite suas credenciais </h1>

        <form method="POST" className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold "
            >
              Email
            </label>
            <input
               name="email" type="email" onChange={(e)=>{email.current = e.target.value}} placeholder="john@email.com"
              className="block w-full px-4 py-2 mt-2 border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password" 
              className="block text-sm font-semibold "
            >
              Senha
            </label>
            <input placeholder="******"
              name="password" type="password" onChange={(e)=>{password.current = e.target.value}}
              className="block w-full px-4 py-2 mt-2 border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <Link
            href="/forget"
            className="text-xs hover:underline"
          >
            Esqueceu a senha?
          </Link>
          <div className="mt-2">
            <button disabled={isLoading} onClick={submit} className="flex justify-center w-full px-4 py-2 tracking-wide border-2 border-white-900 transition-colors duration-200 transform rounded-md hover:bg-white hover:text-black focus:text-black focus:outline-none focus:bg-white">
              {isLoading ? <Image src="/images/loading.gif" className="" width={30} height={30} alt="loading gif"/>: 'Entrar'}{isLoading ? " Aguarde....": ''}
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-center">
          Ainda sem conta?{" "}
          <Link
            className="font-medium hover:underline" href="/users/register"
          >
            Registre-se aqui
          </Link>
        </p>

      </div>
    </div>
  );
}


