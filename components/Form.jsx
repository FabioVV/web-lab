
import Link from "next/link"

function Form({lab, setLab, submitting, handleSubmit, type}) {

  return (
    <section>
        <h1>{type} Laboratório</h1>

        <form onSubmit={handleSubmit}>


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