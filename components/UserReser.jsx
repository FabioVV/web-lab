
import { useSession } from 'next-auth/react'
import DelModalBooking from './deleteModalBooking'
import Link from 'next/link'


function UserBooking({book, HandleFetch}) {

    const {data:session} = useSession()

  return (
        <tr>

            <th>
                <label className='cursor-help' title='Número da reserva'>
                    {book.id}
                </label>
            </th>
            <th>
                {book.is_active ?
                <label className='cursor-help' title='Ainda reservado.'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> 
                </label>
                : 
                <label className='cursor-help' title='Reserva já finalizada.'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </label>
                }

            </th>

            <td>
                {book?.id}
            </td>

            <td>
            <div className="flex items-center space-x-3">
                {/* <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                        <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                    </div>
                </div> */}
                <div>
                    <div className="font-bold">{book.laboratory_name}</div>
                    <div className="text-sm opacity-50">Reserva atualizada em: {book.updated_at ? book.updated_at: 'Não foi atualizada.'}</div>
                </div>
            </div>
            </td>

            <td>
                {book?.booked_at?.replaceAll('-', '/')}
                <br/>
                {/* <span className="badge badge-ghost badge-sm">Número do boleto: {book.bol_number}</span> */}
            </td>

            <th>
            {book?.is_active && (session?.user.id == book?.user_id || session?.user.is_superuser || session?.user.is_staff) ? 
                <div>
                    <Link className="btn btn-outline btn-info btn-xs mr-2 mb-2" href={`/booking/edit?id=${book?.id}`}>Editar</Link>
                    <button onClick={() => {document.getElementById(`my_modal_delete_booking_${book?.id}`)?.showModal()}} className="btn btn-outline btn-error btn-xs mr-2 mb-2">Remover</button>
                    <DelModalBooking HandleFetch={HandleFetch} book_id={book?.id}/>
                </div>
                :
                ""
                }
            </th>

        </tr>
  )
}

export default UserBooking
