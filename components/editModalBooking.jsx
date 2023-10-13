
import React from 'react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useEffect } from 'react'
import { ErrorMessage } from '@hookform/error-message';
import { useForm } from 'react-hook-form';
import auto_ from './AutocompleteLab'


function EdModalBooking({book_id, HandleFetch}) {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const {data:session} = useSession()
    const [submitting, setSubmitting] = useState(false)
    const [booking, setBooking] = useState({
        laboratory: '',
    })

    useEffect(()=>{
        let defaultValues = {};
        const getBooking = async () => {
          const response = await fetch(`http://127.0.0.1:8000/api/v3/reservas/${book_id}/`, {
            method:'GET',
  
            headers:{ Authorization:`Bearer ${session?.user.access}`, 'Content-Type': 'application/json'
          },
          })
          const data = await response.json()
          setBooking({
            laboratory: data.laboratory,
          })

          defaultValues.laboratory = data.laboratory;

          reset({ ...defaultValues });

        }
  
        if(book_id)getBooking()
      },[book_id])


      const EditBooking = async(form, e) => {
        e.preventDefault();
        setSubmitting(true)
  
        try{
          const response = await fetch(`http://127.0.0.1:8000/api/v3/reservas/${book_id}/`, {
            method:'PATCH',
  
            headers:{ Authorization:`Bearer ${session?.user.access}`, 'Content-Type': 'application/json'
          },
  
            body:JSON.stringify({
              laboratory:booking.laboratory, 

            })
          })
  
          if(response.ok){
  
            document.getElementById('closerr').click()
            HandleFetch()            
            window.flash(`Reserva atualizada.`, 'success')
            
          } else {
            window.flash(`Erro ao atualizar reserva`, 'error')
          }
  
        } catch(err){
  
          console.log(err)
  
        } finally {
  
          setSubmitting(false)
  
        }
      }



  return (
    <dialog id={`my_modal_edit_booking_${book_id}`}  className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Alterar reserva Nº{book_id}</h3>
            <hr />

            <div className="relative flex flex-col items-center justify-center overflow-hidden">
                <div className="w-full">
                    <div className=''>
                        
                        <form method='post' onSubmit={handleSubmit(EditBooking)} id='form' className="w-full p-6">
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full  px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="name">
                                        Nome
                                    </label>
                                    <auto_ /> 
                                </div>
                                
                            </div> 

                        </form>

                    </div>
                </div>
                
            </div>
                
            <div className="modal-action">
                
                <button disabled={submitting} onClick={()=>{document.getElementById(`sub_e_${book_id}`).click()}} type="button" className="btn text-green-600">
                    {submitting ? <span className="loading loading-spinner loading-lg"></span> : 'Salvar'}
                </button>
                
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button id='closerr' className="btn">Fechar</button>
                </form>
            </div>
        </div>
    </dialog>
  )
}

export default EdModalBooking