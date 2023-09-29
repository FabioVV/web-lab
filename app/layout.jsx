
import React, { Children } from 'react'
import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'


export const metada = {
    title:'Laboratory booking app',
    description: 'Booking an laboratory has never been easier.'
}

function RootLayout({children}) {
  return (
    <html lang='en' data-theme="black">
        <body>
            <Provider>
                <div className='main'>

                </div>

                <main className='app'>
                    <Nav />
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout