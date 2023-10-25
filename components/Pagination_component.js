import React from 'react'

function Pagination({page_size, count, total_pages, current_page_number, next, previous, fetch, url}) {

    let links = []
    for (let index = 0; index < total_pages; index++) {
        links.push(<button onClick={()=>{fetch(`${url}?page=${index+1}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
        className={current_page_number === index+1  ? "join-item btn btn-active":"join-item btn"}>
        {index+1}
        </button>)
    }

    


  return ( 
    <div className='mt-3 mb-8 text-center'>
        <div className="join">

            <button onClick={()=>{fetch(`${previous}`); window.scrollTo({ top: 0, behavior: 'smooth' });} } className="join-item btn bg-black">&lt;</button>
            {links}
            <button onClick={()=>{fetch(`${next}`); window.scrollTo({ top: 0, behavior: 'smooth' });}} className="join-item btn bg-black">&gt;</button>

        </div>
        {/* <div>
            <span className='font-bold'>Total de páginas: {total_pages ? total_pages:'1'}</span>
        </div> */}
  </div>
  )
}

export default Pagination