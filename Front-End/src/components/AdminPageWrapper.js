import "../App.css";

function AdminPageWrapper(props) {
  return (
    <div className="admin-wrapper align-item-center d-flex justify-content-center">
      <div className="row justify-content-center align-items-center admin-form-wrapper">
        <div className="col-lg-9 admin-content-wrapper text-center">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default AdminPageWrapper;
