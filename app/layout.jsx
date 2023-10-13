"use client"

import { useEffect } from 'react'
import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'
import { Flash } from '@components/Flash';
import Bus from '@utils/Bus'
import Footer from '@components/Footer'

export const metada = {
    title:'Laboratory booking app',
    description: 'Booking an laboratory has never been easier.'
}



function RootLayout({children}) {


    useEffect(() => {
        window.flash = (message, type="success") => Bus.emit('flash', ({message, type}));
    })
    

  return (
    <html lang='en' data-theme="dracula">
        <body>
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