import { NavLink } from "react-router-dom";
import { Input, Combobox, Button, Textearea } from '../../components'
import icon from '../../util/icon';

const { MdChevronRight } = icon

const ArticleAdd = () => {
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
            <form className="w-full px-[30px] bg-white mt-8" method="POST">
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
                        <Input label={"Subject"} name={"subject"}/>
                        <Textearea row={5} label={"Content"} name={"content"}/>
                        <Combobox data={status} label={"Status"} name={"status"}/>
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
                        <Input label={"Thumbnail main"} name={"thumbnail_main"} placeholder={"Url image"}/>
                        <Input label={"Thumbnail"} name={"thumbnail_1"} placeholder={"Url image"}/>
                        <Input label={"Thumbnail"} name={"thumbnail_2"} placeholder={"Url image"}/>
                        <Input label={"Thumbnail"} name={"thumbnail_3"} placeholder={"Url image"}/>
                    </div>
                </div>
                <div className="w-full py-20 relative">
                    <Button type="button" className={"absolute left-[77.777%] transform -translate-x-[210%] top-[50%] !border-none -translate-y-[50%] font-medium "}>
                        <NavLink to={"/user"}>
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