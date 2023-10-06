import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


function DelModal({lab_id}) {
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
    <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Você tem certeza?</h3>
            <p className="py-4">Está ação ira <span className='text-red-600'>desativar</span> o Laboratório.<br></br> 
            Reativação somente mediante contato com os admnistradores.</p>
            <div className="modal-action">

                <button onClick={() => DesativarLab()} type="button" className="btn text-red-600">
                    Remover laboratório
                </button>
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button id='close' className="btn">Close</button>
                </form>
            </div>
        </div>
    </dialog>
  )
}

export default DelModal