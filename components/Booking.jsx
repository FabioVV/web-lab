import { useSession } from 'next-auth/react'
import DelModalBooking from './deleteBookingModal'
import Link from 'next/link'
import { useEffect } from 'react'

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
    let mensagem = ''

    // CRIANDO DATA DO FIM DA RESERVA
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
    let reserva_iniciou = ''


    if(book?.booking_start){
        mensagem = `Reserva inicia dia ${book?.booking_start.replaceAll('-', '/')}`

        // DATA DO INICIO DA RESERVA
        let dateStart = book?.booking_start.substring(0, 10) //27-10-2023 DATE
        let timeStart = book?.booking_start.substring(11, 19) //11:21:22 TIME
        let yearStart = dateStart.substring(6, 10) //2023
        let monthStart = dateStart.substring(3, 5) //10
        let dayStart = dateStart.substring(0, 2) //27
        let hoursStart = timeStart.substring(0, 2) //11
        let minutesStart = timeStart.substring(3, 5) //21
        let secondsStart = timeStart.substring(6, 8) //22   
    
        let start_date_to_js = new Date (`${dayStart}/${monthStart}/${yearStart} ` + `${hoursStart}:${minutesStart}:${secondsStart}`)
        reserva_iniciou = new Date() > start_date_to_js
    }


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
                        <div style={{cursor:'help'}}  className="text-sm opacity-50">
                            {book.updated_at && book.updated_at != book.booked_at 
                            ? 
                                <>
                                    Reserva foi atualizada em:
                                    <div title={`'O laboratório foi trocado para ${book.laboratory_name}`} style={{display:'flex', flexDirection:'row', gap:'5px'}}>
                                        <svg style={{cursor:'pointer'}}  xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        {book.updated_at.replaceAll('-', '/')}
                                    </div>
                                </>
                            : 
                            'Reserva não foi atualizada.'
                            }
                        </div>                
                    </div>
            </div>
            </td>

            <td>
                {book?.booked_at?.replaceAll('-', '/')}
                <br/> 
                {/* <span className="badge badge-ghost badge-sm">Número do boleto: {book.bol_number}</span> */}
            </td>

            <td>
                {book?.booking_start ? book?.booking_start?.replaceAll('-', '/') : book?.booked_at?.replaceAll('-', '/')}
                <br/>
                {/* <span className="badge badge-ghost badge-sm">Número do boleto: {book.bol_number}</span> */}
            </td>

            <td>
                {book?.booking_end?.replaceAll('-', '/')}
                <br/>
                {/* <span className="badge badge-ghost badge-sm">Número do boleto: {book.bol_number}</span> */}
            </td>

            <td>
                <span className='text-info'>
                    {book?.booking_start ? 
                    <>
                        {reserva_iniciou ? <span className='text-info'>{tempo_restante?.replaceAll('em', '')}</span> :  <span className='text-info'>{mensagem}</span>}
                    </>
                    : 
                    <>
                        <span className='text-info'>{tempo_restante?.replaceAll('em', '')}</span>
                    </>
                    }
                    <br/>
                </span>
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