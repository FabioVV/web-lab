

import React from 'react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useEffect } from 'react'
import { ErrorMessage } from '@hookform/error-message';
import { useForm } from 'react-hook-form';
import { motion } from "framer-motion"

function NumeroDoBoletoAleatorio8Digitos() {
    const randomNumber = Math.floor(Math.random() * 100000000);
    const randomString = randomNumber.toString();

    // Se o número for menor que 10000000, preencha com zeros a frente
    if (randomString.length < 8) {
      return '0'.repeat(8 - randomString.length) + randomString;
    }
  
    return randomString;
}

function BookingModal({lab_id, HandleFetch}) {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const {data:session} = useSession()
    const [submitting, setSubmitting] = useState(false)
    const [paid, setPaid] = useState(false)
    const [lab, setLab] = useState({
        name: '',
        about: '',
        capacity: '',
        bol_number:'',
        price:'',
        booking_end:'',
    })


    const numero_boleto = NumeroDoBoletoAleatorio8Digitos()

    useEffect(()=>{
        let defaultValues = {};

        const getLab = async () => {
          const response = await fetch(`http://127.0.0.1:8000/api/v3/laboratorios/${lab_id}/`, {
            method:'GET',
  
            headers:{ Authorization:`Bearer ${session?.user.access}`, 'Content-Type': 'application/json'
          },
          })
          const data = await response.json()

          setLab({
            name: data.name,
            about: data.about,
            capacity: data.capacity,
            price:data.price,
            bol_number: numero_boleto
          })

          // FORMATAR CAMPOS TELEFONE, CNPJ CPF E PRECO
          defaultValues.name = data.name;
          defaultValues.about = data.about;
          defaultValues.capacity = data.capacity;
          defaultValues.price = data.price;
          defaultValues.bol_number = numero_boleto;

          reset({ ...defaultValues });

        }
  
        if(lab_id)getLab()
      },[lab_id])


      const BookLab = async(form, e) => {
        e.preventDefault();
        setSubmitting(true)
        setPaid(false)

        try{
          const response = await fetch(`http://127.0.0.1:8000/api/v3/reservas/`, {
            method:'POST',
  
            headers:{ Authorization:`Bearer ${session?.user.access}`, 'Content-Type': 'application/json'
          },
  
            body:JSON.stringify({
                laboratory: lab_id,
                bol_number:lab.bol_number,
                booking_end:lab.booking_end
            })
          })
  
          const error = await response.json()

          if(response.ok){
  
            setPaid(true)
            
          } else if(error['error_payment']){

            window.flash(`O pagamento falhou. Por favor, tente novamente ou entre em contato com o nosso time.`, 'error')

          } else if(error['error_booking']){

            window.flash(`Apenas professores, funcionários e administradores podem fazer reservas.`, 'error')

          }
  
        } catch(err){
  
          console.log(err)
  
        } finally {
  
          setSubmitting(false)
  
        }
      }



  return (

    <div>
    {paid ? 
        <dialog id={`my_modal_booking_${lab_id}`}  className="modal" data-theme='dark'>
            <motion.div       
            initial={{ x: 600, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }} 
            className="modal-box">
                <div className="">
                    <div className="p-6 md:mx-auto">
                        <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                            <path fill="currentColor"
                                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                            </path>
                        </svg>
                        <div className="text-center">
                            <h3 className="md:text-2xl text-base font-semibold text-center">Pagamento confirmado!</h3>
                            <p className="my-2 mt-7">Obrigado! Seu laboratório foi reservado.</p>
                            <p> Tenha um ótimo dia!  </p>
                            <div className="py-10 text-center">

                                <button onClick={() =>{document.getElementById('closer').click();HandleFetch();}} id={`sub_reserva_${lab_id}`} className="btn text-green-600" type='button' >
                                    {submitting ? <span className="loading loading-spinner loading-lg"></span> : 'Concluir'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </dialog>
    :
        <dialog id={`my_modal_booking_${lab_id}`}  className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Reservar {lab?.name}</h3>
                <hr />

                <div className="relative flex flex-col items-center justify-center overflow-hidden">
                    <div className="w-full p-5">
                        <div className=''>

                            <form method='post' onSubmit={handleSubmit(BookLab)} id='form' className="w-full p-6">
                                <fieldset className='border-l-2 border-zinc-300 p-5'>
                                    <legend className="font-bold text-lg text-green-600">Dados da reserva</legend>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="booking_end">
                                                Sua reserva irá até qual dia e horário? 
                                            </label>
                                            <input className="input input input-bordered w-full max-w" type="datetime-local" placeholder="Laboratório 201" name='booking_end' id='booking_end' 
                                                {...register("booking_end", { validate: (value, formValues) => value > Date.now() || 'Você não pode escolher uma data do passado.' ,valueAsDate:true,  required: "Campo obrigatório.", onChange: (e) => {setLab({...lab, booking_end:e.target.value})}, })}
                                            />
                                            <ErrorMessage
                                                errors={errors}
                                                name="booking_end"
                                                render={({ message }) => 
                                                <div className="text-red-400 px-2 py-1 rounded relative mt-2" role="alert" id='email-message'>
                                                <strong className="font-bold">* {message}</strong>
                                                </div>}
                                            />
                                            
                                        </div>
            
                                    </div>



                                </fieldset>
                                
                                
                                <fieldset className='border-l-2 border-zinc-300 p-5'>
                                    <legend className="font-bold text-lg text-green-600">Dados do laboratório</legend>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="name">
                                            Nome
                                        </label>
                                        <input disabled className="input input input-bordered w-full max-w" type="text" placeholder="Laboratório 201" name='name' id='name' 
                                            {...register("name", { required: "Campo obrigatório.", maxLength:{value:20, message:'Máximo de 15 caracteres'}, minLength:{value:5, message:'Necessita no minímo 5 caracteres '}, onChange: (e) => {setLab({...lab, name:e.target.value})}, })}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="name"
                                            render={({ message }) => 
                                            <div className="text-red-400 px-2 py-1 rounded relative mt-2" role="alert" id='email-message'>
                                            <strong className="font-bold">* {message}</strong>
                                            </div>}
                                        />
                                        
                                        </div>
                                        <div className="w-full md:w-1/2 px-3">
                                        <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="last_name">
                                            Capacidade
                                        </label>
                                        <input disabled className="input input input-bordered w-full max-w" id="capacity" type="number" placeholder="25" name='capacity' 
                                        {...register("capacity", { required: "Campo obrigatório.", valueAsNumber: true, max:{value:100, message:'Máximo de 100 lugares'}, min:{value:1, message:'Necessita no minímo 1 lugar '}, onChange: (e) => {setLab({...lab, capacity:e.target.value})}, })}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="capacity"
                                            render={({ message }) => 
                                            <div className="text-red-400 px-2 py-1 rounded relative mt-2" role="alert" id='email-message'>
                                            <strong className="font-bold">* {message}</strong>
                                            </div>}
                                        />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                        <label  htmlFor="username">
                                            Descrição do laboratório
                                        </label>

                                        <textarea disabled className="textarea textarea-bordered textarea-xs w-full max-w" name="about" id="about"  rows="3" 
                                        {...register("about", { required: "Campo obrigatório.", maxLength:{value:50, message:'Máximo de 30 caracteres'}, minLength:{value:5, message:'Necessita no minímo 5 caracteres '}, onChange: (e) => {setLab({...lab, about:e.target.value})}, })}
                                        />
                                        <ErrorMessage
                                        errors={errors}
                                        name="about"
                                        render={({ message }) => 
                                        <div className="text-red-400 px-2 py-1 rounded relative mt-2" role="alert" id='email-message'>
                                            <strong className="font-bold">* {message}</strong>
                                        </div>}
                                        />
                                        
                                        </div>
                                    </div>

                                    <div className="hidden flex flex-wrap -mx-3 mb-2"> 

                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">

                                        <div className="w-full md:w-1/2 mt-5">
                                            <button id={`sub_${lab_id}`} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type='submit' >
                                            {submitting ? <span className="loading loading-spinner loading-lg"></span> : 'Salvar'}

                                            </button>
                                        </div>

                                        </div>
                                    </div> 

                                </fieldset>

                                <fieldset className='border-l-2 border-zinc-300 p-5'>
                                <legend className="font-bold text-lg text-green-600">Dados de pagamento</legend>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="name">
                                            Boleto
                                        </label>
                                        <input disabled className="input input input-bordered w-full max-w" type="text" placeholder="xxxxxxxx" name='bol_number' id='bol_number' 
                                            {...register("bol_number", { required: "Campo obrigatório.", minLength:{value:5, message:'Necessita no minímo 8 caracteres '}, onChange: (e) => {setLab({...lab, bol_number:e.target.value})}, })}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="bol_number"
                                            render={({ message }) => 
                                            <div className="text-red-400 px-2 py-1 rounded relative mt-2" role="alert" id='email-message'>
                                            <strong className="font-bold">* {message}</strong>
                                            </div>}
                                        />
                                        
                                        </div>
                                        <div className="w-full md:w-1/2 px-3">
                                        <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="last_name">
                                            Preço (R$)
                                        </label>
                                        <input disabled className="input input input-bordered w-full max-w" id="price" type="number" placeholder="250.00" name='price' 
                                            {...register("price", { required: "Campo obrigatório.", maxLength:{value:100, message:'Máximo de 100 lugares'}, minLength:{value:1, message:'Necessita no minímo 1 lugar '}, onChange: (e) => {setLab({...lab, price:e.target.value})}, })}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="price"
                                            render={({ message }) => 
                                            <div className="text-red-400 px-2 py-1 rounded relative mt-2" role="alert" id='email-message'>
                                            <strong className="font-bold">* {message}</strong>
                                            </div>}
                                        />
                                        </div>
                                    </div>
                                </fieldset>



                                <div className="hidden flex flex-wrap -mx-3 mb-2"> 

                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">

                                        <div className="w-full md:w-1/2 mt-5">
                                            <button id={`sub_reserva_${lab_id}`} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type='submit' >
                                                {submitting ? <span className="loading loading-spinner loading-lg"></span> : 'Salvar'}
                                            </button>
                                        </div>

                                        </div>
                                </div> 
                            </form>

                        </div>
                    </div>
                    
                </div>
                    
                <div className="modal-action">
                    
                    <button disabled={submitting} onClick={()=>{document.getElementById(`sub_reserva_${lab_id}`).click()}} type="button" className="btn text-green-600">
                        {submitting ? <span className="loading loading-spinner loading-lg"></span> : 'Realizar pagamento'}
                    </button>
                    
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button id='closer' className="btn">Fechar</button>
                    </form>
                </div>
            </div>
        </dialog>
    }

    </div>

  )

}

export default BookingModal
