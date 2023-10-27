
import { useSession } from 'next-auth/react'
import DelModalBooking from './deleteBookingModal'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

require('dayjs/locale/pt-br')
let relativeTime = require('dayjs/plugin/relativeTime')
const dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin

dayjs.locale('pt-br')
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)


function UserBooking({book, HandleFetch}) {

    const {data:session} = useSession()


    // CRIANDO DATA DO FIM DA RESERV
    let dateEnd = book?.booking_end.substring(0, 10) //27-10-2023 DATE
    let timeEnd = book?.booking_end.substring(11, 19) //11:21:22 TIME
    let yearEnd = dateEnd.substring(6, 10) //2023
    let monthEnd = dateEnd.substring(3, 5) //10
    let dayEnd = dateEnd.substring(0, 2) //27
    let hoursEnd = timeEnd.substring(0, 2) //11
    let minutesEnd = timeEnd.substring(3, 5) //21
    let secondsEnd = timeEnd.substring(6, 8) //22


    let data_inicio = new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate(), new Date().getHours(), new Date().getMinutes(), new Date().getSeconds())
    let data_fim = new Date(yearEnd, monthEnd, dayEnd, hoursEnd, minutesEnd, secondsEnd)
    let tempo_restante = dayjs(data_inicio).to(data_fim)
    let ref = useRef(tempo_restante)

    useEffect(() => {

        const timer = setInterval(() => {
            let data_inicio_inner = new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate(), new Date().getHours(), new Date().getMinutes(), new Date().getSeconds())

            ref.current = dayjs(data_inicio_inner).to(data_fim)

        }, 1000);
        timer
        return () => clearInterval(timer);  

    }, []);

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

            {/* <td>
                {book?.laboratory_id}
            </td> */}

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

            <td>
                {book?.booking_end?.replaceAll('-', '/')}
                <br/>
                {/* <span className="badge badge-ghost badge-sm">Número do boleto: {book.bol_number}</span> */}
            </td>

            <td>
                {book.is_active ?
                    <>
                        {data_inicio > data_fim ? <span className='text-error'>Finalizada</span>:<span className='text-info'>{ref.current?.replaceAll('em', '')}</span>}
                    </>
                :
                    <span className='text-error'>Finalizada</span>
                }
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
