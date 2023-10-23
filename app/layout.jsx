"use client"

import { useEffect } from 'react'
import '@styles/globals.css'
import Nav from '@components/Navbar'
import Provider from '@components/Provider'
import { Flash } from '@components/Flash';
import Bus from '@utils/Bus'
import Footer from '@components/Footer'



export const metada = {
    title:'Sistema web para reserva de laboratórios, salas e auditórios.',
    description: 'Reservar um laboratório nunca foi tão fácil.'
}



function RootLayout({children}) {


    useEffect(() => {
        window.flash = (message, type="success") => Bus.emit('flash', ({message, type}));
    })
    

  return (
    <html lang='pt-BR' data-theme="dracula">
        <body className='min-h-screen'>
            <Provider>

                <Nav />
                <Flash />
                <main className='app'>

                    {children}
                    <Footer />

                </main>
                
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout