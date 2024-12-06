import axios from "axios";
import React, { useEffect, useState } from "react";


const CategoriesPage = () => {

    const[categories, setCategories] = useState([])     //page eka load weddi category eke tiyenne empty array ekak
    const[categoriesIsLoaded, setCategoriesIsLoaded] = useState(false)

    useEffect(
        ()=>{
    
          if(!categoriesIsLoaded){ //category eka load wela nattam(faluse) nam run karanwa
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/category")  //req ekak yawanwa
            .then((res)=>{ 
              console.log(res.data.categories)  
              setCategories(res.data.categories)//respone eke apu data set kara gannwa
              setCategoriesIsLoaded(true) //setCategoriesIsLoaded(true) danwa .ehakota aye meka run wenne na
            })
          }
    
        },[categoriesIsLoaded]
      )
    

    function deleteItem(name){
    
            alert("delete catagory"+name)
        axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/category/"+name , {
        //   headers: {
        //     Authorization: "Bearer "+localStorage.getItem("token")
        //   }
        }).then((res)=>{
        //   toast.success("Category deleted successfully")
        //   setCategoriesIsLoaded(false)
        setCategoriesIsLoaded(false) //page ekama refresh wenne na awasha de vithari//use efect eka aye run wewna
        
    
        })
        
    
      }

    return (
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-4">Category List</h2>
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Price ($)</th>
                <th className="py-2 px-4 border-b">Features</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b text-center">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-12 h-12 rounded-full mx-auto"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">{category.name}</td>
                  <td className="py-2 px-4 border-b text-center">
                    {category.price.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <ul className="list-disc pl-4">
                      {category.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-2 px-4 border-b">{category.description}</td>
                  <td className="py-2 px-4 border-b">
    
                    
                    <button onClick={
    
                        ()=>{
                          deleteItem(category.name)
                        }
    
                      } className="bg-red-500 text-white px-4 py-1 rounded-lg ml-2">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

export default CategoriesPage;
