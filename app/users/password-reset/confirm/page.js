"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useSearchParams } from 'next/navigation'



export default function LoginPage() {

  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const searchParams = useSearchParams()
  const search = searchParams.get('token')

  const [Newpassword, setNewpassword] = useState({
    password: '',
    token:search,
  })


  const submit = async() => {

    setIsLoading(true)

    try{
      const result = await fetch('http://127.0.0.1:8000/api/v3/password_reset/confirm/', {
        method:'POST',

        headers: {
            "Content-Type":"application/json",
        }, 

        body:JSON.stringify({
            password:Newpassword.password,
            token:Newpassword.token
        })
      })

      if (!result.ok) {

        throw new Error('Ocorreu um erro. Tente novamente.')

      } else {

        //window.location.replace('/')
        signIn()

      }

    } catch(error){

      console.log(error)

    } finally {

      setIsLoading(false)

    }

  }


  return (
    
    <div>
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
          <div className="w-full p-6 rounded-md shadow-lg lg:max-w-xl">
            <h1 className="text-3xl font-bold text-center ">  Digite sua nova senha </h1>

            <form method="POST" className="mt-6">
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold "
                >
                  Nova senha *
                </label>
                <input
                  name="password" id="password" type="password" placeholder="*********"
                  className="input input-bordered w-full max-w"
                  {...register("password",{ required: "Campo obrigatório.", minLength:{value:8, message:'Necessita no minímo 8 caracteres '}, onChange: (e) => {setNewpassword({...Newpassword, password:e.target.value})}, })}

                />
                <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ message }) => 
                    <div className="text-red-400 px-2 py-1 rounded relative mt-2" role="alert" id='email-message'>
                        <strong className="font-bold">* {message}</strong>
                    </div>}
                />


              </div>
              <div className="mb-2">
                <label
                  htmlFor="password_confirmation" 
                  className="block text-sm font-semibold "
                >
                  Confirme a nova senha *
                </label>
                <input 
                  name="password_confirmation" id="password_confirmation" type="password" placeholder="*********"
                  className="input input-bordered w-full max-w"
                  {...register("password_confirmation", {validate:(password) =>{if(watch('password')!=password)return "Suas senhas não coincidem."}, required: "Campo obrigatório.", minLength:{value:8, message:'Necessita no minímo 8 caracteres '}, onChange: (e) => {setNewpassword({...Newpassword, password_confirmation:e.target.value})}, })}

                />
                <ErrorMessage
                    errors={errors}
                    name="password_confirmation"
                    render={({ message }) => 
                    <div className="text-red-400 px-2 py-1 rounded relative mt-2" role="alert" id='email-message'>
                        <strong className="font-bold">* {message}</strong>
                    </div>}
                />


              </div>
    
              <div className="mt-2">
                <button disabled={isLoading} onClick={submit} className="btn btn-outline btn-success btn-wide">
                  {isLoading ? <span className="loading loading-spinner loading-lg"></span> : 'Confirmar'}
                </button>
              </div>
            </form>

          </div>
        </div>
    </div>

  );
}
