import { Link } from "react-router-dom";

const Headercomponent =()=>{

  const refreshPage =()=>{

    window.location.reload();
  }


return(



    <nav className="navbar navbar-expand-lg navbar navbar-dark bg-primary">
  <div className="container-fluid">
    <Link  className=" btn btn-secondary navbar-brand" to="/add-recipe">Add Recipe</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
   <Link  className=" btn btn-secondary navbar-brand" to="/">Recipe List</Link>
   <Link  className="navbar-brand btn btn-secondary" onClick={refreshPage}>Refresh Page</Link>
    </div>
  </div>
</nav>
);





};



export default Headercomponent;