import React, { useState, ChangeEvent } from 'react';

interface Option {
    id: number;
    label: string;
}

const MultiSelectComponent: React.FC = () => {
    const [options, setOptions] = useState<Option[]>([
        { id: 1, label: 'Option 1' },
        { id: 2, label: 'Option 2' },
        { id: 3, label: 'Option 3' },
        // Add more options as needed
    ]);

    const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
    const [newOption, setNewOption] = useState<string>('');

    const handleOptionChange = (optionId: number) => {
        if (selectedOptions.includes(optionId)) {
            setSelectedOptions(selectedOptions.filter(id => id !== optionId));
        } else {
            setSelectedOptions([...selectedOptions, optionId]);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewOption(e.target.value);
    };

    const handleAddOption = () => {
        if (newOption.trim() === '') return;
        const newId = options.length + 1;
        setOptions([...options, { id: newId, label: newOption }]);
        setSelectedOptions([...selectedOptions, newId]);
        setNewOption('');
    };

    return (
        <div>
            <h3>Select and Enter Multiple Options</h3>
            <ul>
                {options.map((option) => (
                    <li key={option.id}>
                        <label>
                            <input
                                type="checkbox"
                                value={option.id}
                                checked={selectedOptions.includes(option.id)}
                                onChange={() => handleOptionChange(option.id)}
                            />
                            {option.label}
                        </label>
                    </li>
                ))}
            </ul>

            <div>
                <input
                    type="text"
                    placeholder="Add a new option"
                    value={newOption}
                    onChange={handleInputChange}
                />
                <button onClick={handleAddOption}>Add</button>
            </div>

            <p>Selected Options: {selectedOptions.join(', ')}</p>
        </div>
    );
};

export default MultiSelectComponent;
