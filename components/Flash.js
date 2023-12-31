"use client"

import React, { useEffect, useState } from 'react';
import Bus from '@utils/Bus'; 
import { motion } from "framer-motion"

export const Flash = () => {
    let [visibility, setVisibility] = useState(false);
    let [message, setMessage] = useState('');
    let [type, setType] = useState('');

    useEffect(() => {
        Bus.addListener('flash', ({message, type}) => {
            setVisibility(true);
            setMessage(message);
            setType(type);
            setTimeout(() => {
                setVisibility(false);
            }, 5250);
        });
                

    }, []);

    useEffect(() => {
        if(document.querySelector('.close') !== null) {
            document.
            querySelector('.close').
            addEventListener('click', () => setVisibility(false));
        }
    })

    if(type == 'error'){
        return (

        
            visibility && 
            <motion.div className="alert alert-error fixed"   
            initial={{ x: 600,opacity: 0 }}
            animate={{ x: 0,opacity: 1 }}
            transition={{ delay: 0.1 }} 
            >          
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{message}</span>
            </motion.div>
            
    
            
        )
    } else if(type == 'success'){
        return (

            visibility && 

            <motion.div className="alert alert-success fixed"
            initial={{ x: 600,opacity: 0 }}
            animate={{ x: 0,opacity: 1 }}
            transition={{ delay: 0.1 }} 
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{message}</span>
            </motion.div>
            
        )
        
    }
   
}



{/* INFO <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
  <p className="font-bold">Informational message</p>
  <p className="text-sm">Some additional text to explain said message.</p>
</div>


WARNING <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
  <p className="font-bold">Be Warned</p>
  <p>Something not ideal might be happening.</p>
</div> */}