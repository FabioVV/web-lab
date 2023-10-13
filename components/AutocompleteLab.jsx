import AutoComplete from "@geist-ui/core/esm/auto-complete/auto-complete"
import { useState } from "react"

function Auto_(){
    
    
        const allOptions = [
          { label: 'London', value: 'london' },
          { label: 'Sydney', value: 'sydney' },
          { label: 'Shanghai', value: 'shanghai' },
        ]
        const [options, setOptions] = useState()

        const searchHandler = (currentValue) => {
          if (!currentValue) return setOptions([])
          const relatedOptions = allOptions.filter(item => item.value.includes(currentValue))
          setOptions(relatedOptions)
        }

        return <AutoComplete className="z" options={options} placeholder="Enter here" onSearch={searchHandler} />
    
}



export default Auto_