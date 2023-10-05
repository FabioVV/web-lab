"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import Laboratory from './Lab'
import { useSession } from 'next-auth/react'

function LabsList({data, handleClick}){

    
}




function LabFeed() {

    const [labs, setLabs] = useState([])
    const {data:session} = useSession()

    useEffect(() =>{

        const fetchLabs = async () => {
            const response = await fetch('http://127.0.0.1:8000/api/v3/laboratorios/', {
            method:'GET',
            headers:{ Authorization:`Bearer ${session?.user.accessToken}`, 'Content-Type': 'application/json'
                },
            })

            if(response.ok){
                
                const data = await response.json()
                setLabs(data)

                window.flash(`Laboratório carregados.`, 'success')
            } else {
                window.flash(`Erro ao carregar Laboratórios`, 'error')
            }
        }
        fetchLabs()
    }, [])

    if(session?.user){
        return (
            <LabsList
                data = {labs}
                handleClick = {()=>{}}
            />
        )
    } else {
        return (
            <section>
                <h1>Bem vindo!</h1>
            </section>
        )
    }

}

export default LabFeed