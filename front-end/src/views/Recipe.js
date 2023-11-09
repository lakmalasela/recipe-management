import { useEffect, useState } from "react";
import Useaxios from "../components/hooks/useaxios";
import RecipeTable from "../components/table/RecipeTable";

const Recipe = () => {
  //table fields
  const tableFields = ["Id", "Recipe Name", "Ingredients", "Description"];
 

  const [records, setRecords] = useState({});
  const loadData = async () => {
    const { data } = await axiosInstance.get("recipe");
    setRecords(data);
  };

  //when mount records are set
  const axiosInstance = Useaxios();
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <RecipeTable fields={tableFields} data={records}></RecipeTable>
        </div>
      </div>
    </div>
  );
};
export default Recipe;
