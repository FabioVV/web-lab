"use client"

import { useRef } from "react"
import Link from "next/link"
import { useState } from "react"
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion"


export default function PasswordReset() {

  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const router = useRouter()

  const email = useRef('')

  const submit = async() => {

    setIsLoading(true)

    try{
      const result = await fetch('http://127.0.0.1:8000/api/v3/password_reset/', {
        method:'POST',
        headers: {
            "Content-Type":"application/json",
        },

        body: JSON.stringify({
            email:email.current
        })
      })

      const error = await result.json()
      if ((error['email'])) {

        window.flash(`Não existe uma conta associada a este email.`, 'error')
        setIsLoading(false)

        return false;

      } else if(result.ok){
        setEmailSent(true)
        document.getElementById('my_modal_email').showModal()

      } else {

        window.flash(`Erro. Favor, tentar novamente.`, 'error')
        setIsLoading(false)

        return false;

      }

    } catch(error){

      console.log(error)

    } finally {

      setIsLoading(false)

    }

  }


  return (

    <div>
        {emailSent ? 

            <dialog id='my_modal_email'  className="modal" data-theme='dark'>
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
                                <h3 className="md:text-2xl text-base font-semibold text-center">Email enviado!</h3>
                                <p className="my-2 mt-7">Confira sua caixa de entrada ou caixa spam.</p>
                                <div className="py-10 text-center">
                                    {/* <a href="#" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                                        GO BACK window.location.reload();
                                    </a> */}
                                    <button onClick={() =>{document.getElementById('close-email-modal').click();}} id={`sub_email`} className="btn text-green-600" type='button'>
                                        {isLoading ? <span className="loading loading-spinner loading-lg"></span> : 'Concluir'}
                                    </button>
                                </div>
                            </div>

                            <div className="hidden modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button id='close-email-modal' className="btn">Fechar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </dialog>

        :


        
            <dialog id='my_modal_email'  className="modal" data-theme='dark'>
                <motion.div       
                initial={{ x: 600, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }} 
                className="modal-box">

                    <div className="">
                        <div className="p-6 md:mx-auto">
                            <h1 className="text-3xl font-bold text-center ">  Digite seu email </h1>
                    
                            <form method="POST" className="mt-6">
                                <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold "
                                >
                                    Email *
                                </label>
                                <input
                                    name="email" type="email" onChange={(e)=>{email.current = e.target.value}} placeholder="johndoe@email.com"
                                    className="input input-bordered w-full max-w"
                                />
                    
                                <p className="italic">Digite o email da sua conta, para podermos entrar em contato.</p>
                    
                                </div>
                                <div className="hidden mt-2">
                                    <button id='email-reset-send' disabled={isLoading} onClick={submit} className="btn btn-wide btn-outline btn-success mr-3">
                                        {isLoading ? <span className="loading loading-spinner loading-lg"></span> : 'Enviar'}
                                    </button>
                                </div>
                            </form>
                    
                            <div className="modal-action">
                    
                                <button disabled={isLoading} onClick={()=>{document.getElementById(`email-reset-send`).click()}} type="button" className="btn text-green-600">
                                    {isLoading ? <span className="loading loading-spinner loading-lg"></span> : 'Enviar email'}
                                </button>
                                
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button id='close-email-modal' className="btn">Fechar</button>
                                </form>
                            </div>
                    
                        </div>
                    </div>
                    
                </motion.div>
            </dialog>
        }
    </div>

    

  );
}


