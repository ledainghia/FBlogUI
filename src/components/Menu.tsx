import { useState } from "react";
import { categories, pages } from './Header';
import { Link } from "react-router-dom";

export const MenuPage: React.FC<{ pages: pages[]; }> = ({ pages }) => {
    const [openSubPages, setOpenSubPages] = useState<number[]>([]);

    const toggleSubPage = (index: number) => {
        if (openSubPages.includes(index)) {
            setOpenSubPages(openSubPages.filter((item) => item !== index));
        } else {
            setOpenSubPages([...openSubPages, index]);
        }
    };

    const renderSubPages = (subPages: pages[], parentIndex: number) => {
        return (
            <ul className={`${openSubPages.includes(parentIndex) ? 'submenu' : ''}`} style={{ display: openSubPages.includes(parentIndex) ? 'block' : 'none' }}>
                {subPages.map((subPages) => (
                    <li key={subPages.id} className={` ${openSubPages.includes(subPages.id) ? 'openmenu' : ''}`}>
                        <Link to={subPages.url}>{subPages.id}</Link>

                        {subPages.subPages.length > 0 && (
                            <>
                                {console.log(subPages.subPages.length)}
                                <i
                                    className="icon-arrow-down switch"
                                    style={{
                                        transform: openSubPages.includes(subPages.id) ? 'rotate(180deg)' : 'none',
                                        transition: 'transform 0.2s ease' // Thêm thuộc tính transition
                                    }}
                                    onClick={() => toggleSubPage(subPages.id)} />
                                {renderSubPages(subPages.subPages, subPages.id)}

                            </>
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <ul className='submenu' style={{ display: 'block' }}>
            {pages.map((pages, index) => (
                <li key={pages.id} className={` ${openSubPages.includes(index) ? 'openmenu' : ''}`}>
                    <Link to={pages.url}>{pages.name}</Link>
                    {pages.subPages.length > 0 &&
                        <i
                            className="icon-arrow-down switch"

                            onClick={() => toggleSubPage(index)} />
                    }
                </li>
            ))}
        </ul>
    );
};

export const HeaderPageMenu: React.FC<{ pages: pages[]; }> = ({ pages }) => {
    const [openSubPages, setOpenSubPages] = useState<number[]>([]);

    const toggleSubPage = (index: number) => {
        if (openSubPages.includes(index)) {
            setOpenSubPages(openSubPages.filter((item) => item !== index));
        } else {
            setOpenSubPages([...openSubPages, index]);
        }
    };

    const renderSubPages = (subPages: pages[], parentIndex: number) => {
        return (
            <ul className={`${openSubPages.includes(parentIndex) ? 'submenu' : ''}`} style={{ display: openSubPages.includes(parentIndex) ? 'block' : 'none' }}>
                {subPages.map((subPages) => (
                    <li key={subPages.id} className={` ${openSubPages.includes(subPages.id) ? 'openmenu' : ''}`}>
                        <Link to={subPages.url}>{subPages.id}</Link>

                        {subPages.subPages.length > 0 && (
                            <>
                                {console.log(subPages.subPages.length)}
                                <i
                                    className="icon-arrow-down switch"
                                    style={{
                                        transform: openSubPages.includes(subPages.id) ? 'rotate(180deg)' : 'none',
                                        transition: 'transform 0.2s ease' // Thêm thuộc tính transition
                                    }}
                                    onClick={() => toggleSubPage(subPages.id)} />
                                {renderSubPages(subPages.subPages, subPages.id)}

                            </>
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <>
            <Link className="nav-link dropdown-toggle" to={"/"}>Homes</Link>
            <ul className='dropdown-menu'>
                {pages.map((page, index) => (
                    <li key={index}>
                        <Link to={page.url} className="dropdown-item">
                            {page.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export const Menu: React.FC<{ categories: categories[]; }> = ({ categories }) => {
    const [openSubmenus, setOpenSubmenus] = useState<number[]>([]);

    const toggleSubmenu = (index: number) => {
        if (openSubmenus.includes(index)) {
            setOpenSubmenus(openSubmenus.filter((item) => item !== index));
        } else {
            setOpenSubmenus([...openSubmenus, index]);
        }
    };

    const renderSubcategories = (subCategories: categories[], parentIndex: number) => {
        return (
            <ul className={`${openSubmenus.includes(parentIndex) ? 'submenu' : ''}`} style={{ display: openSubmenus.includes(parentIndex) ? 'block' : 'none' }}>
                {subCategories.map((subCategory) => (
                    <li key={subCategory.categoryId} className={` ${openSubmenus.includes(subCategory.categoryId) ? 'openmenu' : 'openmenu'}`}>
                        <a href="#">{subCategory.categoryName}</a>

                        {subCategory.subCategory.length > 0 && (
                            <>
                                <i
                                    className="icon-arrow-down switch"
                                    style={{
                                        transform: openSubmenus.includes(subCategory.categoryId) ? 'rotate(180deg)' : 'none',
                                        transition: 'transform 0.2s ease' // Thêm thuộc tính transition
                                    }}
                                    onClick={() => toggleSubmenu(subCategory.categoryId)} />
                                {renderSubcategories(subCategory.subCategory, subCategory.categoryId)}
                                {console.log(openSubmenus, " ", subCategory.categoryId)}
                            </>
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <ul className='submenu' style={{ display: 'block' }}>
            {categories.map((category, index) => (
                <li key={category.categoryId} className={` ${openSubmenus.includes(index) ? 'openmenu' : ''}`}>
                    <a href="#">{category.categoryName}</a>
                    {category.subCategory.length > 0 && (
                        <>
                            <i
                                className="icon-arrow-down switch"

                                onClick={() => toggleSubmenu(index)} />

                            {renderSubcategories(category.subCategory, index)}
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
};
