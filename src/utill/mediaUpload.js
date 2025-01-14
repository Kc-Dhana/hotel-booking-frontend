import app from "../config/firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { createClient } from "@supabase/supabase-js";
import { cache } from "react";

const storage = getStorage(app, "gs://hotel-managment-99.appspot.com"); //cutomer bucket url. storage eke file

const superbaseUrl =import.meta.env.VITE_URL;       
const superbaseKey =import.meta.env.VITE_ANON;
export const supabase = createClient(superbaseUrl, superbaseKey);   //superbase eke connetion eke 

export default function uploadMedia(file) {
    if (!file) {
      console.log("No file selected.");
      return;
    }
  
    const fileRef = ref(storage, file.name);
  
    return uploadBytes(fileRef, file)//promise eka return karawna
  }

export function upploadMediaToSupabase(file) {     
    if (!file) {  
      console.log("No file selected.");
      return;
    }
                                            //ena file eka superpbase upload karalanwa
    return supabase.storage
    .from( 'images' )              //superbase bucket name
    .upload(file.name,file, {           //upload karana file eke name ekema gannnwa
      cacheControl: '3600',
      upsert: false
    })
}
  



/*
.then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url)=>{
        console.log(url)
      })

    })

*/


/*
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";

const uploadFileToFirebase = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No file provided");
      return;
    }

    const storageRef = ref(storage, uploads/${file.name});

    uploadBytes(storageRef, file)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadURL) => {
        resolve(downloadURL);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

*/