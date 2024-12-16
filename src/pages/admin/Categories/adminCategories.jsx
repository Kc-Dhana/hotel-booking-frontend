import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { FaEdit, FaTrash } from "react-icons/fa"

export default function AdminCategories(){
    //categories list
    //categories loaded

    const token = localStorage.getItem("token")
    if(token == null){
        window.location.href = "/login"
    }
    
    
    const[categories, setCategories] = useState([])
    const[categoriesIsLoaded, setCategoriesIsLoaded] = useState(false)

    useEffect(()=>{
        if(!categoriesIsLoaded){ //category eka load wela nattam(faluse) nam run karanwa 
        axios.get(import.meta.env.VITE_BACKEND_URL+"/api/category")  //req ekak yawanwa
        .then((res)=>{ 
            console.log(res.data.categories)  //print 
            setCategories(res.data.categories)//respone eke apu data set kara gannwa
            setCategoriesIsLoaded(true) //setCategoriesIsLoaded(true) danwa .ehakota aye meka run wenne na
        }).catch(
            (err)=>{
                console.log(err)
            }
        )
     }
     }
    ,[categoriesIsLoaded]) //sensetive variable danne  methaba (variable eka wenask unoth useEffect run wenwa) //empty array(useEffect hook eke dependenci array)

    function hadleDelete(name){ //category eke name eka pass karanwa

        console.log(name)
        console.log(token)
        axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/category/" + name, {
                headers: {
                    Authorization: "Bearer "+token,
                },
            }).then((res)=>{
                toast.success("Category deleted successfully")
                setCategoriesIsLoaded(false)   //delete unama meka false wenwa. ekiyanne useEffect run wenwa.(page eka refresh wenwa)
            }).catch((err)=>{
                toast.error("Error deleting category")
            })
    }

    return(
        <div className="w-full p-4">
            <h1 className="text-2xl font-bold mb-4">Categories Table</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border-b">#</th>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Price</th>
                            <th className="py-2 px-4 border-b">Description</th>
                            <th className="py-2 px-4 border-b">Features</th>
                            <th className="py-2 px-4 border-b">Image</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length > 0 ? (
                            categories.map((category, index) => ( //hama category ekakma table eke raw ekak vidiyata map karala tiyenne.(categery json +array eke kiweniyada(key ekka vidiyata))
                                <tr key={category._id || index} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                                    <td className="py-2 px-4 border-b">{category.name}</td>
                                    <td className="py-2 px-4 border-b">${category.price}</td>
                                    <td className="py-2 px-4 border-b">{category.description}</td>
                                    <td className="py-2 px-4 border-b">
                                        {category.features && category.features.length > 0 ? (
                                            <ul className="list-disc ml-4">
                                                {category.features.map((feature, i) => (
                                                    <li key={i}>{feature}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <span>No features listed</span>
                                        )}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {category.image ? (
                                            <img
                                                src={category.image}
                                                alt={category.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        ) : (
                                            <span>No image</span>
                                        )}
                                    </td>
                                    <td className="py-2 px-4 border-b text-center">
                                        <button
                                            onClick={() =>{}}
                                            className="text-blue-500 hover:text-blue-700 mx-2"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => hadleDelete(category.name)}//click karana row eke catgory name eka pass karala hadeleDelete ekak run karannaw
                                            className="text-red-500 hover:text-red-700 mx-2"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="py-4 px-4 text-center text-gray-500">
                                    Loading categories...
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}