import React from 'react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { signOut } from 'next-auth/react'

function DelModalAccount() {
    const {data:session} = useSession()
    const [submitting, setSubmitting] = useState(false)

    const DesativarConta = async() => {
        setSubmitting(true)

        try{
            const response = await fetch(`http://127.0.0.1:8000/api/v3/usuarios/${session?.user.id}/`,{
              method:"DELETE",
    
              headers: { 
                  "Content-Type":"application/json", Authorization:`Bearer ${session?.user.access}`
              }
            })
    
            if(response.ok){
              
              window.scrollTo({ top: 0, behavior: 'smooth' });
              signOut()
              window.location.replace('/')

            } else {
              
              window.scrollTo({ top: 0, behavior: 'smooth' });
              window.flash(`Erro. Favor, tentar novamente.`, 'error')
              setIsLoading(false)
            }
    
          }catch(err){
            console.log(err)
          }
        
    } 
    
    


  return (
    <dialog id={`my_modal_delete_user_${session?.user.id}`} className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>Você tem certeza?
                
            </h3>
            <p className="py-4">Ação <span className='text-red-600 font-bold'>irreversível.</span><br></br> 
                Você não poderá mais recuperar sua conta.<br></br>  Somente mediante contato com os administradores do site.</p>
            <div className="modal-action">

                <button disabled={submitting} onClick={() => DesativarConta()} type="button" className="btn text-red-600">
                    {submitting ? <span className="loading loading-spinner loading-lg"></span> : <span>Concordo com as condições.</span>}
                </button>

                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button id='close' className="btn">Fechar</button>
                </form>
            </div>
        </div>
    </dialog>
  )
}

export default DelModalAccount