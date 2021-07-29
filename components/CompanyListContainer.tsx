import React from 'react';
import CategorySelect from './CategorySelect';
import CompanyList from './CompanyList';
import Search from './Search';

const CompanyListContainer = () => {
  const [categories, setCategories] = React.useState<string[]>([]);
  const [search, setSearch] = React.useState('');

  return (
    <div className="h-screen flex flex-col">
      <div className="flex items-start">
        <div className="flex-1 p-4">
          <Search onChange={setSearch} />
        </div>
        <div className="flex-1 p-4">
          <CategorySelect onChange={setCategories} />
        </div>
      </div>
      <div className="flex-1">
        <CompanyList search={search} categories={categories} />
      </div>
    </div>
  );
};

export default CompanyListContainer;
