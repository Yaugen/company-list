import React from 'react';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Company } from '../types/types';
import CompanyListItem from './CompanyListItem';

interface InfiniteScrollListProps {
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  items: Company[];
  loadNextPage: (startIndex: number, stopIndex: number) => Promise<any> | null;
}

const InfiniteScrollList = React.forwardRef<
  InfiniteLoader,
  InfiniteScrollListProps
>(function List(
  { hasNextPage, isNextPageLoading, items, loadNextPage },
  listRef
) {
  const itemCount = hasNextPage ? items.length + 1 : items.length;
  const loadMoreItems = (startIndex: number, stopIndex: number) => {
    // console.log('infinteScroll load more items', isNextPageLoading);
    // if (isNextPageLoading) {
    //   return null;
    // }
    return loadNextPage(startIndex, stopIndex);
  };
  const isItemLoaded = (index: number) => !hasNextPage || index < items.length;

  const itemKeyGetter = React.useCallback((index, data) => {
    const item = data[index];
    if (!item) {
      return 'loading';
    }
    return item.id;
  }, []);

  return (
    <AutoSizer>
      {({ width, height }) => (
        <InfiniteLoader
          ref={listRef}
          isItemLoaded={isItemLoaded}
          itemCount={itemCount}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <FixedSizeList<Company[]>
              height={height}
              width={width}
              itemCount={itemCount}
              itemSize={120}
              onItemsRendered={onItemsRendered}
              ref={ref}
              itemData={items}
              itemKey={itemKeyGetter}
            >
              {CompanyListItem}
            </FixedSizeList>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  );
});

export default InfiniteScrollList;
