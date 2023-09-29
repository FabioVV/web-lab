"use client"
import { getCsrfToken, signIn } from "next-auth/react"
import { useRef } from "react"
import Link from "next/link"
export default function LoginPage() {

  const email = useRef('')
  const password = useRef('')

  const submit = async()=>{
    const result = await signIn("credentials", {
      email:email.current,
      password:password.current,
      redirect:true,
      callbackUrl:'/'
    })
  }


  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center "> - Digite suas credenciais -</h1>
        <form className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold "
            >
              Email
            </label>
            <input
               name="email" type="email" onChange={(e)=>{email.current = e.target.value}}
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
            <input
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
            <button onClick={submit} className="w-full px-4 py-2 tracking-wide border-2 border-white-900 transition-colors duration-200 transform rounded-md hover:bg-white hover:text-black focus:text-black focus:outline-none focus:bg-white">
              Entrar
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-center">
          Ainda sem conta?{" "}
          <Link
            href="/register"
            className="font-medium hover:underline"
          >
            Registre-se aqui
          </Link>
        </p>
      </div>
    </div>
  );
}

