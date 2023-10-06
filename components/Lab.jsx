import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import DelModal from './deleteModal'
import EdModal from './editModal'

function Laboratory({lab, handleClick, handleEdit, handleRemove}) {

    const {data:session} = useSession()
    const router = useRouter()
  
    
    function handleBooking(id){
        router.push(`/bookings/register?id=${id}`)
    }

    function handleEditLab(id){
        //router.push(`/laboratories/edit-lab?id=${id}`)
        document.getElementById('my_modal_2').showModal()

    }

    const handleDeleteLab = async (id) => {
        document.getElementById('my_modal_1').showModal()
        

        // const hasConfirmed = confirm("Você tem certeza que deseja desativar este laboratório?")
        
    
        // if(hasConfirmed){
        //     try{
        //     const response = await fetch(`http://127.0.0.1:8000/api/v3/laboratorios/${id}/`,{
        //         method:"DELETE",
    
        //         headers: { 
        //             "Content-Type":"application/json", Authorization:`Bearer ${session?.user.access}`
        //         }
        //     })
    
        //     if(response.ok){
    
        //         window.location.replace('/')
        //         window.flash(`Laboratório desativado.`, 'success')
    
        //     } else {
        //         window.flash(`Erro ao desativar laboratório.`, 'error')
        //         setIsLoading(false)
        //     }
    
        //     }catch(err){
        //         console.log(err)
        //     }
        // }
          
    }


  return (
        <tr>
            <th>
            <label className='cursor-help' title='Laboratório está disponível para reserva?'>
                {lab.is_active ? <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            </label>
            </th>

            <td>
            <div className="flex items-center space-x-3">
                {/* <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                        <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                    </div>
                </div> */}
                <div>
                    <div className="font-bold">{lab.name} </div>
                    <div className="text-sm opacity-50">Capacidade: {lab.capacity}</div>
                </div>
            </div>
            </td>

            <td>
                {lab.about}
                <br/>
                <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
            </td>

            {/* <td>
                ?
            </td> */}

            <th>
                {session?.user.user_type == 2 || session?.user.is_superuser || session?.user.is_staff ? 
                <div>
                    <button onClick={() => handleBooking(lab.id)} className="btn btn-ghost btn-xs">Reservar</button>
                    <button onClick={() => handleEditLab(lab.id)} className="btn btn-ghost btn-xs">Editar</button>
                    <button onClick={() => handleDeleteLab(lab.id)} className="btn btn-ghost btn-xs">Remover</button>
                    <DelModal lab_id={lab.id}/>
                    <EdModal lab_id={lab.id}/>
                </div>
                :
                ""
                }

            </th>


        </tr>
  )
}

export default Laboratory