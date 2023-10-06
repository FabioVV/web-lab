import React from 'react'

function Modal() {
  return (
    <div>
        <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button>
        <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Você tem certeza?</h3>
                <p className="py-4">Pressione ESC ou clique no botão abaixo para fechar</p>

                

                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    </div>
  )
}

export default Modal