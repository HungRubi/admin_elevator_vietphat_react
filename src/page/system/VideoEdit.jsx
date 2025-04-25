import { NavLink, useNavigate } from "react-router-dom";
import { Input, Combobox, Button, Textearea } from '../../components'
import icon from '../../util/icon';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../store/actions'
const { MdChevronRight } = icon

const VideoEdit = () => {
    const dispatch = useDispatch();
    const {message,videoDetail} = useSelector(state => state.app);
    const [formData, setFormData] = useState({
        name: videoDetail?.name,
        content: videoDetail?.content,
        status: videoDetail?.status,
        thumbnail: videoDetail?.thumbnail,
        video_url: videoDetail?.video_url,
    })
    const id = window.location.pathname.split("/").slice(-2,-1)[0];
    console.log(id)
    useEffect(() => {
            dispatch(actions.getCategoryVideoDetail(id));
        },[dispatch, id])
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }
    useEffect(() => {
        if (videoDetail) {
            setFormData({
                name: videoDetail?.name || "",
                content: videoDetail?.content || "",
                status: videoDetail?.status || "",
                thumbnail: videoDetail?.thumbnail || "",
                video_url: videoDetail?.video_url || "",
            });
        }
    }, [videoDetail]);
    const handleSubmit = (e) => {
            e.preventDefault();
            dispatch(actions.updateCategoryVideo(formData, id));
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
    const navigate = useNavigate();
    useEffect(() => {
        if(message === "Cập nhật video thành công!"){
            navigate("/category/video")
        }
    }, [message, navigate])
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
                            Edit video
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
                            value={formData.name} 
                            onChange={handleChange}
                        />
                        <Textearea 
                            row={5} label={"Content"} 
                            name={"content"} 
                            onChange={handleChange} 
                            children={formData.content}
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
                        <Input 
                            label={"Thumbnail"} 
                            name={"thumbnail"} 
                            placeholder={"Url image"} 
                            onChange={handleChange}
                            value={formData.thumbnail}
                        />
                        <Input 
                            label={"Video"} 
                            name={"video_url"} 
                            placeholder={"Url video"} 
                            onChange={handleChange}
                            value={formData.video_url}
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

export default VideoEdit