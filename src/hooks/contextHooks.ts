import { useAppContext } from "../utils/AppContext";

export function useSetPageindex(){
    const {pageIndex,dispatch } = useAppContext()
    function setPageIndex(index:number){
        dispatch({
            type:"setPageIndex",
            payload:index
        })
    }

    return {setPageIndex}
}