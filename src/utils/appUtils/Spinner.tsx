import { useEffect } from "react"
import { useSetLoading } from "../../hooks/appHooks"

interface Spinnerinterface{
    loadingState:boolean
}

function Spinner({loadingState}:Spinnerinterface){
   const {setLaoding} = useSetLoading() 
    useEffect(()=>{
        setLaoding(loadingState?true:false)
    },[loadingState])

    return null

}
export default Spinner