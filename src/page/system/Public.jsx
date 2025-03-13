import {Header,Footer,Navbar} from '../../components'
import { Outlet } from 'react-router-dom'

const Public = () => {
    return (
        <div className="w-full h-screen">
            <div className="w-full fixed h-[70px] border-b-custom z-20">
                <Header/>
            </div>
            <div className="w-full h-full flex pt-[70px] z-10">
                <div className="w-[240px] h-full">
                    <Navbar/>
                </div>
                <div className="h-full flex-1 bg-div min-w-[1500px] overflow-y-auto">
                    <Outlet/>
                    <Footer/>
                </div>
            </div>
        </div>
    )
}
export default Public