import React, { useState } from 'react';

interface Category {
    categoryId: number;
    categoryName: string;
    parentCategoryId: number | null;
    subCategory: Category[];
}

interface Props {
    categories: Category[];
}

const CategoryDropdown: React.FC<Props> = ({ categories }) => {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    return (
        <>
            <a className="nav-link dropdown-toggle" href="index.html">
                Category
            </a>
            <ul className="dropdown-menu show">
                {categories.map((category) => (
                    <li
                        key={category.categoryId}
                        onMouseEnter={() => setSelectedCategory(category)}
                        onMouseLeave={() => setSelectedCategory(null)}
                    >
                        <a href="" className="dropdown-item">
                            {category.categoryName} &gt;
                        </a>
                        {selectedCategory === category && category.subCategory.length > 0 && (
                            <ul
                                className={
                                    category.subCategory.length > 9
                                        ? 'dropdown-menu-left dropdown-submenu with-scroll'
                                        : 'dropdown-menu-left dropdown-submenu'
                                }
                            >
                                {category.subCategory.map((subCategory) => (
                                    <li key={subCategory.categoryId}>
                                        <a href="" className="dropdown-item">
                                            {subCategory.categoryName}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default CategoryDropdown;