"use client"

import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { signIn } from 'next-auth/react';


const RegisterUser = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [user, setUser] = useState({
    first_name: '',
    username: '',
    phone: '',
    email: '',
    cpf_cnpj: "",
    user_type: '',
    birth_date: '',
    sex: '',
    last_name: '',
    password_confirmation: '',
    password: '',
  })


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
  // const formData = new FormData(document.getElementById('form'))
  //        body: JSON.stringify(Object.fromEntries(formData)),


  async function onSubmit(form ,event){
      event.preventDefault()
      setIsLoading(true)


      const formData = new FormData(document.getElementById('form'))

      const res = await fetch("http://127.0.0.1:8000/api/v3/usuarios/", {
        method:"POST",

        headers: {
            "Content-Type":"application/json",
        }, 

        body: JSON.stringify({
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
          phone: user.phone,
          email: user.email,
          cpf_cnpj: user.cpf_cnpj,
          user_type: user.user_type ? user.user_type : '1',
          birth_date: user.birth_date,
          sex: user.sex ? user.sex: 'M',
          password: user.password,
          password_confirmation: user.password_confirmation

        }),
      });
  
      const user_created = await res.json()
      if(res.status == 201){

        //window.location.replace('/auth/signin')
        //router.push('auth/signin')
        signIn()
        window.flash(`Conta criada! Você já pode fazer login.`, 'success')

      } else {
        
        window.flash(`Erro. Favor, tentar novamente.`, 'error')
        setIsLoading(false)

      }

  }



  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 rounded-md shadow-lg lg:max-w-xl">
            <div className=''>
              <h1 className='text-3xl font-bold text-center ' >Estamos quase lá! Preencha seus dados.</h1>
              
              <form method='post' onSubmit={handleSubmit(onSubmit)} id='form' className="w-full p-6">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="first_name">
                      Primeiro nome *
                    </label>
                    <input  className="input input-bordered w-full max-w" type="text" placeholder="Jane" name='first_name' id='first_name'
                      {...register("first_name", { required: "Campo obrigatório.", maxLength:{value:25, message:'Máximo de 25 caracteres'}, minLength:{value:5, message:'Necessita no minímo 5 caracteres '}, onChange: (e) => {setUser({...user, first_name:e.target.value})}, })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="first_name"
                      render={({ message }) => 
                      <div className="text-red-400 px-2 py-1 rounded relative mt-2" role="alert" id='email-message'>
                        <strong className="font-bold">* {message}</strong>
                      </div>}
                    />
                  
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="last_name">
                      Sobrenome *
                    </label>
                    <input className="input input-bordered w-full max-w" id="last_name" type="text" placeholder="Doe" name='last_name'
                    {...register("last_name", { required: "Campo obrigatório.", maxLength:{value:25, message:'Máximo de 25 caracteres'}, minLength:{value:5, message:'Necessita no minímo 5 caracteres '}, onChange: (e) => {setUser({...user, last_name:e.target.value})}, })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="last_name"
                      render={({ message }) => 
                      <div className="text-red-400 px-2 py-1 rounded relative mt-2" role="alert" id='email-message'>
                        <strong className="font-bold">* {message}</strong>
                      </div>}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="username">
                      Nome de usuário *
                    </label>
                    <input  className="input input-bordered w-full max-w" 
                    id="username" type="text" placeholder="Jane123" name='username' 
                      {...register("username", { required: "Campo obrigatório.", maxLength:{value:25, message:'Máximo de 25 caracteres'}, minLength:{value:5, message:'Necessita no minímo 5 caracteres '}, onChange: (e) => {setUser({...user, username:e.target.value})}, })}

                    />
                    <p className="text-accent text-xs italic">Esse nome será sua identificação.</p>

                    <ErrorMessage
                      errors={errors}
                      name="username"
                      render={({ message }) => 
                      <div className="text-red-400 px-2 py-1 rounded relative mt-2" role="alert" id='email-message'>
                        <strong className="font-bold">* {message}</strong>
                      </div>}
                    />
                  </div>
                </div>
                
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="password">
                      Senha *
                    </label>
                    <input  className="input input-bordered w-full max-w" id="password" type="password" placeholder="************" name='password'
                      {...register("password",{ required: "Campo obrigatório.", minLength:{value:6, message:'Necessita no minímo 6 caracteres '}, onChange: (e) => {setUser({...user, password:e.target.value})}, })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="password"
                      render={({ message }) => 
                      <div className="text-red-400 px-2 py-1 rounded relative mt-2" role="alert" id='email-message'>
                        <strong className="font-bold">* {message}</strong>
                      </div>}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="password_confirmation">
                      Confirme sua senha *
                    </label>
                    <input  className="input input-bordered w-full max-w" id="password_confirmation" type="password" placeholder="************" name='password_confirmation'
                      {...register("password_confirmation", {validate:(password) =>{if(watch('password')!=password)return "Suas senhas não coincidem."}, required: "Campo obrigatório.", minLength:{value:6, message:'Necessita no minímo 6 caracteres '}, onChange: (e) => {setUser({...user, password_confirmation:e.target.value})}, })}
                    />
                      <p className="text-accent text-xs italic">Suas senhas precisam coincidir.</p>

                    <ErrorMessage
                      errors={errors}
                      name="password_confirmation"
                      render={({ message }) => 
                      <div className="text-red-400 px-2 py-1 rounded relative mt-2" role="alert" id='email-message'>
                        <strong className="font-bold">* {message}</strong>
                      </div>}
                    />
                    <p id='password_errors' className="text-lightcoral text-xs italic"></p>
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="email">
                      Email *
                    </label>
                    <input  className="input input-bordered w-full max-w" id="email" type="email" placeholder="jane@email.com" name='email'
                     {...register("email", { required: "Campo obrigatório.", maxLength:{value:45, message:'Máximo de 45 caracteres'}, minLength:{value:8, message:'Necessita no minímo 8 caracteres '}, onChange: (e) => {setUser({...user, email:e.target.value})}, })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="email"
                      render={({ message }) => 
                      <div className="text-red-400 px-2 py-1 rounded relative mt-2" role="alert" id='email-message'>
                        <strong className="font-bold">* {message}</strong>
                      </div>}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="cpf_cnpj">
                      CPF/CNPJ *
                    </label>
                    <input  className="input input-bordered w-full max-w" id="cpf_cnpj" type="text" placeholder="041-412-123-41" name='cpf_cnpj'
                      {...register("cpf_cnpj", { required: "Campo obrigatório.", maxLength:{value:14, message:'Máximo de 14 caracteres'}, minLength:{value:14, message:'Necessita no minímo 14 caracteres '}, onChange: (e) => {setUser({...user, cpf_cnpj:e.target.value})}, })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="cpf_cnpj"
                      render={({ message }) => 
                      <div className="text-red-400 px-2 py-1 rounded relative mt-2" role="alert" id='email-message'>
                        <strong className="font-bold">* {message}</strong>
                      </div>}
                    />
                    <p className="text-accent text-xs italic">Digite apenas números</p>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="sex">
                      Sexo *
                    </label>
                    <div className="relative">
                      <select {...register("sex", { required: "Campo obrigatório.", onChange: (e) => {setUser({...user, sex:e.target.value})}, })} className="input input-bordered w-full max-w" id="sex" name='sex'>
                        <option value='M'>Masculino</option>
                        <option value='F'>Feminino</option>
                      </select>

                      <ErrorMessage
                      errors={errors}
                      name="sex"
                      render={({ message }) => 
                      <div className="text-red-400 px-2 py-1 rounded relative mt-2" role="alert" id='email-message'>
                        <strong className="font-bold">* {message}</strong>
                      </div>}
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="phone">
                      Telefone
                    </label>
                    <input className="input input-bordered w-full max-w" id="phone" type='tel' placeholder="11975461285" name='phone'
                      {...register("phone", { required: "Campo obrigatório.", maxLength:{value:20, message:'Máximo de 20 caracteres'}, minLength:{value:8, message:'Necessita no minímo 8 caracteres '}, onChange: (e) => {setUser({...user, phone:e.target.value})}, })}

                    />
                    <ErrorMessage
                      errors={errors}
                      name="phone"
                      render={({ message }) => 
                      <div className="text-red-400 px-2 py-1 rounded relative mt-2" role="alert" id='email-message'>
                        <strong className="font-bold">* {message}</strong>
                      </div>}
                      />
                  </div>
                </div>

                <div style={{marginTop:30}} className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="birth_date">
                      Data de nascimento *
                    </label>
                    <input  className="input input-bordered w-full max-w" id="birth_date" type="date"  name='birth_date'
                      {...register("birth_date", { required: "Campo obrigatório.", onChange: (e) => {setUser({...user, birth_date:e.target.value})}, })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="birth_date"
                      render={({ message }) => 
                      <div className="text-red-400 px-2 py-1 rounded relative mt-2" role="alert" id='email-message'>
                        <strong className="font-bold">* {message}</strong>
                      </div>}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="user_type">
                      Inscreva-se como *
                    </label>
                    <div className="relative">
                      <select {...register("user_type", { required: "Campo obrigatório.", onChange: (e) => {setUser({...user, user_type:e.target.value})}, })}
 
                        className="input input-bordered w-full max-w" id="user_type" name='user_type'>
                        <option value='1'>Aluno</option>
                        <option value='2'>Professor</option>
                      </ select >

                      <ErrorMessage
                      errors={errors}
                      name="user_type"
                      render={({ message }) => 
                      <div className="text-red-400 px-2 py-1 rounded relative mt-2" role="alert" id='email-message'>
                        <strong className="font-bold">* {message}</strong>
                      </div>}
                      />
                    </div>
                  </div>
                </div>


                <div className="flex flex-wrap -mx-3 mb-2"> 

                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">

                    <div className="w-full md:w-1/2 mt-5">
                      <button disabled={isLoading} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" type='submit' >
                        {isLoading ? <span className="loading loading-spinner loading-lg"></span>: 'Finalizar'}

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