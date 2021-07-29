import type { NextApiRequest, NextApiResponse } from 'next';
import { Company } from '../../types/types';
import mock from '../../data/mock.json';

const filterCompanies = (
  search: string | null,
  categories: string[] | null
): Company[] => {
  let comapnies: Company[] = mock;

  if (search) {
    const searchTerm = search.toLowerCase();
    comapnies = comapnies.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
  }

  if (categories) {
    comapnies = comapnies.filter((item) =>
      item.categories.some((c) => categories.includes(c))
    );
  }

  return comapnies;
};

type Params = {
  skip: number;
  take: number;
  search: string | null;
  categories: string[] | null;
};

const parseQuery = (query: any): Params => {
  const params = {
    skip: 0,
    take: 20,
    search: null,
    categories: null,
  };

  if (query.skip && !Number.isNaN(Number(query.skip))) {
    params.skip = Number(query.skip);
  }

  if (query.take && !Number.isNaN(Number(query.take))) {
    params.take = Number(query.take);
  }

  if (query.search) {
    params.search = query.search;
  }

  if (query.categories) {
    params.categories = query.categories.split(',');
  }

  return params;
};

type Data = {
  companies: Company[];
  hasNext: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { skip, take, search, categories } = parseQuery(req.query);

  let companies = filterCompanies(search, categories);
  const hasNext = companies.length > skip + take;
  companies = companies.slice(skip, skip + take);

  res.status(200).json({ companies, hasNext });
}
