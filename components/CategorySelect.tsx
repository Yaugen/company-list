import React from 'react';
import Multiselect from 'multiselect-react-dropdown';

type Category = { name: string; id: string };

interface CategorySelectProps {
  onChange: (categories: string[]) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ onChange }) => {
  const [loading, setLoading] = React.useState(false);
  const [categories, setCategories] = React.useState<Category[]>([]);

  const fetchCategories = async () => {
    setLoading(true);

    const response = await fetch('/api/categories');
    const data = await response.json();
    setCategories(
      data.categories.map((item: string) => ({ name: item, id: item }))
    );

    setLoading(false);
  };

  React.useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (selectedList: Category[]) => {
    onChange(selectedList.map((item) => item.id));
  };

  return (
    <Multiselect
      options={categories}
      selectedValues={[]}
      onSelect={handleChange}
      onRemove={handleChange}
      displayValue="name"
      avoidHighlightFirstOption={true}
      // @ts-ignore
      loading={loading}
    />
  );
};

export default CategorySelect;
