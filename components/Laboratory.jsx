import React from 'react'
import { useSession } from 'next-auth/react'
import DelModal from './deleteLaboratoryModal'
import EdModal from './editLaboratoryModal'
import BookingModal from './registerBookingModal'

function Laboratory({lab, HandleFetch}) {

    const {data:session} = useSession()
  
    
    function handleBooking(id){
        document.getElementById(`my_modal_booking_${id}`)?.showModal()
    }

    function handleEditLab(id){
        document.getElementById(`my_modal_edit_${id}`)?.showModal()
    }

    const handleDeleteLab = async (id) => {
        document.getElementById(`my_modal_delete_${id}`)?.showModal()
    }


  return (
        <tr>
            
            <th title='Laboratório está disponível para reserva?'>
                {!lab.is_booked ? 
                <label className='cursor-help' title='Laboratório está disponível para reserva'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> 
                </label>
                : 
                <label className='cursor-help' title='Laboratório não está disponível para reserva'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </label>}


            
            </th>

            <th>
                {lab.id}
            </th>

            <td>
            <div className="flex items-center space-x-3">
                {/* <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                        <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                    </div>
                </div> */}
                <div>
                    <div className="font-bold">{lab.name}</div>
                    <div style={{cursor:'help'}} className="text-sm opacity-50">
                        {lab.updated_at && lab.updated_at != lab.created_at 
                            ? 
                                <>
                                    Laboratório foi atualizada em:
                                    <div title={`'Os dados do laboratório foram alterados.`} style={{display:'flex', flexDirection:'row', gap:'5px'}}>
                                        <svg style={{cursor:'pointer'}}  xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        {lab.updated_at.replaceAll('-', '/')}
                                    </div>
                                </>
                            : 
                            'Laboratório não foi atualizado.'
                        }
                    </div>
                </div>
            </div>
            </td>

            <td>
                {lab.about}
                <br/>
                <span className="badge badge-ghost badge-sm text-sm opacity-50">Capacidade: {lab.capacity} lugares</span>
            </td>

            <th>
                <div>
                    {/* <div className='border-solid mb-1'>
                    </div> */}
                    
                    <div className='border-solid mb-1'>
                        {!lab.is_booked && (session?.user.user_type == 2 || session?.user.is_superuser || session?.user.is_staff) ? 
                            <>
                                <button onClick={() => handleBooking(lab.id)} className="btn btn-outline btn-success btn-xs mr-2 mb-2">Reservar</button>
                            </>
                        :

                        ""
                        }

                        {!lab.is_booked && (lab.user_id == session?.user.id && session?.user.user_type == 2 || (session?.user.is_superuser || session?.user.is_staff)) ? 
                            <>
                                <button onClick={() => handleEditLab(lab.id)} className="btn btn-outline btn-info btn-xs mr-2 mb-2">Editar</button>
                                <button onClick={() => handleDeleteLab(lab.id)} className="btn btn-outline btn-error btn-xs mr-2 mb-2">Remover</button>
                            </>
                        :

                        ""
                        }
                    </div>
                </div>
                

            </th>
            
            <DelModal HandleFetch={HandleFetch} lab_id={lab.id}/>
            <EdModal HandleFetch={HandleFetch} lab_id={lab.id}/>
            <BookingModal HandleFetch={HandleFetch} lab_id={lab.id}/>

        </tr>
        
  )
}

export default Laboratory