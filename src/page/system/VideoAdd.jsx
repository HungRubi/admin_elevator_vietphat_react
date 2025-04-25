import { NavLink, useNavigate } from "react-router-dom";
import { Input, Combobox, Button, Textearea, ToastFormat, InputGroup } from '../../components'
import icon from '../../util/icon';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../store/actions'
const { MdChevronRight, IoImageOutline } = icon

const VideoAdd = () => {
    const dispatch = useDispatch();
    const {message} = useSelector(state => state.app);
    const [formData, setFormDate] = useState({
        name: "",
        content: "",
        status: "",
        thumbnail: "",
        video_url: "",
    })
    const handleChange = (e) => {
        setFormDate({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = (e) => {
            e.preventDefault();
            dispatch(actions.createCategoryVideo(formData));
        }
    const status = [
        {
            id: 'public',
            text: 'Public',
        },
        {
            id: 'hidden',
            text: 'Hidden',
        },
    ]
    const navigate = useNavigate()
    useEffect(() => {
        if(message === "Thêm video thành công!"){
            navigate("/category/video")
        }
    }, [navigate, message])
    return (
        <div className="full pt-5">
            <div className="w-full px-[30px] flex gap-8">
                <div className="w-full">
                    <div className="flex items-center gap-2 text-[15px] text-color">
                        <NavLink to={'/'} className={"hover:text-blue-600 transition duration-300 ease-linear"}>
                            Dashboard
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/category/video'}>
                            Video
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/category/video/add'} className={"text-blue-600"}>
                            Add video
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-[600]">Video</h2>
                    <h5 className="text-[12px] text-[#6d6c6c]">Add a new video of your company</h5>
                </div>
            </div>
            <form className="w-full px-[30px] bg-white mt-8" method="POST" onSubmit={handleSubmit}>
                <div className="w-full flex border-b-custom py-10">
                    <div className="w-2/6 ">
                        <h5 className="text-[20px] font-medium text-black text-color mt-5">
                            Video Information
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            Details and insights about the video.
                        </p>
                    </div>
                    <div className="flex-1">
                        <Input 
                            label={"Name"} 
                            name={"name"} 
                            onChange={handleChange}
                        />
                        <Textearea 
                            row={5} 
                            label={"Content"} 
                            name={"content"} 
                            onChange={handleChange}
                        />
                        <Combobox 
                            data={status} 
                            label={"Status"} 
                            name={"status"} 
                            onChange={handleChange}
                            selected={formData.status}
                        />
                    </div>
                </div>
                <div className="w-full flex border-b-custom py-10">
                    <div className="w-2/6">
                        <h5 className="text-[20px] font-medium text-black text-color mt-5">
                            Video Thumbnail
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            A preview image representing the video.
                        </p>
                    </div>
                    <div className="flex-1">
                        <InputGroup 
                            label={"Thumbnail"} 
                            onChange={handleChange}
                            name={"thumbnail"}
                            value={formData?.thumbnail}
                            icon={<IoImageOutline className="text-lg text-gray-600"/>}
                            helper={"Please enter the thumbnail url link"}
                        />
                        <InputGroup 
                            label={"Video"} 
                            onChange={handleChange}
                            name={"video_url"}
                            value={formData?.video_url}
                            icon={<IoImageOutline className="text-lg text-gray-600"/>}
                            helper={"Please enter the video url link"}
                        />
                    </div>
                </div>
                <div className="w-full py-20 relative">
                    <Button type="button" 
                    className={"absolute left-[77.777%] transform -translate-x-[210%] top-[50%] !border-none -translate-y-[50%] font-medium "}>
                        <NavLink to={"/category/video"}>
                            Cancel
                        </NavLink>
                    </Button>
                    <Button type="submit" 
                    className={"absolute left-[77.777%] transform -translate-x-[100%] top-[50%] -translate-y-[50%] shadow-md !py-1 font-medium text-white bg-blue-500"}>
                        Save
                    </Button>
                </div>
            </form>
        </div>
    ) 
}

export default VideoAdd