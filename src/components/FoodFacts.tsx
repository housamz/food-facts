import React from "react";
import { IProduct } from "../models/search-result.interface";

const FoodFacts = ({ data }: { data: IProduct }) => {
  if (!data) return null;

  const nutrientColor: { [key: string]: string } = {
    high: "text-red-500",
    moderate: "text-yellow-500",
    low: "text-green-500",
  } as { [key: string]: string };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{data.product_name}</h2>
      <img src={data.image_url} alt={data.product_name} />
      <p>
        <strong>Brand:</strong> {data.brands}
      </p>
      <p>
        <strong>Ingredients:</strong> {data.ingredients_text}
      </p>
      <p>
        <strong>Nutriments:</strong>
      </p>
      <p>
        <strong>Nutrient Levels:</strong>
      </p>
      <ul>
        {data.nutrient_levels &&
          Object.entries(data.nutrient_levels).map(([key, value]) => (
            <li key={key} className={nutrientColor[value as string]}>
              <strong>{key.replace("-", " ")}:</strong> {value as string}
            </li>
          ))}
      </ul>
      <ul>
        {data.nutriments &&
          Object.entries(data.nutriments).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value as React.ReactNode}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FoodFacts;
