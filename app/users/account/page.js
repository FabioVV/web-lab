"use client"

import { IMaskInput } from "react-imask";
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useSession } from 'next-auth/react';
import DelModalAccount from '@components/deleteAccountModal';

const UserAccount = () => {
  const {data:session, update} = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, setError, watch, reset, formState: { errors } } = useForm();
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
  })

  useEffect(()=>{
    let defaultValues = {};

    const fetchUser = async ()=>{
        const res = await fetch(`http://127.0.0.1:8000/api/v3/usuarios/${session?.user.id}/`, {
        method:"GET",

        headers: {
            "Content-Type":"application/json", Authorization:`Bearer ${session?.user.access}`
        }, 

      });
      
      const user_get = await res.json()
      setUser({
        first_name: user_get.first_name,
        last_name: user_get.last_name,
        username: user_get.username,
        phone: user_get.phone,
        email: user_get.email,
        cpf_cnpj: user_get.cpf_cnpj,
        user_type: user_get.user_type,
        birth_date: user_get.birth_date,
        sex: user_get.sex,
      })

      defaultValues.first_name = user_get.first_name;
      defaultValues.last_name = user_get.last_name;
      defaultValues.username = user_get.username;
      defaultValues.phone = user_get.phone;
      defaultValues.email = user_get.email;
      defaultValues.cpf_cnpj = user_get.cpf_cnpj;
      defaultValues.user_type = user_get.user_type;
      defaultValues.birth_date = user_get.birth_date;
      defaultValues.sex = user_get.sex;

      reset({ ...defaultValues });
    }
    
    if(session?.user.id) fetchUser()

  }, [reset, session?.user.access, session?.user.id])


  async function onSubmit(form ,event){
      event.preventDefault()
      setIsLoading(true)

      const res = await fetch(`http://127.0.0.1:8000/api/v3/usuarios/${session?.user.id}/`, {
        method:"PATCH",

        headers: { 
            "Content-Type":"application/json", Authorization:`Bearer ${session?.user.access}`
        }, 

        body: JSON.stringify({
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
          phone: user.phone,
          email: user.email,
          cpf_cnpj: user.cpf_cnpj,
          user_type: user.user_type,
          birth_date: user.birth_date,
          sex: user.sex,
        }),
      });
  
      const user_updated = await res.json()

      if(res.status == 200){

        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.flash(`Dados alterados.`, 'success')
        await update({ ...user_updated })

        setIsLoading(false)

      } else if(user_updated['cpf_cnpj']){

        setError('cpf_cnpj', {
          type: 'cpf_ja_existe',
          message:'Já existe cadastro para este CPF/CNPJ.'
        })
        setIsLoading(false)

      } else if(user_updated['email']){

        setError('email', {
          type: 'email_ja_existe',
          message:'Já existe cadastro para este E-mail.'
        })
        setIsLoading(false)

      } else if(user_updated['username']){

        setError('username', {
          type: 'username_ja_existe',
          message:'Já existe cadastro para este nome de usuário.'
        })
        setIsLoading(false)

      } else {
        window.flash(`Erro. Favor, tentar novamente.`, 'error')
      }
      
      setIsLoading(false)

  }

    
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 rounded-lg shadow-2xl lg:max-w-xl transition-all">
            <div className=''>
              <h1 className='text-3xl font-bold text-center ' >Seus dados.</h1>
              
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
                      Sobrenome
                    </label>
                    <input  className="input input-bordered w-full max-w" id="last_name" type="text" placeholder="Doe" name='last_name'
                    {...register("last_name", {  required: "Campo obrigatório.", maxLength:{value:25, message:'Máximo de 25 caracteres'}, minLength:{value:5, message:'Necessita no minímo 5 caracteres '}, onChange: (e) => {setUser({...user, last_name:e.target.value})}, })}

                    />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="username">
                      Nome de usuário *
                    </label>
                    <input className="input input-bordered w-full max-w" 
                    id="username" type="text" placeholder="Jane123" name='username' 
                      {...register("username", { required: "Campo obrigatório.", maxLength:{value:25, message:'Máximo de 25 caracteres'}, minLength:{value:5, message:'Necessita no minímo 5 caracteres '}, onChange: (e) => {setUser({...user, username:e.target.value})}, })}

                    />
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
                
                {/* <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="password">
                      Senha *
                    </label>
                    <input  className="input input-bordered w-full max-w" id="password" type="password" placeholder="************" name='password'
                      {...register("password", { required: "Campo obrigatório." })}
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
                      {...register("password_confirmation", { required: "Campo obrigatório." })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="password_confirmation"
                      render={({ message }) => 
                      <div className="text-red-400 px-2 py-1 rounded relative mt-2" role="alert" id='email-message'>
                        <strong className="font-bold">* {message}</strong>
                      </div>}
                    />
                    <p id='password_errors' className="text-lightcoral text-xs italic"></p>
                    <p className="text-accent text-xs italic">Suas senhas precisam coincidir.</p>
                  </div>
                </div> */}

                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="email">
                      Email *
                    </label>
                    <input  className="input input-bordered w-full max-w" id="email" type="email" placeholder="jane@email.com" name='email'
                     {...register("email", { required: "Campo obrigatório.", pattern: { value: /.+@.+/, message: 'Email inválido' }, maxLength:{value:45, message:'Máximo de 45 caracteres'}, onChange: (e) => {setUser({...user, email:e.target.value})}, })}
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
                    
                    {/* <IMaskInput mask="000.000.000-00" className="input input-bordered w-full max-w" id="cpf_cnpj" type="text" placeholder="041-412-123-41" name='cpf_cnpj'
                      {...register("cpf_cnpj", { required: "Campo obrigatório.", maxLength:{value:14, message:'Máximo de 14 caracteres'}, onChange: (e) => {setUser({...user, cpf_cnpj:e.target.value})}, })}

                    /> */}

                    <input  className="input input-bordered w-full max-w" id="cpf_cnpj" type="text" placeholder="041-412-123-41" name='cpf_cnpj'
                      {...register("cpf_cnpj", { required: "Campo obrigatório.", maxLength:{value:14, message:'Máximo de 14 caracteres'}, onChange: (e) => {setUser({...user, cpf_cnpj:e.target.value})}, })}
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
                      <select {...register("sex", { required: "Campo obrigatório.", onChange: (e) => {setUser({...user, sex:e.target.value})}, })} 

                        className="select select-bordered w-full max-w" id="sex" name='sex'>
                        <option value='N'>Não especificado</option>

                        <option value='M'>Masculino</option>
                        <option value='F'>Feminino</option>
                      </  select >
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="phone">
                      Telefone
                    </label>
                    <input  className="input input-bordered w-full max-w" id="phone" type='tel' placeholder="11975461285" name='phone'
                     {...register("phone", {  maxLength:{value:20, message:'Máximo de 14 caracteres'}, onChange: (e) => {setUser({...user, phone:e.target.value})}, })}

                    />
                  </div>

                </div>

                <div style={{marginTop:30}} className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="birth_date">
                      Data de nascimento *
                    </label>
                    <input  className="input input-bordered w-full max-w" id="birth_date" type="date"  name='birth_date'
                      {...register("birth_date", {  onChange: (e) => {setUser({...user, birth_date:e.target.value})}, })}
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
                  {/* <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="user_type">
                      MANTER SOMENTE NO DEV *
                    </label>
                    <div className="relative">
                      <select {...register("user_type", { required: "Campo obrigatório." , maxLength:{value:45, message:'Máximo de 45 caracteres'}, onChange: (e) => {setUser({...user, user_type:e.target.value})}, })}


                       className="select select-bordered w-full max-w" id="user_type" name='user_type'>
                        <option value='1'>Aluno</option>
                        <option value='2'>Professor</option>
                      </select>
                    </div>
                  </div> */}
                </div>


                <div className="flex flex-wrap -mx-3 mb-2"> 

                  <div className="px-3 mb-6 md:mb-0">

                    <div className="mt-2">
                      <button id='account-save-button' disabled={isLoading} type="submit" className="btn btn-outline btn-success mr-3">
                        {isLoading ? <span className="loading loading-spinner loading-lg"></span>: 'Salvar'}

                      </button>

                      <button disabled={isLoading} onClick={() => {document.getElementById(`my_modal_delete_user_${session?.user.id}`)?.showModal()}} className="btn btn-outline btn-error" type='button' >
                        Excluir conta
                      </button>
                    </div>
                    

                  </div>

                </div>

              </form>

            </div>
        </div>
        <DelModalAccount />
    </div>
    
  )
}

export default UserAccount