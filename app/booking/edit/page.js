"use client"

import { signIn } from "next-auth/react"
import { useEffect, useState } from "react"
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useSearchParams } from 'next/navigation'
import { motion } from "framer-motion"
import Auto_ from "@components/AutocompleteLab";

export default function BookingEdit() {

  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const searchParams = useSearchParams()
  const book_id = searchParams.get('id')

  const [lab, setLab] = useState({
    laboratory: '',
  })


  const submit = async() => {

    setIsLoading(true)

    try{
      const result = await fetch(`http://127.0.0.1:8000/api/v3/reservas/${book_id}/`, {
        method:'POST',

        headers: {
            "Content-Type":"application/json",
        }, 

        body:JSON.stringify({
            laboratory:lab.laboratory,
        })
      })

      if (!result.ok) {

        window.flash('Ocorreu um erro. Tente novamente.', 'error')

      } else {
        
        alert(`aaa`)
        //signIn()
        HandleFetch()
      }

    } catch(error){

      console.log(error)

    } finally {

      setIsLoading(false)

    }

  }



    return (

      <>
          <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 rounded-md shadow-lg lg:max-w-xl">
              <h1 className="text-3xl font-bold text-center "> Digite o nome do laboratório desejado </h1>

              <form method="POST" className="mt-6">
                <div className="mb-4">
                  {/* <label
                    htmlFor="password"
                    className="block text-sm font-semibold "
                  >
                    Laboratório
                  </label> */}

                  <Auto_/>

                  <ErrorMessage
                      errors={errors}
                      name="text"
                      render={({ message }) => 
                      <div className="text-red-400 px-2 py-1 rounded relative mt-2" role="alert" id='email-message'>
                          <strong className="font-bold">* {message}</strong>
                      </div>}
                  />

                </div>
      
                <div className="mt-2">
                  <button disabled={isLoading} onClick={handleSubmit(submit)} className="btn btn-outline btn-success btn-wide w-full">
                    {isLoading ? <span className="loading loading-spinner loading-lg"></span> : 'Confirmar'}
                  </button>
                </div>
              </form>

            </div>
          </div>
      </>

    );

}
