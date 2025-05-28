import { NavLink, useNavigate } from "react-router-dom";
import { Input, Combobox, Button, Textearea } from '../../components'
import icon from '../../util/icon';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../store/actions'

const { MdChevronRight } = icon

const ArticleAdd = () => {
    const { message } = useSelector(state => state.app);
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
    const [formData, setFormData] = useState({
        subject: '',
        content: '',
        status: '',
        thumbnail: '',
        thumbnail_1: '',
        thumbnail_3: '',
        thumbnail_2: '',
    })
    const handleChange = (e, selected) => {
        setFormData({
            ...formData,
            [e.target.name]: selected ? selected.id : e.target.value
        })
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(actions.createArticle(formData))
    }
    useEffect(() => {
        if(message === "Thêm bài viết thành công"){
            navigate("/article")
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
                        <NavLink to={'/article'}>
                            Article
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/article/add'} className={"text-blue-600"}>
                            Add article
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-[600]">Article</h2>
                    <h5 className="text-[12px] text-[#6d6c6c]">Add a new article of your company</h5>
                </div>
            </div>
            <form className="w-full px-[30px] bg-white mt-8" onSubmit={handleSubmit}>
                <div className="w-full flex border-b-custom py-10">
                    <div className="w-2/6 ">
                        <h5 className="text-[20px] font-medium text-black text-color mt-5">
                            Article Content
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            Your article's title and content
                        </p>
                    </div>
                    <div className="flex-1">
                        <Input 
                            label={"Subject"} 
                            name={"subject"}
                            onChange={handleChange}
                            value={formData.subject}
                        />
                        <Textearea 
                            row={15} 
                            label={"Content"} 
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
                            Article Thumbnail
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            List of thumbnail of your article
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
                            label={"Thumbnail"} 
                            name={"thumbnail_1"} 
                            placeholder={"Url image"}
                            onChange={handleChange}
                            value={formData.thumbnail_1}
                        />
                        <Input 
                            label={"Thumbnail"} 
                            name={"thumbnail_2"} 
                            placeholder={"Url image"}
                            onChange={handleChange}
                            value={formData.thumbnail_2}
                        />
                        <Input 
                            label={"Thumbnail"} 
                            name={"thumbnail_3"} 
                            placeholder={"Url image"}
                            onChange={handleChange}
                            value={formData.thumbnail_3}
                        />
                    </div>
                </div>
                <div className="w-full py-20 relative">
                    <Button type="button" className={"absolute left-[77.777%] transform -translate-x-[210%] top-[50%] !border-none -translate-y-[50%] font-medium "}>
                        <NavLink to={"/article"}>
                            Cancel
                        </NavLink>
                    </Button>
                    <Button type="submit" className={"absolute left-[77.777%] transform -translate-x-[100%] top-[50%] -translate-y-[50%] shadow-md !py-1 font-medium text-white bg-blue-500"}>
                        Save
                    </Button>
                </div>
            </form>
        </div>
    ) 
}

export default ArticleAdd