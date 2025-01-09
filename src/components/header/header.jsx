import UserTag from "../userData/userdata.jsx";


function Header() {
    return (
        <header className='min-w-full bg-blue-500 flex sm:h-[50px] lg:h-[100px] relative items-center p-[10px]'>
            <h1 className='text-white text-[30px]'>Leonine villa</h1>
            <UserTag imageLink="https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg" name="Malith Dilshan"/>
        </header>
    )
}

export default Header;  