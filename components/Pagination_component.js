import React from 'react'

function Pagination({page_size, count, total_pages, current_page_number, next, previous, fetch, url}) {
    
    const regex = /(page=[0-9])/g;
    let next_r = next?.match(regex).toString()
    let new_next = ''
    let page_value_next = ''
    if(next_r){
        page_value_next = parseInt(next_r[next_r?.length-1]) + 1
        if(page_value_next <= total_pages){
            new_next = next?.replace(`${next_r}`, `page=${page_value_next}`)    
        } 
    }


    let previous_r = previous?.match(regex).toString()
    let new_previous = ''
    let page_value_previous = ''
    if(previous_r){
        page_value_previous = parseInt(previous_r[previous_r?.length-1]) - 1
        if(page_value_previous >= 1){
            new_previous = previous?.replace(`${previous_r}`, `page=${page_value_previous}`)    
        } 
    }

    async function new_previous_fetch(url){
        if(url != ''){
            return await fetch(`${url}`)
        }
    } 

    async function new_next_fetch(url){
        if(url != ''){
            return await fetch(`${url}`)
        }
    } 
 
    
    let links = []
    for (let index = 0; index < total_pages; index++) {
        links.push(<button onClick={async ()=>{await fetch(`${url}?page=${index+1}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
        className={current_page_number === index + 1  ? "join-item btn btn-active":"join-item btn"}>
        {index+1}
        </button>)
    }

    if(links.length > 4){

        links = []

        for (let index = 0; index < total_pages; index++) {
            links.push(<button onClick={async ()=>{await fetch(`${url}?page=${index+1}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
            className={current_page_number === index+1  ? "join-item btn btn-active":"join-item btn"}>
                {index+1}
            </button>
            )            
        }


    } 

  return ( 
    <div className='mt-3 mb-8 text-center'>
        <div className="join">

            <button onClick={async ()=>{await fetch(`${previous}`); window.scrollTo({ top: 0, behavior: 'smooth' });} } className="join-item btn bg-black">&lt;</button>
            <button onClick={()=>{new_previous_fetch(new_previous); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={current_page_number === page_value_previous  ? "join-item btn btn-active":"join-item btn"}> &lt;&lt;</button>
            {links} 
            <button onClick={()=>{new_next_fetch(new_next); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={current_page_number === page_value_next  ? "join-item btn btn-active":"join-item btn"}>&gt;&gt;</button>
            <button onClick={async ()=>{await fetch(`${next}`); window.scrollTo({ top: 0, behavior: 'smooth' });}} className="join-item btn bg-black">&gt;</button>
       
        </div>
        <div>
            <span className='font-bold'>Total de páginas: {total_pages ? total_pages: '1'}</span>
        </div>
  </div>
  )
}

export default Pagination