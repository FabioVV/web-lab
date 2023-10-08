import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

function DelModalBooking({book_id}) {
    const {data:session} = useSession()
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)

    const DesativarLab = async() => {
        setSubmitting(true)

        try{
            const response = await fetch(`http://127.0.0.1:8000/api/v3/reservas/${book_id}/`,{
                method:"DELETE",
    
                headers: { 
                    "Content-Type":"application/json", Authorization:`Bearer ${session?.user.access}`
                }
            })
    
            if(response.ok){
                setSubmitting(false)

                document.getElementById('close').click()
                window.location.replace('/')
                window.flash(`Reserva removida.`, 'success')
    
            } else {
                window.flash(`Erro ao remover reserva.`, 'error')
            }
    
        } catch(err) {
            console.log(err)

        } finally {
            setSubmitting(true)

        }
        
    } 
    
    


  return (
    <dialog id={`my_modal_delete_${book_id}`} className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>Você tem certeza?
                
            </h3>
            <p className="py-4">Está ação ira <span className='text-red-600'>remover</span> a reserva.<br></br> 
                Para refazer a reserva, será necessário pagar novamente.</p>
            <div className="modal-action">

                <button disabled={submitting} onClick={() => DesativarLab()} type="button" className="btn text-red-600">
                    {submitting ? <span className="loading loading-spinner loading-lg"></span> : 'Remover reserva'}
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

export default DelModalBooking