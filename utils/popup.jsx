import React from 'react'

const Popup = ({isVisible, onClose}) => {
  if(!isVisible) return null;
    

  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
        <div className='w-[600px] flex flex-col'>
            <button className='text-white text-xl place-self-end' onClick={()=>onClose()}>X</button>
            <div className='bg-white p-2 rounded text-black'>
              <h3 className='text-3xl font-semibold mb-5 border-b-2 border-black'>Estamos quase lá!</h3>
              FORMULARIO AQUI
            </div>
        </div>
        
    </div>
    
  )
}

export default Popup