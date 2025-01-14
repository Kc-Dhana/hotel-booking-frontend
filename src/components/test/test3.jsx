import { upploadMediaToSupabase , supabase } from "../../utill/mediaUpload"     //mediaUpload export karapu connction eke mekata import karawa (superbase)
import { useState } from "react"

export function UploadComponent() {
    const [file, setFile] = useState(null)

    function handelClick() {
        upploadMediaToSupabase(file).then((res)=>{
            console.log(res)
        })
      const url = supabase.storage
        .from('images')                     //bucket name  
        .getPublicUrl(file.name)         //image kiyala bucjeket eken upload karapu file eke nama dila link eke ganne
         console.log(url.data.publicUrl)              //link eke print karanwa
         
    }
    return (
        <div >
            <input onChange={(e)=>{
                setFile(e.target.files[0])
            }} type="file" />
            <button onClick={handelClick}>Submit</button>    
        </div>
    )
}//submite button click karama hadelClick function eka call karanwa. e funtion eke uploadMediaToSupabase promise call karala passe resonse eka print karanwa