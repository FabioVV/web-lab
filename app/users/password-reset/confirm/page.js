"use client"

import { signIn } from "next-auth/react"
import { useEffect, useState } from "react"
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useSearchParams } from 'next/navigation'
import { motion } from "framer-motion"



export default function PasswordResetConfirm() {

  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [Passwordchanged, setPasswordchanged] = useState(false)

  const [Newpassword, setNewpassword] = useState({
    password: '',
    token:token,
  })


  const submit = async() => {

    setIsLoading(true)
    setPasswordchanged(false)

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

        window.flash('Ocorreu um erro. Tente novamente.', 'error')

      } else {
        
        setPasswordchanged(true)
        document.getElementById(`my_modal_password_reset_confirmed`)?.showModal()

        //signIn()

      }

    } catch(error){

      console.log(error)

    } finally {

      setIsLoading(false)

    }

  }


  useEffect(()=>{
    if(Passwordchanged)document.getElementById(`my_modal_password_reset_confirmed`)?.showModal()
  },[Passwordchanged])



  if(Newpassword.token){

    return (
      <>
        {Passwordchanged ? 
          <dialog id={`my_modal_password_reset_confirmed`}  className="modal" data-theme='dark'>
              <motion.div       
              initial={{ x: 600, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }} 
              className="modal-box">
                  <div className="">
                      <div className="p-6 md:mx-auto">
                          <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                              <path fill="currentColor"
                                  d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                              </path>
                          </svg>
                          <div className="text-center">
                              <h3 className="md:text-2xl text-base font-semibold text-center">Senha alterada!</h3>
                              <p className="my-2 mt-7"> A senha da sua conta foi alterada com sucesso.</p>
                              <p> Você já pode se logar agora.  </p>
                              <div className="py-10 text-center">
                                  {/* <a href="#" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                                      GO BACK window.location.reload();
                                  </a> */}
                                  <button onClick={() =>{document.getElementById('close').click(); signIn()}} id={`confirmed`} className="btn text-green-600" type='button' >
                                      {isLoading ? <span className="loading loading-spinner loading-lg"></span> : 'Concluir'}
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
                  <form className="hidden" method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button id='close' className="btn">Fechar</button>
                </form>
              </motion.div>
          </dialog>
        :
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
                  <button disabled={isLoading} onClick={handleSubmit(submit)} className="btn btn-outline btn-success btn-wide w-full">
                    {isLoading ? <span className="loading loading-spinner loading-lg"></span> : 'Confirmar'}
                  </button>
                </div>
              </form>

            </div>
          </div>
        }
      </>


  
    );
  } else {
    window.location.replace('/')
  }


}
