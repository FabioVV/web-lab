import { useSession } from 'next-auth/react'
import DelModalBooking from './deleteBookingModal'
import Link from 'next/link'

require('dayjs/locale/pt-br')
let relativeTime = require('dayjs/plugin/relativeTime')
const dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
dayjs.locale('pt-br')
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)


function Booking({book, HandleFetch}) {

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
    const tempo_restante = dayjs(data_inicio).to(data_fim)

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
                {book?.booking_end?.replaceAll('-', '/')}
                <br/>
                {/* <span className="badge badge-ghost badge-sm">Número do boleto: {book.bol_number}</span> */}
            </td>

            <td>
                <span className='text-info'>{tempo_restante?.replaceAll('em', '')}</span>
            </td>
            
            <td>
                {book?.username}
            </td>

            <th>
            {session?.user.id == book?.user_id || session?.user.is_superuser || session?.user.is_staff ? 
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

export default Booking