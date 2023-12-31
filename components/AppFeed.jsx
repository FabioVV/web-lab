"use client"

import { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import { useSession } from 'next-auth/react'
import Laboratory from './Laboratory'
import Booking from './Booking'
import Link from 'next/link'
import CreModal from './createLaboratoryModal'
import UserBooking from './UserBookings'
import Pagination from './Pagination_component'


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

    const [labBookedSearch, setlabBookedSearch] = useState('')
    const [userlabBookedSearch, setuserlabBookedSearch] = useState('')


    const [labSearch, setlabSearch] = useState('')
    const [userBookingsSearch, setuserBookingsSearch] = useState('')
    const [bookingsSearch, setbookingsSearch] = useState('')
    const [userSearch, setuserSearch] = useState('')

    
    const [labs, setLabs] = useState([])
    const [bookings, setbookings] = useState([])
    const [userBookings, setuserBookings] = useState([])
    const [activeTab, setActiveTab] = useState("tab1");
    const [submitting, setSubmitting] = useState(false)
    const {data:session} = useSession()




    /////////// SEARCH FUNCTIONS
    const fetchLabsSearch = async () => {
        setSubmitting(true)


        const response = await fetch(`http://127.0.0.1:8000/api/v3/search-labs/?q=${labSearch}&booked=${labBookedSearch}`, {
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

    const fetchbookingsSearch = async () => {
        setSubmitting(true)


        const response = await fetch(`http://127.0.0.1:8000/api/v3/reservas-search/?q=${bookingsSearch}&username=${userSearch}`, {
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
    
    const fetchuserBookingsSearch = async () => {
        setSubmitting(true)


        const response = await fetch(`http://127.0.0.1:8000/api/v3/user-reservas-search/?q=${userBookingsSearch}&booked=${userlabBookedSearch}`, {
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
    /////////// SEARCH FUNCTIONS



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
    
    const fetchAll = () => {
        fetchLabs()
        fetchBookings()
        fetchUserBookings()
    }

    useEffect(() =>{fetchAll()}, [session?.user.access])
    useEffect(()=>{fetchLabsSearch();},[labSearch, labBookedSearch])
    useEffect(()=>{fetchbookingsSearch();},[bookingsSearch, userSearch])
    useEffect(()=>{fetchuserBookingsSearch();},[userBookingsSearch, userlabBookedSearch])


    if(session?.user){
        
        return (
            <div>

                <motion.div initial={{ x: 600, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}  
                    id='tab_container' className="tabs">

                    <Link onClick={() => {setActiveTab('tab1'); fetchLabs();}}  href="#" className={activeTab === "tab1" ? " tab tab-bordered tab-active text-base" : "tab tab-bordered text-base"}>Laboratórios</Link> 
                    <Link onClick={() => {setActiveTab('tab2'); fetchBookings();}}  href="#" className={activeTab === "tab2" ? " tab tab-bordered tab-active text-base" : "tab tab-bordered text-base"}>Reservas</Link> 
                    {session?.user.user_type == 1 && !session?.user.is_superuser && !session?.user.is_staff ? "":<Link id='minhas-reservas' onClick={() => {setActiveTab('tab3'); fetchUserBookings();}}  href="#" className={activeTab === "tab3" ? " tab tab-bordered tab-active text-base" : "tab tab-bordered text-base"}>Suas reservas</Link>}
                </motion.div>


                <div id='tab-content'>
                    {activeTab === "tab1" ?
                    <section className='p-3'>
                        <h1 className='text-6xl font-bold pb-8 text-justify'>Laboratórios</h1>

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

                        <div style={{display: 'flex', flexDirection:'row', justifyContent:'left', gap:'15px', flexWrap:'wrap'}}>
                            <div className="form-control w-full max-w-xs mt-4">
                                <label className="label">
                                    <span className="label-text">Qual laboratório você deseja?</span>
                                    <span className="label-text-alt"></span>
                                </label>

                                <input onInput={(e)=>{setlabSearch(e.target.value);}} id='search_input_labs' type="search" placeholder="Digite aqui nome do laboratório..." className="input input-bordered w-full max-w-xs" />
                                
                                <label className="label">
                                    <span className="label-text-alt"></span>
                                    <span className="label-text-alt"></span>
                                </label>
                            </div>
                                                         
                            <div className="form-control w-full max-w-xs mt-4">
                                <label className="label">
                                    <span className="label-text">Laboratório reservado?</span>
                                    <span className="label-text-alt"></span>
                                </label>

                                <select onChange={(e) =>{setlabBookedSearch(e.target.value)}} className="select select-bordered w-full max-w-xs">
                                    <option value=''>Indiferente</option>
                                    <option value='N'>Não reservado</option>
                                    <option value='R'>Reservado</option>
                                </select>

                                <label className="label">
                                    <span className="label-text-alt"></span>
                                    <span className="label-text-alt"></span>
                                </label>
                            </div> 
                        </div>

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
                                {!labSearch ? 
                                    <Pagination page_size={labs?.page_size} 
                                    count={labs?.count} 
                                    total_pages={labs?.total_pages}
                                    current_page_number={labs?.current_page_number} 
                                    next={labs?.next} 
                                    previous={labs?.previous}
                                    fetch={fetchLabs}
                                    url={'http://127.0.0.1:8000/api/v3/laboratorios/'}/>
                                :
                                    <Pagination page_size={labs?.page_size} 
                                    count={labs?.count} 
                                    total_pages={labs?.total_pages}
                                    current_page_number={labs?.current_page_number} 
                                    next={labs?.next} 
                                    previous={labs?.previous}
                                    fetch={fetchLabsSearch}
                                    url={`http://127.0.0.1:8000/api/v3/user-reservas-search/?q=${userBookingsSearch}`}/>
                                }
                            </>
                        }


                    </section>

                    :
                    ""
                    }
                    {activeTab === "tab2" ?
                    <section className='p-3'>
                        <h1 className='text-6xl font-bold pb-8 text-justify'>Reservas ativas</h1>

                        

                        <div style={{display: 'flex', flexDirection:'row', justifyContent:'left', gap:'15px', flexWrap:'wrap'}}>
                            <div className="form-control w-full max-w-xs mt-4">
                                <label className="label">
                                    <span className="label-text">Qual reserva você deseja?</span>
                                    <span className="label-text-alt"></span>
                                </label>

                                <input onInput={(e)=>{setbookingsSearch(e.target.value);}} id='search_input_bookings' type="search" placeholder="Digite aqui nome do laboratório..." className="input input-bordered w-full max-w-xs" />

                                <label className="label">
                                    <span className="label-text-alt"></span>
                                    <span className="label-text-alt"></span>
                                </label>
                            </div>
                            
                            <div className="form-control w-full max-w-xs mt-4">
                                <label className="label">
                                    <span className="label-text">Quem você deseja?</span>
                                    <span className="label-text-alt"></span>
                                </label>

                                <input onInput={(e)=>{setuserSearch(e.target.value);}} id='search_input_users' type="search" placeholder="Digite aqui o username..." className="input input-bordered w-full max-w-xs" />

                                <label className="label">
                                    <span className="label-text-alt"></span>
                                    <span className="label-text-alt"></span>
                                </label>
                            </div>
                        </div>

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
                                            <th>Data do inicio reserva</th>
                                            <th>Data do fim da reserva</th>
                                            <th>Tempo restante</th>
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
                                            <th>Data do inicio reserva</th>
                                            <th>Data do fim da reserva</th>
                                            <th>Tempo restante</th>
                                            <th>Quem reservou</th>
                                            <th></th>
                                        </tr>
                                        </tfoot>
                                    </table>
                                </motion.div>
                                {!bookingsSearch ? 
                                    <Pagination page_size={bookings?.page_size} 
                                    count={bookings?.count} 
                                    total_pages={bookings?.total_pages}
                                    current_page_number={bookings?.current_page_number} 
                                    next={bookings?.next} 
                                    previous={bookings?.previous}
                                    fetch={fetchBookings}
                                    url={'http://127.0.0.1:8000/api/v3/reservas/'}/>
                                :
                                    <Pagination page_size={bookings?.page_size} 
                                    count={bookings?.count} 
                                    total_pages={bookings?.total_pages}
                                    current_page_number={bookings?.current_page_number} 
                                    next={bookings?.next} 
                                    previous={bookings?.previous}
                                    fetch={fetchbookingsSearch}
                                    url={`http://127.0.0.1:8000/api/v3/user-reservas-search/?q=${userBookingsSearch}`}/>
                                }
                            </>
                        }


                    </section>
                    :
                    ""
                    }

                    {activeTab === "tab3" ?
                    <section className='p-3'>
                        <h1 className='text-6xl font-bold pb-8 text-justify'>Suas reservas</h1>




                        <div style={{display: 'flex', flexDirection:'row', justifyContent:'left', gap:'15px', flexWrap:'wrap'}}>
                            <div className="form-control w-full max-w-xs mt-4">
                                <label className="label">
                                    <span className="label-text">Qual reserva sua você deseja?</span>
                                    <span className="label-text-alt"></span>
                                </label>

                                <input onInput={(e)=>{setuserBookingsSearch(e.target.value);}} id='search_input_your_bookings' type="search" placeholder="Digite aqui nome do laboratório..." className="input input-bordered w-full max-w-xs" />

                                <label className="label">
                                    <span className="label-text-alt"></span>
                                    <span className="label-text-alt"></span>
                                </label>
                            </div>
                                                         
                            <div className="form-control w-full max-w-xs mt-4">
                                <label className="label">
                                    <span className="label-text">Reserva em andamento?</span>
                                    <span className="label-text-alt"></span>
                                </label>

                                <select onChange={(e) =>{setuserlabBookedSearch(e.target.value)}} className="select select-bordered w-full max-w-xs">
                                    <option value=''>Indiferente</option>
                                    <option value='N'>Finalizada</option>
                                    <option value='R'>Em andamento</option>
                                </select>

                                <label className="label">
                                    <span className="label-text-alt"></span>
                                    <span className="label-text-alt"></span>
                                </label>
                            </div> 
                        </div>





                        

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
                                            {/* <th>ID do laboratório</th> */}
                                            <th>Laboratório</th>
                                            <th>Data de reserva</th>
                                            <th>Data do inicio reserva</th>
                                            <th>Data do fim da reserva</th>
                                            <th>Tempo restante</th>
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
                                            {/* <th>ID do laboratório</th> */}
                                            <th>Laboratório</th>
                                            <th>Data de reserva</th>
                                            <th>Data do inicio reserva</th>
                                            <th>Data do fim da reserva</th>
                                            <th>Tempo restante</th>
                                            <th></th>
                                        </tr>
                                        </tfoot>
                                    </table>
                                </motion.div>

                                
                                {!userBookingsSearch ? 
                                    <Pagination page_size={userBookings?.page_size} 
                                    count={userBookings?.count} 
                                    total_pages={userBookings?.total_pages}
                                    current_page_number={userBookings?.current_page_number} 
                                    next={userBookings?.next} 
                                    previous={userBookings?.previous}
                                    fetch={fetchUserBookings}
                                    url={'http://127.0.0.1:8000/api/v3/user-reservas/'}/>
                                :
                                    <Pagination page_size={userBookings?.page_size} 
                                    count={userBookings?.count} 
                                    total_pages={userBookings?.total_pages}
                                    current_page_number={userBookings?.current_page_number} 
                                    next={userBookings?.next} 
                                    previous={userBookings?.previous}
                                    fetch={fetchuserBookingsSearch}
                                    url={`http://127.0.0.1:8000/api/v3/user-reservas-search/?q=${userBookingsSearch}`}/>
                                }
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