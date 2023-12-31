import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

function DelModal({lab_id, HandleFetch}) {
    const {data:session} = useSession()
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)

    const DesativarLab = async() => {
        setSubmitting(true)
        try{
            const response = await fetch(`http://127.0.0.1:8000/api/v3/laboratorios/${lab_id}/`,{
                method:"DELETE",
    
                headers: { 
                    "Content-Type":"application/json", Authorization:`Bearer ${session?.user.access}`
                }
            })
            
            if(response.ok){
                setSubmitting(false)

                document.getElementById('close').click()
                HandleFetch()
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.flash(`Laboratório desativado.`, 'success')
    
            } else {
                document.getElementById('close').click()
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.flash(`Erro ao desativar laboratório.`, 'error')

            }
    
        } catch(err) {

            console.log(err)
            
        } finally {

            setSubmitting(false)
        }
        
    } 
    
    


  return (
    <dialog id={`my_modal_delete_${lab_id}`} className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>Você tem certeza?
                
            </h3>
            <p className="py-4">Está ação ira <span className='text-red-600'>desativar</span> o Laboratório.<br></br> 
            Reativação somente mediante contato com os administradores.</p>
            <div className="modal-action">

                <button disabled={submitting} onClick={() => DesativarLab()} type="button" className="btn text-red-600">
                    {submitting ? <span className="loading loading-spinner loading-lg"></span> : 'Remover laboratório'}
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

export default DelModal