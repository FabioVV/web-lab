
import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

function UserBooking({book, handleClick, handleEdit, handleRemove}) {

    const {data:session} = useSession()

  return (
        <tr>

            <th>
                <label className='cursor-help' title='Número da reserva'>
                    {book.id}
                </label>
            </th>
            <th>
                <label className='cursor-help' title='Reserva já finalizada.'>
                    {book.is_active ? <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
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
                    <div className="font-bold">{book.laboratory_name}</div>
                    <div className="text-sm opacity-50">última vez atualizado: {book.updated_at}</div>
                </div>
            </div>
            </td>

            <td>
                {book?.booked_at.replaceAll('-', '/')}
                <br/>
                <span className="badge badge-ghost badge-sm">Número do boleto: {book.bol_number}</span>
            </td>

            <th>
            {session?.user.id === book.user.id || session?.user.is_superuser || session?.user.is_staff ? 
                <div>
                    <button onClick={() => {}} className="btn btn-ghost btn-xs">Editar</button>
                    <button onClick={() => {}} className="btn btn-ghost btn-xs">Remover</button>
                    {/* MODALS DE CONTROLE DAS RESERVAS IRÃO AQUI */}
                </div>
                :
                ""
                }
                {/* <Link href="" className="btn btn-ghost btn-xs">Editar</Link>
                <Link href="" className="btn btn-ghost btn-xs">Cancelar</Link> */}
            </th>

        </tr>
  )
}

export default UserBooking