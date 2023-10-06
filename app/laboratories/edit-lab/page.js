"use client"

import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from '@components/Form'


function RegisterLab() {
    const router = useRouter()
    const { data:session } = useSession()
    const [submitting, setSubmitting] = useState(false)
    const search = useSearchParams()
    const LabId = search.get('id')

    const [lab, setLab] = useState({
        name: '',
        about: '',
        capacity: '',
    })


    useEffect(()=>{
      const getLab = async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/v3/laboratorios/${LabId}/`, {
          method:'GET',

          headers:{ Authorization:`Bearer ${session?.user.access}`, 'Content-Type': 'application/json'
        },
        })
        const data = await response.json()
        setLab({
          name: data.name,
          about: data.about,
          capacity: data.capacity,
        })
      }

      if(LabId)getLab()
    },[LabId, session?.user.access])


    const EditLab = async(form, e) => {
      e.preventDefault();
      setSubmitting(true)

      try{
        const response = await fetch(`http://127.0.0.1:8000/api/v3/laboratorios/${LabId}/`, {
          method:'PATCH',

          headers:{ Authorization:`Bearer ${session?.user.access}`, 'Content-Type': 'application/json'
        },

          body:JSON.stringify({
            name:lab.name, 
            about:lab.about, 
            capacity:lab.capacity,
          })
        })

        if(response.ok){

          router.push('/')
          window.flash(`Laboratório atualizado.`, 'success')

        } else {
          window.flash(`Erro ao atualizar laboratório`, 'error')
        }

      } catch(err){

        console.log(err)

      } finally {

        setSubmitting(false)

      }

    }



  return (
    <Form
        type="Registrar"
        lab={lab}
        setLab={setLab}
        submitting={submitting}
        submit={EditLab}
        // handleClick
        // handleEdit
        // andleRemove
    />
  )

}

export default RegisterLab