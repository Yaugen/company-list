export const buildCompanyUrl = (
  skip: number,
  search: string | null,
  categories: string[] | null
) => {
  const params = [];

  if (skip) {
    params.push(`skip=${skip}`);
  }

  if (search) {
    params.push(`search=${encodeURIComponent(search)}`);
  }

  if (categories && categories.length) {
    const categoriesStr = categories
      .map((c) => encodeURIComponent(c))
      .join(',');
    params.push(`categories=${categoriesStr}`);
  }

  return `/api/companies?${params.join('&')}`;
};
