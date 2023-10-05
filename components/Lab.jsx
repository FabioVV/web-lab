import React from 'react'
import Link from 'next/link'

function Laboratory({lab, handleClick, handleEdit, handleRemove}) {
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
                    <div className="font-bold">{lab.name}</div>
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
                <Link href="" className="btn btn-ghost btn-xs">Reservar</Link>
                <Link href="" className="btn btn-ghost btn-xs">Editar</Link>
                <Link href="" className="btn btn-ghost btn-xs">Remover</Link>
            </th>

        </tr>
  )
}

export default Laboratory