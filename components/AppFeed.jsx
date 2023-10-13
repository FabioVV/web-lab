"use client"

import { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import { useSession } from 'next-auth/react'
import Auto_ from './AutocompleteLab'
import Laboratory from './Lab'
import Booking from './Reser'
import Link from 'next/link'
import CreModal from './createModal'
import UserBooking from './UserReser'
import Pagination from './pagination'

function LabsList({data, HandleFetch}){ 
    return (
        <tbody>
            {data?.results?.map((laboratory) => (
                <Laboratory 
                    key={laboratory.id}
                    lab={laboratory}
                    HandleFetch={HandleFetch}
                />
            ))}
        </tbody>
    ) 
}


function BookingList({data, HandleFetch}){ 
    return (
        <tbody>
            {data?.results?.map((booking) => (
                <Booking 
                    key={booking.id}
                    book={booking}
                    HandleFetch={HandleFetch}
                />
            ))}
        </tbody>
    ) 
}

function UserBookingList({data, HandleFetch}){ 
    return (
        <tbody>
            {data?.results?.map((booking) => (
                <UserBooking 
                    key={booking.id}
                    book={booking}
                    HandleFetch={HandleFetch}
                />
            ))}
        </tbody>
    ) 
}


function LabFeed() {

    const [labs, setLabs] = useState([])
    const [bookings, setbookings] = useState([])
    const [userBookings, setuserBookings] = useState([])
    const {data:session} = useSession()
    const [activeTab, setActiveTab] = useState("tab1");
    const [submitting, setSubmitting] = useState(false)

    const fetchLabs = async (url = 'http://127.0.0.1:8000/api/v3/laboratorios/') => {
        setSubmitting(true)

        const response = await fetch(url, {
        method:'GET',
        headers:{ Authorization:`Bearer ${session?.user.access}`, 'Content-Type': 'application/json'
            },
        })

        if(response.ok){
            const data = await response.json()
            setLabs(data)
        } 
        setSubmitting(false)

    }

    const fetchBookings = async (url = 'http://127.0.0.1:8000/api/v3/reservas/') => {
        setSubmitting(true)

        const response = await fetch(url, {
        method:'GET',
        headers:{ Authorization:`Bearer ${session?.user.access}`, 'Content-Type': 'application/json'
            },
        })

        if(response.ok){
            const data = await response.json()
            setbookings(data)
        } 
        setSubmitting(false)

    }

    const fetchUserBookings = async (url = 'http://127.0.0.1:8000/api/v3/user-reservas/') => {
        setSubmitting(true)

        const response = await fetch(url, {
        method:'GET',
        headers:{ Authorization:`Bearer ${session?.user.access}`, 'Content-Type': 'application/json'
            },
        })

        if(response.ok){
            const data = await response.json()
            setuserBookings(data)
        } 
        setSubmitting(false)

    }
    
    const fetchAll =  () => {
        fetchLabs()
        fetchBookings()
        fetchUserBookings()
    }

    useEffect(() =>{
        fetchAll()
    }, [session?.user.access])

    
    if(session?.user){
        
        return (
            <div>

                <div id='tab_container' className="tabs">
                    <Link onClick={() => {setActiveTab('tab1')}}  href="#" className={activeTab === "tab1" ? " tab tab-bordered tab-active" : "tab tab-bordered"}>Laboratórios</Link> 
                    <Link onClick={() => {setActiveTab('tab2')}}  href="#" className={activeTab === "tab2" ? " tab tab-bordered tab-active" : "tab tab-bordered"}>Reservas</Link> 
                    <Link id='minhas-reservas' onClick={() => {setActiveTab('tab3')}}  href="#" className={activeTab === "tab3" ? " tab tab-bordered tab-active" : "tab tab-bordered"}>Suas reservas</Link>
                </div>

                <div id='tab-content'>
                    {activeTab === "tab1" ?

                    <section className='p-3'>
                        <h1 className='text-6xl font-bold pb-8 text-justify'>Laboratórios</h1>
                        <Auto_/>

                        {session?.user.user_type === 2 || session?.user.is_superuser? 
                        <div>
                            {/* <Link href='laboratories/register' className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-6 py-2.5 mr-2 mb-4 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                Registrar laboratório
                            </Link> */}
                            <button onClick={()=>{document.getElementById('my_modal_3').showModal()}} className="btn btn-sm btn-outline btn-success">
                                Registrar laboratório
                            </button>
                            <CreModal HandleFetch={fetchAll}/>
                        </div>
                        :
                        ""
                        }

                        {submitting ?  
                            <div className='flex justify-center'><span className="loading loading-spinner loading-lg w-20 m-10"></span></div>
                        :
                            <>
                                <motion.div initial={{ opacity:0 }}
                                            animate={{  opacity:1 }} 
                                            transition={{ duration: 0.3 }}

                                            className="overflow-x-auto pb-10 mt-5">
                                                
                                    <table className="table mb-8 bg-base-200">
                
                                        {/* head */}
                                        <thead>
                                        <tr>
                                            <th>
                                                <label>
                                                    Disponivel?
                                                </label>
                                            </th>
                                            <th>ID do laboratório</th>
                                            <th>Nome</th>
                                            <th>Descrição</th>
                                            {/* <th>?</th> */}
                                            <th></th>
                                        </tr>
                                        </thead>
                                        
                                            <LabsList
                                                data = {labs}
                                                HandleFetch={fetchAll}
                                                />
                                            
                                        <tfoot>
                                        <tr>
                                            <th></th>
                                            <th>ID do laboratório</th>
                                            <th>Nome</th>
                                            <th>Descrição</th>
                                            {/* <th>?</th> */}
                                            <th></th>
                                        </tr>
                                        </tfoot>
                                    </table>
                                </motion.div>
                                <Pagination page_size={labs?.page_size} 
                                count={labs?.count} 
                                total_pages={labs?.total_pages}
                                current_page_number={labs?.current_page_number} 
                                next={labs?.next} 
                                previous={labs?.previous}
                                fetch={fetchLabs}
                                url={'http://127.0.0.1:8000/api/v3/laboratorios/'}/>
                            </>
                        }


                    </section>
                    :
                    ""
                    }
                    {activeTab === "tab2" ?
                    <section className='p-3'>
                        <h1 className='text-6xl font-bold pb-8 text-justify'>Reservas ativas</h1>

                        {submitting ? 
                            <div className='flex justify-center'><span className="loading loading-spinner loading-lg w-20 m-10"></span></div>
                        :
                            <>
                                <motion.div initial={{ opacity:0 }}
                                            animate={{  opacity:1 }} 
                                            transition={{ duration: 0.3 }}
                                            className="overflow-x-auto pb-10 mt-5">

                                    <table className="table mb-8 bg-base-200">
                
                                        {/* head */}
                                        <thead>
                                        <tr>

                                            <th title='Número da reserva'>
                                                <label title='Número da reserva'>
                                                    Nº
                                                </label>
                                            </th>
                                            <th>Laboratório</th>
                                            <th>Data de reserva</th>
                                            <th>Quem reservou</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                
                                            <BookingList
                                                data = {bookings}
                                                HandleFetch={fetchAll}
                                            />
                
                                        <tfoot>
                                        <tr>
                                            <th></th>
                                            <th>Laboratório</th>
                                            <th>Data de reserva</th>
                                            <th>Quem reservou</th>
                                            <th></th>
                                        </tr>
                                        </tfoot>
                                    </table>
                                </motion.div>
                                <Pagination page_size={bookings?.page_size} 
                                count={bookings?.count} 
                                total_pages={bookings?.total_pages}
                                current_page_number={bookings?.current_page_number} 
                                next={bookings?.next} 
                                previous={bookings?.previous}
                                fetch={fetchBookings}
                                url={'http://127.0.0.1:8000/api/v3/reservas/'}/>
                            </>
                        }


                    </section>
                    :
                    ""
                    }

                    {activeTab === "tab3" ?
                    <section className='p-3'>
                        <h1 className='text-6xl font-bold pb-8 text-justify'>Suas reservas</h1>

                        {submitting ? 
                            <div className='flex justify-center'><span className="loading loading-spinner loading-lg w-20 m-10"></span></div>
                        :
                            <>
                                <motion.div initial={{ opacity:0 }}
                                            animate={{  opacity:1 }} 
                                            transition={{ duration: 0.3 }}
                                            className="overflow-x-auto pb-10 mt-5">

                                    <table className="table mb-8 bg-base-200">
                
                                        {/* head */}
                                        <thead>
                                        <tr>
                                            <th>
                                                <label>
                                                    Nº
                                                </label>
                                            </th>
                                            <th>
                                                <label>
                                                    Ainda reservado?
                                                </label>
                                            </th>
                                            <th>ID do laboratório</th>
                                            <th>Laboratório</th>
                                            <th>Data da reserva</th>
                                            {/* <th>?</th> */}
                                            <th></th>
                                        </tr>
                                        </thead>
                
                                            <UserBookingList
                                                    data = {userBookings}
                                                    HandleFetch={fetchAll}
                                            />
                
                                        <tfoot>
                                        <tr>
                                            <th></th>
                                            <th>
                                                <label>
                                                    Ainda reservado?
                                                </label>
                                            </th>
                                            <th>ID do laboratório</th>
                                            <th>Laboratório</th>
                                            <th>Data da reserva</th>
                                            {/* <th>?</th> */}
                                            <th></th>
                                        </tr>
                                        </tfoot>
                                    </table>
                                </motion.div>
                                <Pagination page_size={userBookings?.page_size} 
                                count={userBookings?.count} 
                                total_pages={userBookings?.total_pages}
                                current_page_number={userBookings?.current_page_number} 
                                next={userBookings?.next} 
                                previous={userBookings?.previous}
                                fetch={fetchUserBookings}
                                url={'http://127.0.0.1:8000/api/v3/user-reservas/'}/>
                            </>
                        }


                    </section>
                    :
                    ""
                    }
                </div>

            </div>
        )
    } else {
        return (
            <div className="hero max-h-screen">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Olá!</h1>
                        <p className="py-6">Crie, edite e gerencie seus laboratórios.</p>
                        <Link href="users/register" className="btn btn-primary">Comece agora</Link>
                    </div>
                </div>
            </div>
        )
    }

}

export default LabFeed