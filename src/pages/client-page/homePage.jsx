import Header from "../../components/header/header";

export default function HomePage() {
    return (
        <>
      <Header />
      <div className="w-full h-screen bg-blue-900 flex flex-col items-center">
        
        
        <h1 className="text-white text-[50px] w-full text-center">
          Welcome to the Leonine villa</h1>

          <div className="border border-white bg-white mt-[20px] 
        px-[10px] py-[20px] rounded-lg flex justify-center items-center
        ">
          <input type="date"/>
          <input type="date"/>
          <select>
            <option>Luxury</option>
            <option>Normal</option>
            <option>Low</option>
          </select>
          <button>Book Now</button>
        </div>
      </div>
    </>
    )
}