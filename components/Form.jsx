
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
            <input type="text" name="name" id="name" value={lab.name} onChange={(e)=> setLab({...lab, name:e.target.value})}/>

            <label htmlFor="">Descrição do laboratório</label>
            <textarea name="about" id="about" cols="30" rows="10"  value={lab.about} onChange={(e)=> setLab({...lab, about:e.target.value})}/>

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