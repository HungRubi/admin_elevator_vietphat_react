import {Header,Footer,Navbar} from '../../components';
import { Outlet } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import {Login} from '../public';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions'

const Public = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getOrder())
    }, [dispatch])
    return (
        <div className='w-full h-screen relative'>  
            <div className="w-full h-screen ">
                <Routes>
                    <Route path='/login' element={<Login/>} />
                </Routes>
                <div className="w-full fixed h-[70px] border-b-custom z-20">
                    <Header/>
                </div>
                <div className="w-full h-full flex pt-[70px] z-10">
                    <div className="w-[240px] h-full flex-none">
                        <Navbar/>
                    </div>
                    <div className="h-full flex-1 bg-div min-w-[1500px] overflow-y-auto 
                        [&::-webkit-scrollbar]:w-2.5
                        [&::-webkit-scrollbar-track]:rounded-full
                        [&::-webkit-scrollbar-track]:bg-gray-100
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:bg-[#74717171]
                        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                        <Outlet/>
                        <Footer/>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
export default Public