import { useNavigate, useParams } from "react-router-dom";
import Useaxios from "../components/hooks/useaxios";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import {
  Form,
  Formik,
  Field,
  ErrorMessage,
  useFormik,
  resetForm,
} from "formik";
import swal from "sweetalert";
import Headercomponent from "../components/header/HeaderComponent";

const EditRecipe = () => {
  //get the value of the selected the recipe
  const { id } = useParams();

  //navigate for the recepi table
  const navigate = useNavigate();

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

  //validation rules
  const validationSchema = Yup.object({
    recipename: Yup.string().required("Required"),
    ingredients: Yup.string().required("Required"),
    description: Yup.string()
      .required("Required")
      .max(300, "Must be 300 characters or less"),
  });

  //initial the values
  const initialValues = {
    recipename: "",
    ingredients: "",
    description: "",
  };

  const axiosInstance = Useaxios();

  const onSubmit = async (values, { resetForm }) => {
    const { recipename, ingredients, description } = values;

    try {
      await axiosInstance.put("recipe", {
        _id: records._id,
        recipename,
        ingredients,
        description,
      });

      swal({
        title: "Are you sure Update this details?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal("Added Successfully", {
            icon: "success",
            timer: 2000,
          }).then(() => {
            resetForm();
            navigate("/");
          });
        }
      });
    } catch (error) {
      swal("Oops!", "Something went wrong!", error);
    }
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
   
  });

  return (
    <div>
      <div className="container-fluid mb-4">
        <Headercomponent />
      </div>
      <div className="container mt-4">
        <div className="row ">
          <div className="col-md-12">
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col-md-4 text-label">
                  <label className="form-label">Recipe Name</label>
                </div>
                <div className="col-md-8">
                  <input
                    type="text"
                    className="form-control"
                    name="recipename"
                    id="recipename"
                    onChange={formik.handleChange}
                    value={formik.values.recipename}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.recipename && formik.errors.recipename ? (
                    <div className="error">{formik.errors.recipename}</div>
                  ) : null}
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-md-4 text-label">
                  <label className="form-label">Ingredients</label>
                </div>
                <div className="col-md-8">
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      name="ingredients"
                      id="floatingTextarea"
                      onChange={formik.handleChange}
                      value={formik.values.ingredients}
                      onBlur={formik.handleBlur}
                    ></textarea>
                    {formik.touched.ingredients && formik.errors.ingredients ? (
                      <div className="error">{formik.errors.ingredients}</div>
                    ) : null}
                    <label>Type the Ingredients</label>
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-md-4 text-label">
                  <label className="form-label">Description</label>
                </div>
                <div className="col-md-8">
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      id="floatingTextarea"
                      rows="10"
                      name="description"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.description}
                    ></textarea>
                    {formik.touched.description && formik.errors.description ? (
                      <div className="error">{formik.errors.description}</div>
                    ) : null}
                    <label>Type the Drescription</label>
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-md-4"></div>
                <div className="col-md-8 button-label">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    
    </div>
  );
};
export default EditRecipe;
