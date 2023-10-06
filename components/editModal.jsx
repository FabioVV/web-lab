import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from './Form'

function EdModal({lab_id}) {
    const {data:session} = useSession()
    const router = useRouter()

    const DesativarLab = async() => {
    
        try{
            const response = await fetch(`http://127.0.0.1:8000/api/v3/laboratorios/${lab_id}/`,{
                method:"DELETE",
    
                headers: { 
                    "Content-Type":"application/json", Authorization:`Bearer ${session?.user.access}`
                }
            })
    
            if(response.ok){
    
                document.getElementById('close').click()
                window.location.replace('/')
                //window.flash(`Laboratório desativado.`, 'success')
    
            } else {
                window.flash(`Erro ao desativar laboratório.`, 'error')
            }
    
        } catch(err) {
            console.log(err)
        }
        
    } 
    



  return (
    <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Laboratório nomeaqui</h3>
            {/* <p className="py-4">Press ESC key or click outside to close</p> */}
            <Form
                type="Registrar"
                lab={{}}
                setLab={{}}
                submitting={{}}
                submit={{}}
            />

            <button id='close' className="btn">Salvar</button>
        </div>


        <form method="dialog" className="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
  )
}

export default EdModal