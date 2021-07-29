import { NextApiRequest, NextApiResponse } from 'next';
import mock from '../../data/mock.json';

type Data = {
  categories: string[];
};

const categories = Array.from(new Set(mock.flatMap((item) => item.categories)));

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ categories });
}
