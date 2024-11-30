import { useState } from "react"

export default function TestComponent() {
    
//useState hook
const [num, setNum] = useState(0) /* func(useState) eka athulata input(0) ekak arn tiyenwa and outpu array ekak dila tiyenwa*/
                                /* inpu eka vidyata denna one adala variable eke tiyena starting value eka*/
                                /*retun wne ake 1 kotsa adala variable eka ,2kotase meh variable eka kamthi welwata change karanna puluwan wenna tiyena func eka*/


    return (
        <div className="bg-red-900 w-full h-[100vh] flex items-center justify-center">
            <div className="bg-white w-[350px] h-[350px] flex items-center justify-center"> 

                <button className="w-[60px] h-[60px] bg-blue-500 rounded-full text-2xl
                 text-white text-center" 
                 onClick={
                    () => {
                        const newNum = num - 1

                       setNum(newNum)
                    }
                 }> 
                    -
                </button> 

                <span className="text-6xl">
                    {num}
                </span>

                <button className="w-[60px] h-[60px] bg-red-500 rounded-full text-2xl
                 text-white text-center"
                 onClick={
                    () => {
                        const newNum = num + 1 //danata tiyene valueta(first time run weddi 0) 1+ wela newvaribale ekata samana wenwa

                        setNum(newNum)  //fun eka call karala parameter vidiyata pass karanwa newNumber. 
                                        //funv eka run wela number eka wadi wela  paga eka(adala componet eka refreh karanwa)adla vidyata wewas karanwa

                    }
                 }> 
                    +
                </button> 
            </div>
        </div>
    )
}