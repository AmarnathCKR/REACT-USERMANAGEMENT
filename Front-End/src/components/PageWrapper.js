import "../App.css";

function PageWrapper(props) {
  
  return (
    <div className="body-wrapper align-item-center d-flex justify-content-center">
      <div className="row justify-content-center align-items-center form-wrapper">
        <div className="col-lg-9 form-content-wrapper text-center">
        {props.children}
        </div>
      </div>
    </div>
  );
}

export default PageWrapper;
