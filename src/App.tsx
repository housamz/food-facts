import { useState } from "react";
import SearchBar from "./components/SearchBar";
import BarcodeScanner from "./components/BarcodeScanner";
import FoodFacts from "./components/FoodFacts";
import { fetchFoodData } from "./data/api";
import { IProduct, ISearchResult } from "./models/search-result.interface";

const App = () => {
  const [foodData, setFoodData] = useState<IProduct>({} as IProduct);
  const [showScanner, setSHowScanner] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async (query: string) => {
    const data = (await fetchFoodData(query)) as ISearchResult;
    if (data.product) {
      setFoodData(data.product);
    } else {
      setNotFound(true);
    }
  };

  return (
    <div className="container mx-auto p-4 w-128">
      <h1 className="text-3xl font-bold mb-4 text-center">Food Facts</h1>
      <SearchBar
        onSearch={handleSearch}
        startScan={showScanner}
        setStartScan={setSHowScanner}
        setNotFound={setNotFound}
      />
      {showScanner ? (
        <BarcodeScanner
          setStartScan={setSHowScanner}
          handleSearch={handleSearch}
        />
      ) : notFound ? (
        <p>Product not found</p>
      ) : (
        foodData.product_name &&
        <FoodFacts data={foodData} />
      )}
    </div>
  );
};

export default App;
