import React from 'react';

interface SearchProps {
  onChange: (search: string) => void;
}

const Search: React.FC<SearchProps> = ({ onChange }) => {
  const [value, setValue] = React.useState('');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <input
      className="w-full h-10 text-lg border-solid border border-gray-200 rounded px-3"
      placeholder="Search..."
      type="text"
      value={value}
      onChange={handleChange}
    />
  );
};

export default Search;
