"use client"

import React, { Children, useEffect } from 'react'
import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'
import { Flash } from '@components/Flash';
import Bus from '@utils/Bus'


export const metada = {
    title:'Laboratory booking app',
    description: 'Booking an laboratory has never been easier.'
}

window.flash = (message, type="success") => Bus.emit('flash', ({message, type}));

function RootLayout({children}) {

    


  return (
    <html lang='en' data-theme="black">
        <body>
            <Provider>
                <div className='main'>

                </div>

                <main className='app'>
                    <Nav />
                    <Flash />
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout