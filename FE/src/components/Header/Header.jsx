import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAll } from "../../api/category";

function Header() {
    const [categories, setCategories] = useState([])
    // const [currentCategory, setCurrentCategory] = useState({})
    useEffect(() => {
        (async () => {
            const res = await getAll()
            setCategories(res)
        })()
    }, [])
    return (
        <div className="h-[60px] w-full border-b-[1px] p-4 border-[rgba(0,0,0,0.1)] flex items-center gap-5">
            <h1 className="text-4xl block px-2 py-1 border-[1px] border-[rgba(0,0,0,1) rounded-md">Đ</h1>
            <div className="flex-1">
                <ul className="flex items-center gap-3">
                    <li>
                        <Link to={'/'}>Trang chủ</Link>
                    </li>
                    {categories.map((category, index) => {
                        if (category.name.toLowerCase() !== 'Default Category'.toLowerCase()) {
                            return (
                                <li key={index}>
                                    <Link to={'/' + category.slug}>{category.name}</Link>
                                </li>
                            )
                        }
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Header;