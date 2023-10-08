import React from 'react'
import Link from 'next/link'
import DelModalBooking from './deleteModalBooking'
import EdModal from './editModal'
import { useSession } from 'next-auth/react'


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
                {book?.booked_at.replaceAll('-', '/')}
                <br/>
                <span className="badge badge-ghost badge-sm">Número do boleto: {book.bol_number}</span>
            </td>

            <td>
                {book.user_name}
            </td>

            <th>
            {session?.user.id === book.user.id || session?.user.is_superuser || session?.user.is_staff ? 
                <div>
                    {/* <button onClick={() => {document.getElementById(`my_modal_edit_${book.laboratory}`)?.showModal()}} className="btn btn-ghost btn-xs">Editar</button> */}
                    <button onClick={() => {document.getElementById(`my_modal_delete_${book.laboratory}`)?.showModal()}} className="btn btn-ghost btn-xs">Remover</button>
                    <DelModalBooking book_id={book.laboratory}/>
                    {/* <EdModal lab_id={book.laboratory}/> */}
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

export default Booking