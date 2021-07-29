import React from 'react';
import InfiniteLoader from 'react-window-infinite-loader';
import { Company } from '../types/types';
import { buildCompanyUrl } from '../utils/buildCompanyUrl';
import InfiniteScrollList from './InfiniteScrollList';

interface CompanyListProps {
  search: string;
  categories: string[];
}

const CompanyList: React.FC<CompanyListProps> = ({ search, categories }) => {
  const [items, setItems] = React.useState<Company[]>([]);
  const [hasNextPage, setHasNextPage] = React.useState(true);
  const [isNextPageLoading, setIsNextPageLoading] = React.useState(false);
  const listRef = React.useRef<InfiniteLoader>(null);

  const loadCompanies = async (startIndex: number) => {
    setIsNextPageLoading(true);

    const reqUrl = buildCompanyUrl(startIndex, search, categories);
    const response = await fetch(reqUrl);
    const { hasNext, companies } = await response.json();

    if (startIndex === 0) {
      setItems(companies);
    } else {
      setItems([...items, ...companies] as Company[]);
    }

    setHasNextPage(!!hasNext);
    setIsNextPageLoading(false);
  };

  const loadNextPage = async (startIndex: number) => {
    console.log('load next page');
    await loadCompanies(startIndex);
  };

  React.useEffect(() => {
    if (listRef && listRef.current) {
      console.log('reset');
      listRef.current.resetloadMoreItemsCache();
      // @ts-ignore
      listRef.current._listRef.scrollTo(0);
    }
    loadCompanies(0);
  }, [search, categories]);

  return (
    <InfiniteScrollList
      items={items}
      hasNextPage={hasNextPage}
      isNextPageLoading={isNextPageLoading}
      loadNextPage={loadNextPage}
      ref={listRef}
    />
  );
};

export default CompanyList;
