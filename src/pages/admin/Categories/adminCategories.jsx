import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"

export default function AdminCategories(){
    //categories list
    //categories loaded

    const token = localStorage.getItem("token")
    if(token == null){
        window.location.href = "/login"
    }
    
    
    const[categories, setCategories] = useState([])
    const[categoriesIsLoaded, setCategoriesIsLoaded] = useState(false);

    const navigete = useNavigate();

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

    function handleDelete(name){ //category eke name eka pass karanwa

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

    function hadlePlusClick(){
        //go to add Category
        navigete("/admin/add-category") //smothly navigation.parana vidiaya giyoth refrsh wenwa
    }

    return(
        <div className="w-full p-4">
            <button className="bg-red-900 w-[60px] h-[60px] rounded-full text-2xl text-center flex justify-center items-center fixed bottom-5 right-5"
            onClick={()=>{
                hadlePlusClick()
            }}>
                <FaPlus color="white"/>
            </button>
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
                                        {category.Image ? (
                                            <img
                                                src={category.Image}
                                                alt={category.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        ) : (
                                            <span>No image</span>
                                        )}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                    <div className="flex space-x-2">
                                        <Link
                                        className="text-blue-500 hover:text-blue-700 transition"
                                        to={"/admin/update-category"}
                                        state={category} //click karana category row eke detail okkoma yawanwa next page ekata state eka vidiyata
                                        >
                                        <FaEdit />
                                        </Link>
                                        <button
                                        onClick={() => handleDelete(category.name)}     //click karana row eke catgory name eka pass karala hadeleDelete ekak run karannaw
                                        className="text-red-500 hover:text-red-700 transition"
                                        >
                                        <FaTrash />
                                        </button>
                                    </div>
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