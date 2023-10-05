"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import Laboratory from './Lab'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

function LabsList({data, handleClick}){ 
    return (
        <tbody>
            {data.results?.map((laboratory) => (
                <Laboratory 
                    key={laboratory.id}
                    lab={laboratory}
                    handleClick={handleClick}
                />
            ))}
        </tbody>
    )
    
    
}


function LabFeed() {

    const [labs, setLabs] = useState([])
    const {data:session} = useSession()
    const [activeTab, setActiveTab] = useState("tab1");

    useEffect(() =>{

        const fetchLabs = async () => {
            const response = await fetch('http://127.0.0.1:8000/api/v3/laboratorios/', {
            method:'GET',
            headers:{ Authorization:`Bearer ${session?.user.access}`, 'Content-Type': 'application/json'
                },
            })

            if(response.ok){
                const data = await response.json()
                setLabs(data)
            } 
        }
        fetchLabs()
    }, [session?.user.access])

    
    if(session?.user){
        return (
            <div>

                <div id='tab_container' className="tabs">
                    <Link onClick={() => {setActiveTab('tab1')}}  href="#tab-1" className={activeTab === "tab1" ? " tab tab-bordered tab-active" : "tab tab-bordered"}>Laboratórios</Link> 
                    <Link onClick={() => {setActiveTab('tab2')}}  href="#tab-2" className={activeTab === "tab2" ? " tab tab-bordered tab-active" : "tab tab-bordered"}>Reservas</Link> 
                    <Link onClick={() => {setActiveTab('tab3')}}  href="#tab-3" className={activeTab === "tab3" ? " tab tab-bordered tab-active" : "tab tab-bordered"}>Suas reservas</Link>
                </div>

                <div id='tab-content'>
                    {activeTab === "tab1" ?
                    <section>
                        <h1 className='text-6xl font-bold pb-8 text-justify'>Laboratórios</h1>

                        <div className="overflow-x-auto pb-10">
                            <table className="table">
        
                                {/* head */}
                                <thead>
                                <tr>
                                    <th>
                                        <label>
                                            Disponivel ?
                                        </label>
                                    </th>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                    {/* <th>?</th> */}
                                    <th></th>
                                </tr>
                                </thead>
        
                                    <LabsList
                                        data = {labs}
                                        handleClick = {()=>{}}
                                    />
        
                                <tfoot>
                                <tr>
                                    <th></th>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                    {/* <th>?</th> */}
                                    <th></th>
                                </tr>
                                </tfoot>
                            </table>
                        </div>
                    </section>
                    :
                    ""
                    }
                    {activeTab === "tab2" ?
                    <section>
                        <h1 className='text-6xl font-bold pb-8 text-justify'>Reservas</h1>

                        <div className="overflow-x-auto pb-10">
                            <table className="table">
        
                                {/* head */}
                                <thead>
                                <tr>
                                    <th>
                                        <label>
                                            Disponivel ?
                                        </label>
                                    </th>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                    {/* <th>?</th> */}
                                    <th></th>
                                </tr>
                                </thead>
        
                                    reservas aqui
        
                                <tfoot>
                                <tr>
                                    <th></th>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                    {/* <th>?</th> */}
                                    <th></th>
                                </tr>
                                </tfoot>
                            </table>
                        </div>
                    </section>
                    :
                    ""
                    }

                    {activeTab === "tab3" ?
                    <section>
                        <h1 className='text-6xl font-bold pb-8 text-justify'>Suas reservas</h1>

                        <div className="overflow-x-auto pb-10">
                            <table className="table">
        
                                {/* head */}
                                <thead>
                                <tr>
                                    <th>
                                        <label>
                                            Disponivel ?
                                        </label>
                                    </th>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                    {/* <th>?</th> */}
                                    <th></th>
                                </tr>
                                </thead>
        
                                    suas reservas aqui
        
                                <tfoot>
                                <tr>
                                    <th></th>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                    {/* <th>?</th> */}
                                    <th></th>
                                </tr>
                                </tfoot>
                            </table>
                        </div>
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