const BASE_URL = 'https://world.openfoodfacts.org/api/v0/product/';

export const fetchFoodData = async (barcode) => {
  const response = await fetch(`${BASE_URL}${barcode}.json`);
  const data = await response.json();
  return data;
};
