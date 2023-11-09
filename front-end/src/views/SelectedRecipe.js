import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Useaxios from "../components/hooks/useaxios";
import { useFormik } from "formik";
import Headercomponent from "../components/header/HeaderComponent";

const SelectedRecipe = () => {
  //get the value of the selected the recipe
  const { id } = useParams();

  //navigate for the recepi table
  const navigate = useNavigate();

  const axiosInstance = Useaxios();

  const [records, setRecords] = useState({});
  const loadData = async () => {
    try {
      const { data } = await axiosInstance.get(`recipe/${id}`);
      setRecords(data);

      formik.setValues({
        recipename: data.recipename,
        ingredients: data.ingredients,
        description: data.description,
      });
    } catch (error) {}
  };

  //call the selected value
  useEffect(() => {
    loadData();
  }, []);

  //initial the values
  const initialValues = {
    recipename: "",
    ingredients: "",
    description: "",
  };

  const formik = useFormik({
    initialValues,
  });

  return (
    <div>
      <div className="container-fluid">
        <Headercomponent></Headercomponent>
      </div>

      <div className="container mt-4">
        <div className="card">
          <div className="card-header">Recipe Name: <b>{formik.values.recipename} </b></div>
          <div className="card-body">
            <blockquote className="blockquote mb-0">
              <p>Ingredients Of the Recipe : {formik.values.ingredients}</p>
              <footer className=""> Description :
                 <cite title="Source Title"> {formik.values.description}</cite>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SelectedRecipe;
