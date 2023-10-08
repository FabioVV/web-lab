import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import DelModal from './deleteModal'
import EdModal from './editModal'
import BookingModal from './registerBooking'

function Laboratory({lab, handleClick, handleEdit, handleRemove}) {

    const {data:session} = useSession()
    const router = useRouter()
  
    
    function handleBooking(id){
        //router.push(`/bookings/register?id=${id}`)
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

            <td>
            <div className="flex items-center space-x-3">
                {/* <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                        <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                    </div>
                </div> */}
                <div>
                    <div className="font-bold">{lab.name}</div>
                    <div className="text-sm opacity-50">--------</div>
                </div>
            </div>
            </td>

            <td>
                {lab.about}
                <br/>
                <span className="badge badge-ghost badge-sm">Capacidade: {lab.capacity} lugares</span>
            </td>

            {/* <td>
                ?
            </td> */}

            <th>

                {!lab.is_booked && (session?.user.user_type == 2 || session?.user.is_superuser || session?.user.is_staff) ? 
                <div className='border-solid border-b-2 border-indigo-600'>
                    <button onClick={() => handleBooking(lab.id)} className="btn btn-ghost btn-xs">Reservar</button>
                </div>
                :
                ""
                }

                {session?.user.user_type == 2 || session?.user.is_superuser || session?.user.is_staff ? 
                <div>
                    <button onClick={() => handleEditLab(lab.id)} className="btn btn-ghost btn-xs">Editar</button>
                    <button onClick={() => handleDeleteLab(lab.id)} className="btn btn-ghost btn-xs">Remover</button>
                    <DelModal lab_id={lab.id}/>
                    <EdModal lab_id={lab.id}/>
                    <BookingModal lab_id={lab.id}/>
                </div>
                :
                ""
                }

            </th>


        </tr>
  )
}

export default Laboratory