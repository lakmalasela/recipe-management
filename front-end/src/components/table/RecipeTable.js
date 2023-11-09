import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Headercomponent from "../header/HeaderComponent";
import Useaxios from "../hooks/useaxios";
import "./table.css";
import swal from "sweetalert";

const RecipeTable = ({ fields, data }) => {
  const axiosInstance = Useaxios();

  const navigate = useNavigate();

  //delete the record
  const DeleteRecord = async (id) => {
    try {
      const response = await axiosInstance.delete(`recipe/${id}`);

      if (response.status == 200) {
        swal({
          title: "Are you sure you want to delete the recipe?",
          dangerMode: true,
          backdrop: false,
          icon: "warning",
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            swal("Deleted!", "Recipe has been deleted!", "success");
            window.location.reload();
          }
        });
      }
    } catch (error) {}
  };

  return (
    <div>
      <div className="container-fluid mb-4">
        <Headercomponent />
      </div>

      <table className="table mt-4">
        <thead>
          <tr>
            {fields.map((field, key) => (
              <th key={key}>{field}</th>
            ))}
            <th className="btn-center">Action</th>
            <th className="btn-center">View Recipe</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((r, index) => (
              <tr key={r.id} className="cursor-pointer">
                <td className="cursor-pointer">{index + 1}</td>
                <td className="cursor-pointer">{r.recipename}</td>
                <td className="cursor-pointer">{r.ingredients}</td>
                <td className="cursor-pointer">{r.description}</td>
                <td>
                  <div className="btn-group btn-center">
                
                    <Link
                      to={`/edit-recipe/${r.id}`}
                      className="btn btn-success btn-shape"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => DeleteRecord(r.id)}
                      className="btn btn-danger btn-left btn-shape"
                    >
                      Delete
                    </button>
                  </div>
                </td>
                <td>
                  {" "}
                  <Link
                    to={`/selected-recipe/${r.id}`}
                    className="btn btn-warning"
                  >
                    Recipe View
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={fields.length + 1}>
                {Array.isArray(data) ? "No data available" : "Loading..."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecipeTable;
