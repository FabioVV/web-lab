"use client"

import { signIn } from "next-auth/react"
import { useRef } from "react"
import Link from "next/link"
import { useState } from "react"
import Image from 'next/image'
import { useRouter } from 'next/navigation';

export default function LoginPage() {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()

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

        //window.location.replace('/')
        router.push('/')
        window.flash(`Seja bem vindo(a)!`, 'success')

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
              Email *
            </label>
            <input
               name="email" type="email" onChange={(e)=>{email.current = e.target.value}} placeholder="john@email.com"
              className="input input-bordered w-full max-w"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password" 
              className="block text-sm font-semibold "
            >
              Senha *
            </label>
            <input placeholder="******"
              name="password" type="password" onChange={(e)=>{password.current = e.target.value}}
              className="input input-bordered w-full max-w"
            />
          </div>
          <Link
            href="/forget"
            className="text-xs hover:underline"
          >
            Esqueceu a senha?
          </Link>
          <div className="mt-2">
            <button disabled={isLoading} onClick={submit} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              {isLoading ? <span className="loading loading-spinner loading-lg"></span> : 'Entrar'}
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


