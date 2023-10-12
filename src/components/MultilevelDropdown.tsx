import React, { useState } from 'react';

interface MenuItem {
    label: string;
    subItems?: MenuItem[];
}

const MultilevelDropdown: React.FC<{ menuItems: MenuItem[] }> = ({ menuItems }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="multilevel-dropdown">
            <button onClick={toggleDropdown}>Toggle Dropdown</button>
            {isOpen && (
                <ul className="dropdown-menu">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            {item.label}
                            {item.subItems && item.subItems.length > 0 && (
                                <MultilevelDropdown menuItems={item.subItems} />
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MultilevelDropdown;