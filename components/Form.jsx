
import Link from "next/link"
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

function Form({lab, setLab, submitting, submit, type}) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();


  return (
    <section>
        <h1>{type} Laboratório</h1>

        <form onSubmit={handleSubmit(submit)}>


            <label htmlFor="">Nome do laboratório</label>
            <input type="text" name="name" id="name" value={lab.name} 
              {...register("name", { required: "Campo obrigatório.", maxLength:{value:20, message:'Máximo de 15 caracteres'}, minLength:{value:5, message:'Necessita no minímo 5 caracteres '}, onChange: (e) => {setLab({...lab, name:e.target.value})}, })}
            />

            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) => 
              <div class="text-red-300 px-2 py-1 rounded relative mt-2" role="alert" id='email-message'>
                <strong class="font-bold">* {message}</strong>
              </div>}
            />

            <label htmlFor="">Descrição do laboratório</label>
            <textarea name="about" id="about" cols="30" rows="10"  value={lab.about} 
              {...register("about", { required: "Campo obrigatório.", maxLength:{value:50, message:'Máximo de 30 caracteres'}, minLength:{value:5, message:'Necessita no minímo 5 caracteres '}, onChange: (e) => {setLab({...lab, about:e.target.value})}, })}
            />
            <ErrorMessage
              errors={errors}
              name="about"
              render={({ message }) => 
              <div class="text-red-300 px-2 py-1 rounded relative mt-2" role="alert" id='email-message'>
                <strong class="font-bold">* {message}</strong>
              </div>}
            />

            <Link  className='hover:border-b-2 hover:border-white-900 ' href="/">
              Cancelar
            </Link>

            <button type="submit" disabled={submitting}>
              {submitting ? `${type}...,`:`${type}`}
            </button>
        </form>
    </section>
  )

}

export default Form