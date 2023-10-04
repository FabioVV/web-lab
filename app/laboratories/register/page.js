"use client"

import React from 'react'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from '@components/Form'


function registerUser() {
    const router = useRouter()
    const { data:session } = useSession()
    const [submitting, setSubmitting] = useState(false)

    const [lab, setLab] = useState({
        name: '',
        about: '',
    })

    const createLab = async(form, e) => {
      e.preventDefault();
      setSubmitting(true)

      try{
        const response = await fetch('http://127.0.0.1:8000/api/v3/laboratorios/', {
          method:'POST',

          headers:{ Authorization:`Bearer ${session?.user.accessToken}`, 'Content-Type': 'application/json'
        },

          body:JSON.stringify({
            name:lab.name, 
            about:lab.about, 
          })
        })

        if(response.ok){

          router.push('/')
          window.flash(`Laboratório registrado com sucesso.`, 'success')

        }

      } catch(err){

        window.flash(`Erro. Favor, tentar novamente.`, 'error')
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
        submit={createLab}
    />
  )

}

export default registerUser