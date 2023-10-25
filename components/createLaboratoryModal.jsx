
import React from 'react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { ErrorMessage } from '@hookform/error-message';
import { useForm } from 'react-hook-form';

function CreModal({HandleFetch}) {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const {data:session} = useSession()
    const [submitting, setSubmitting] = useState(false)
    const [lab, setLab] = useState({
        name: '',
        about: '',
        capacity: '',
    })


      const CreateLab = async(form, e) => {
        e.preventDefault();
        setSubmitting(true)
  
        try{
          const response = await fetch(`http://127.0.0.1:8000/api/v3/laboratorios/`, {
            method:'POST',
  
            headers:{ Authorization:`Bearer ${session?.user.access}`, 'Content-Type': 'application/json'
          },
  
            body:JSON.stringify({
              name:lab.name, 
              about:lab.about, 
              capacity:lab.capacity,
            })
          })

          const lab_return = await response.json()
  
          if(response.ok){
  
            document.getElementById('closer').click()
            HandleFetch()
            window.scrollTo({ top: 0, behavior: 'smooth' });
            window.flash(`Laboratório registrado.`, 'success')

          } else if (lab_return['lab_name_about']){
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setError('name', {
              type: 'name_lab_equals_about',
              message:'O nome do laboratório não pode ser igual a sua descrição.'
            })

            setSubmitting(false)

          } else {

            window.scrollTo({ top: 0, behavior: 'smooth' });
            window.flash(`Erro ao registrar laboratório`, 'error')
          }
  
        } catch(err){
  
          console.log(err)
  
        } finally {
  
          setSubmitting(false)
  
        }
      }



  return (
    <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Registrar laboratório</h3>
            <hr />

            <div className="relative flex flex-col items-center justify-center overflow-hidden">
                <div className="w-full p-5">
                    <div className=''>
                        
                        <form method='post' onSubmit={handleSubmit(CreateLab)} id='form' className="w-full p-6">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="name">
                                Nome
                            </label>
                            <input  className="input input-bordered w-full max-w" type="text" placeholder="Laboratório 201" name='name' id='name' 
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
                            <input className="input input-bordered w-full max-w" id="capacity" type="number" placeholder="25" name='capacity' 
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
                            <label  htmlFor="about">
                                Descrição do laboratório
                            </label>

                            <textarea className="textarea textarea-bordered textarea-xs w-full max-w" name="about" id="about"  rows="3" 
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
                                <button disabled={submitting} id='sub' className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type='submit' >
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
                
                <button onClick={()=>{document.getElementById('sub').click()}} type="button" className="btn text-green-600">
                    {submitting ? <span className="loading loading-spinner loading-lg"></span> : 'Salvar'}
                </button>
                
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button id='closer' className="btn">Fechar</button>
                </form>
            </div>
        </div>
    </dialog>
  )
}

export default CreModal