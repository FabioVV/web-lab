import React from 'react'
import Link from 'next/link'
import DelModalBooking from './deleteModalBooking'
import EdModal from './editModal'
import { useSession } from 'next-auth/react'
import EdModalBooking from './editModalBooking'

function Booking({book, handleClick, handleEdit, handleRemove}) {

    const {data:session} = useSession()


  return (
        <tr>
            <th>
            <label className='cursor-help' title='Número da reserva'>
                {book.id}
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
                    <div className="text-sm opacity-50">Atualizado em: {book.updated_at}</div>
                </div>
            </div>
            </td>

            <td>
                {book?.booked_at?.replaceAll('-', '/')}
                <br/>
                {/* <span className="badge badge-ghost badge-sm">Número do boleto: {book.bol_number}</span> */}
            </td>

            <td>
                {book?.username}
            </td>

            <th>
            {session?.user.id == book?.user_id || session?.user.is_superuser || session?.user.is_staff ? 
                <div>
                    <button onClick={() => {document.getElementById(`my_modal_edit_booking_${book.id}`)?.showModal()}} className="btn btn-outline btn-info btn-xs mr-2 mb-2">Editar</button>
                    <button onClick={() => {document.getElementById(`my_modal_delete_booking_${book?.id}`)?.showModal()}} className="btn btn-outline btn-error btn-xs mr-2 mb-2">Remover</button>
                    <DelModalBooking book_id={book?.id}/>
                    <EdModalBooking book_id={book?.id}/>
                </div>
                :
                ""
                }
            </th>

        </tr>
  )
}

export default Booking