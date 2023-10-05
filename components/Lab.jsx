import React from 'react'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function Laboratory({lab, handleClick, handleEdit, handleRemove}) {
  return (
    <div className="overflow-x-auto">
        <table className="table">

            {/* head */}
            <thead>
            <tr>
                <th>
                    <label>
                        Disponivel?
                    </label>
                </th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>?</th>
                <th></th>
            </tr>
            </thead>
            <tbody>

            {/* rows */}
            <tr>
                <th>
                <label>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
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
                        <div className="font-bold">{lab.results.name}</div>
                        <div className="text-sm opacity-50">Capacidade: 1</div>
                    </div>
                </div>
                </td>

                <td>
                    {lab.results.about}
                    <br/>
                    <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                </td>

                <td>
                    ?
                </td>

                <th>
                    <button className="btn btn-ghost btn-xs">Editar</button>
                    <button className="btn btn-ghost btn-xs">Remover</button>
                </th>

            </tr>
            </tbody>

            {/* foot */}
            <tfoot>
            <tr>
                <th></th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>?</th>
                <th></th>
            </tr>
            </tfoot>
            
        </table>
    </div>
  )
}

export default Laboratory