export interface ISearchResult {
  code: string;
  product: IProduct;
  status: number;
  status_verbose: string;
}

// Partial interface to be reviewed
export interface IProduct {
  image_url: string;
  product_name: string;
  brands: string;
  ingredients_text: string;
  nutrient_levels: string[];
  nutriments: string[];
}