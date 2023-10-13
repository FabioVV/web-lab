import AutoComplete from "@geist-ui/core/esm/auto-complete/auto-complete"
import { useState } from "react"
import { useRef } from "react"
function Auto_(){
    
    
    const allOptions = [
        { label: 'London', value: 'london' },
        { label: 'Sydney', value: 'sydney' },
        { label: 'Shanghai', value: 'shanghai' },
      ]
      const [options, setOptions] = useState()
      const [searching, setSearching] = useState(false)
      const timer = useRef()
      // triggered every time input
      const searchHandler = (currentValue) => {
        if (!currentValue) return setOptions([])
        setSearching(true)
        const relatedOptions = allOptions.filter(item => item.value.includes(currentValue))
        // this is mock async request
        // you can get data in any way
        timer.current && clearTimeout(timer.current)
        timer.current = setTimeout(() => {
          setOptions(relatedOptions)
          setSearching(false)
          clearTimeout(timer.current)
        }, 1000)
      }
      return (
        <AutoComplete searching={searching}
          options={options}
          placeholder="Enter here"
          onSearch={searchHandler} />
      )
    
}



export default Auto_