import { useState } from "react";
import { categories } from "./Header";

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
                    <i
                        className="icon-arrow-down switch"

                        onClick={() => toggleSubmenu(index)} />
                    {category.subCategory.length > 0 && (
                        renderSubcategories(category.subCategory, index)
                    )}
                </li>
            ))}
        </ul>
    );
};
