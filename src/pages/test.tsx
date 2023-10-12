import MultilevelDropdown from '../components/MultilevelDropdown';

export default function test() {
    const menuItems = [
        {
            label: 'Item 1',
            subItems: [
                {
                    label: 'Subitem 1.1',
                    subItems: [
                        {
                            label: 'Sub-subitem 1.1.1',
                        },
                        {
                            label: 'Sub-subitem 1.1.2',
                        },
                    ],
                },
                {
                    label: 'Subitem 1.2',
                },
            ],
        },
        {
            label: 'Item 2',
            subItems: [
                {
                    label: 'Subitem 2.1',
                },
                {
                    label: 'Subitem 2.2',
                },
            ],
        },
    ];

    return (
        <div className="App">
            <h1>Multilevel Dropdown Menu</h1>
            <MultilevelDropdown menuItems={menuItems} />
        </div>
    );
}
