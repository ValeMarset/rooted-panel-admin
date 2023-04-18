import Spinner from "react-bootstrap/Spinner";

function Loader() {
  return (
    <div className="container d-flex justify-content-center">
      <Spinner animation="border" role="status" variant="success">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default Loader;
