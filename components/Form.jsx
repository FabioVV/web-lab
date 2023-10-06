
import Link from "next/link"
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

function Form({lab, setLab, submitting, submit, type}) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();


  return (
<div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
  <div className="w-full p-6 rounded-md shadow-lg lg:max-w-xl">
      <div className=''>
        <h1 className='text-3xl font-bold text-center ' >Preencha os dados do laboratório.</h1>
        
        <form method='post' onSubmit={handleSubmit(submit)} id='form' className="w-full p-6">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                Nome do laboratório
              </label>
              <input  className="block w-full px-4 py-2 mt-2 border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" type="text" placeholder="Laboratório 201" name='name' id='name' value={lab.name}
                {...register("name", { required: "Campo obrigatório.", maxLength:{value:20, message:'Máximo de 15 caracteres'}, minLength:{value:5, message:'Necessita no minímo 5 caracteres '}, onChange: (e) => {setLab({...lab, name:e.target.value})}, })}
              />
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => 
                <div class="text-red-400 px-2 py-1 rounded relative mt-2" role="alert" id='email-message'>
                  <strong class="font-bold">* {message}</strong>
                </div>}
             />
            
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="last_name">
                Capacidade
              </label>
              <input className="block w-full px-4 py-2 mt-2 border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" id="capacity" type="number" placeholder="25" name='capacity' value={lab.capacity}
                {...register("capacity", { required: "Campo obrigatório.", maxLength:{value:100, message:'Máximo de 100 lugares'}, minLength:{value:1, message:'Necessita no minímo 1 lugar '}, onChange: (e) => {setLab({...lab, capacity:e.target.value})}, })}
              />
              <ErrorMessage
                errors={errors}
                name="capacity"
                render={({ message }) => 
                <div class="text-red-400 px-2 py-1 rounded relative mt-2" role="alert" id='email-message'>
                  <strong class="font-bold">* {message}</strong>
                </div>}
             />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label  htmlFor="username">
                Descrição do laboratório
              </label>

              <textarea className="block w-full px-4 py-2 mt-2 border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" name="about" id="about"  rows="3"  value={lab.about} 
              {...register("about", { required: "Campo obrigatório.", maxLength:{value:50, message:'Máximo de 30 caracteres'}, minLength:{value:5, message:'Necessita no minímo 5 caracteres '}, onChange: (e) => {setLab({...lab, about:e.target.value})}, })}
              />
              <ErrorMessage
              errors={errors}
              name="about"
              render={({ message }) => 
              <div class="text-red-400 px-2 py-1 rounded relative mt-2" role="alert" id='email-message'>
                <strong class="font-bold">* {message}</strong>
              </div>}
              />
            
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-2"> 

            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">

              <div className="w-full md:w-1/2 mt-5">
                <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type='submit' >
                  {submitting ? <span className="loading loading-spinner loading-lg"></span> : 'Finalizar'}

                </button>
              </div>

            </div>
          </div>

        </form>

      </div>
  </div>
  
</div>


  )

}

export default Form