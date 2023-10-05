"use client"

import React from 'react'
import Link from 'next/link';
import { useRef } from 'react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useRouter } from 'next/navigation';

const RegisterUser = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const router = useRouter()


  //CASO EU PRECISE DE SELECT MULTIPLE E CHECKBOXES
  // var object = {};
  // formData.forEach((value, key) => {
  //   // Reflect.has in favor of: object.hasOwnProperty(key)
  //   if(!Reflect.has(object, key)){
  //       object[key] = value;
  //       return;
  //   }
  //   if(!Array.isArray(object[key])){
  //       object[key] = [object[key]];    
  //   }
  //   object[key].push(value);
  // });
  // var json = JSON.stringify(object);}


  async function onSubmit(form ,event){
      event.preventDefault()
      setIsLoading(true)
      setError(null)


      const formData = new FormData(document.getElementById('form'))

      const res = await fetch("http://127.0.0.1:8000/api/v3/usuarios/", {
        method:"POST",

        headers: {
            "Content-Type":"application/json",
        }, 

        body: JSON.stringify(Object.fromEntries(formData)),
      });
  
      const user_created = await res.json()
      if(res.status == 201){

        //window.location.replace('/auth/signin')
        router.push('auth/signin')
        window.flash(`Conta criada! Você já pode fazer login.`, 'success')

      } else {
        
        window.flash(`Erro. Favor, tentar novamente.`, 'error')
        setIsLoading(false)

      }

  }

     
    
    //PASSAR UM ARRAY COM OS CAMPOS DO FORMULARIO E A URL DE ONDE FAZER O POST
    



    // BOTÃO ESTILOS
  {/* <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Default</button>
  <button type="button" className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Alternative</button>
  <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Dark</button>
  <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Light</button>
  <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Green</button>
  <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Red</button>
  <button type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">Yellow</button>
  <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Purple</button> */}
  
  
  // OLD ERROR bg-red-100 border border-red-400 text-red-700 px-2 py-1 rounded relative mt-2


  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 rounded-md shadow-lg lg:max-w-xl">
            <div className=''>
              <h1 className='text-3xl font-bold text-center ' >Estamos quase lá! Preencha seus dados.</h1>
              
              <form method='post' onSubmit={handleSubmit(onSubmit)} id='form' className="w-full p-6">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="first_name">
                      Primeiro nome
                    </label>
                    <input  className="block w-full px-4 py-2 mt-2 border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" type="text" placeholder="Jane" name='first_name' id='first_name'
                      {...register("first_name", { required: "Campo obrigatório." })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="first_name"
                      render={({ message }) => 
                      <div class="text-red-300 px-2 py-1 rounded relative mt-2" role="alert" id='email-message'>
                        <strong class="font-bold">* {message}</strong>
                      </div>}
                    />
                  
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="last_name">
                      Sobrenome
                    </label>
                    <input className="block w-full px-4 py-2 mt-2 border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" id="last_name" type="text" placeholder="Doe" name='last_name'/>
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="username">
                      Nome de usuário
                    </label>
                    <input  className="block w-full px-4 py-2 mt-2 border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" 
                    id="username" type="text" placeholder="Jane123" name='username' 

                    />
                  
                  </div>
                </div>
                
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                      Senha
                    </label>
                    <input  className="block w-full px-4 py-2 mt-2 border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" id="password" type="password" placeholder="************" name='password'/>
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password_confirmation">
                      Confirme sua senha
                    </label>
                    <input  className="block w-full px-4 py-2 mt-2 border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" id="password_confirmation" type="password" placeholder="************" name='password_confirmation'/>
                    <p id='password_errors' className="text-lightcoral text-xs italic"></p>
                    <p className="text-gray-600 text-xs italic">Suas senhas precisam coincidir.</p>
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                      Email
                    </label>
                    <input  className="block w-full px-4 py-2 mt-2 border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" id="email" type="email" placeholder="jane@email.com" name='email'
                     {...register("email", { required: "Campo obrigatório." , pattern: { value: /.+@.+/, message: 'Email inválido' },})}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="email"
                      render={({ message }) => 
                      <div class="bg-red-100 border border-red-400 text-red-700 px-2 py-1 rounded relative mt-2" role="alert" id='email-message'>
                        <strong class="font-bold">{message}</strong>
                      </div>}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="cpf_cnpj">
                      CPF/CNPJ
                    </label>
                    <input  className="block w-full px-4 py-2 mt-2 border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" id="cpf_cnpj" type="text" placeholder="041-412-123-41" name='cpf_cnpj'/>
                    <p className="text-gray-600 text-xs italic">Digite apenas números</p>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="sex">
                      Sexo
                    </label>
                    <div className="relative">
                      <select  className="block w-full px-4 py-2 mt-2 border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" id="sex" name='sex'>
                        <option value='M'>Masculino</option>
                        <option value='F'>Feminino</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="phone">
                      Telefone
                    </label>
                    <input className="block w-full px-4 py-2 mt-2 border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" id="phone" type='tel' placeholder="11975461285" name='phone'/>
                  </div>

                </div>

                <div style={{marginTop:30}} className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="birth_date">
                      Data de nascimento
                    </label>
                    <input  className="block w-full px-4 py-2 mt-2 border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" id="birth_date" type="date"  name='birth_date'/>
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="user_type">
                      Inscreva-se como
                    </label>
                    <div className="relative">
                      <select  className="block w-full px-4 py-2 mt-2 border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" id="user_type" name='user_type'>
                        <option value='1'>Aluno</option>
                        <option value='2'>Professor</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="flex flex-wrap -mx-3 mb-2"> 

                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">

                    <div className="w-full md:w-1/2 mt-5">
                      <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type='submit' >
                        {isLoading ? <Image src="/images/loading.gif" className="" width={30} height={30} alt="loading gif"/>: 'Finalizar'}{isLoading ? " Aguarde....": ''}

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

export default RegisterUser