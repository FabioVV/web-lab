import React from 'react'
import Link from 'next/link'

function Booking({book, handleClick, handleEdit, handleRemove}) {
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
                    <div className="font-bold">{book.laboratory}</div>
                    <div className="text-sm opacity-50">Atualizado em: {book.updated_at}</div>
                </div>
            </div>
            </td>

            <td>
                {book.booked_at}
                <br/>
                <span className="badge badge-ghost badge-sm">Número do boleto: {book.bol_number}</span>
            </td>

            <td>
                {book.user}
            </td>

            <th>
                <Link href="" className="btn btn-ghost btn-xs">Editar</Link>
                <Link href="" className="btn btn-ghost btn-xs">Cancelar</Link>
            </th>

        </tr>
  )
}

export default Booking