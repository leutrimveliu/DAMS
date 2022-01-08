import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { addAsset } from "../../../api/assets";
import { useHistory, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import { getCategories, getStatus } from "../../../api/filter";
import { useSelector } from "react-redux";
import "./AddAsset.scss";

function AddAsset() {
  const history = useHistory();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [errMessage, setErrMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [searchCategories, setSearchCategories] = useState([]);
  const [status, setStatus] = useState([]);
  const { register, handleSubmit, errors } = useForm();
  
  const getCategoriesList = async () => {
    const response = await getCategories();
    setSearchCategories(response);
    console.log(response);
  };
  const getStatusList = async () => {
    const response = await getStatus();
    setStatus(response);
  };
  
  const onSubmit = async (data, e) => {
    const registerData = {
      // assetNr: data.assetNr,
      // assetOldNr: data.assetOldNr,
      assetCode:data.assetCode,
      assetCategory: data.assetCategory,
      assetDescription: data.assetDescription,
      assetModel: data.assetModel,
      assetSerialNo: data.assetSerialNo,
      assetSupplier: data.assetSupplier,
      price: data.price,
      deliveryDate: data.deliveryDate,
      donorName: data.donorName,
      projectName: data.projectName,
      assetLocation: data.assetLocation,
      roomNo: data.roomNo,
      assetHolder: data.assetHolder,
      assetAvailability:data.assetAvailability,
      user_id: currentUser.user._id,
    };
    
    try {
      const response = await addAsset(registerData);
      console.log("Form has been submitted");
      setErrMessage(response.errMessage);
      setSuccessMessage(response.successMessage);
      e.target.reset();
      setTimeout(() => {
        history.push("/manager");
      }, 2000);
    } catch (e) { console.log("Form has not been submitted");}
  };
  useEffect(() => {
    getStatusList();
    getCategoriesList();
  }, [currentUser]);
  if (!currentUser) {
    return <Redirect to={"/"} />;
  }
  const todayDate = format(new Date(), "yyyy-MM-dd");
  return (
    <>
      {/* <CompanyDashboard /> */}
      <div className="create__event ">
        <div className="event__container">
          <h1>Regjistro një pajisje në sistem</h1>
        </div>
        <div className="event__container">
          {errMessage && <Alert severity="error">{errMessage}</Alert>}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
        </div>
        <div className="event__container">
          <Form
            className="event__form col-md-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Row>
              <Col className="col-12 col-md-6">
              <Form.Group controlId="assetCode">
                  <Form.Label>Tag no.</Form.Label>
                  <Form.Control
                  id="assetCode"
                    name="assetCode"
                    placeholder="Tag no..."
                    type="number"
                    ref={register({ required: true,      
               
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Only Numbers",
                        }, })}
                  ></Form.Control>

                    <p style={{ color: "red" }}>
                      &#8203;
                      {errors.assetCode && errors.assetCode.type === "required" && (
                        <span>This field is required!</span>
                      )}
                    </p>
                </Form.Group>
               
              <Form.Group controlId="assetCategory">
                  <Form.Label>Kategoria e pajisjes</Form.Label>
                  <Form.Control
                    name="assetCategory"
                    as="select"
                    ref={register({
                      required: true,
                      validate: (value) => value !== "Pick a Category",
                    })}
                  >
                    <option>Pick a Category</option>
                    {searchCategories.map((categories) => (
                      <option name="categories" value={categories._id}>
                        {" "}
                        {categories.assetCategory}
                      </option>
                    ))}
                  </Form.Control>
                  <p style={{ color: "red" }}>
                    &#8203;
                    {errors.assetCategory &&
                      errors.assetCategory.type === "validate" && (
                        <span>
                          This field is required, select one of the Categories!
                        </span>
                      )}
                  </p>
                </Form.Group>
               
                <Form.Group controlId="assetDescription">
                  <Form.Label>Pershkrimi i pajisjes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    id="assetDescription"
                    name="assetDescription"
                    placeholder="Pershkrimi i pajisjes..."
                    ref={register({
                      required: true,
                      minLength: 5,
                      maxLength: 1200,
                    })}
                  />
                  <p style={{ color: "red" }}>
                    &#8203;
                    {errors.assetDescription &&
                      errors.assetDescription.type === "required" && (
                        <span>This field is required!</span>
                      )}
                    {errors.assetDescription &&
                      errors.assetDescription.type === "minLength" && (
                        <span>
                          This field requires minimum length of 5 characters!
                        </span>
                      )}
                    {errors.assetDescription &&
                      errors.assetDescription.type === "maxLength" && (
                        <span>
                          This field has limit of maximum of 1200 characters!
                        </span>
                      )}
                  </p>
                </Form.Group>
              
              <Form.Group controlId="assetModel">
                  <Form.Label>Modeli i pajisjes</Form.Label>
                  <Form.Control
                    name="assetModel"
                    id="assetModel"
                    type="text"
                    placeholder="Modeli i pajisjess..."
                    ref={register({ required: true, minLength: 3 })}
                  />
                  <p style={{ color: "red" }}>
                    &#8203;
                    {errors.assetModel &&
                      errors.assetModel.type === "required" && (
                        <span>This field is required!</span>
                      )}
                  </p>
                </Form.Group>

                <Form.Group controlId="assetSerialNo">
                  <Form.Label>Serial No.</Form.Label>
                  <Form.Control
                    name="assetSerialNo"
                    id="assetSerialNo"
                    placeholder="Serial No...."
                    type="text"
                    ref={register({ required: true, minLength: 3 })}
                  ></Form.Control>

                    <p style={{ color: "red" }}>
                      &#8203;
                      {errors.assetSerialNo && errors.assetSerialNo.type === "required" && (
                        <span>This field is required!</span>
                      )}
                    </p>
                </Form.Group>

                <Form.Group controlId="assetSupplier">
                  <Form.Label>Furnitori i pajisjes</Form.Label>
                  <Form.Control
                    name="assetSupplier"
                    id="assetSupplier"
                    type="text"
                    placeholder="Furnitori i pajisjes..."
                    ref={register({ required: true })}
                  />
                  <p style={{ color: "red" }}>
                    &#8203;
                    {errors.assetSupplier &&
                      errors.assetSupplier.type === "required" && (
                        <span>This field is required!</span>
                      )}
                  </p>
                </Form.Group>
                
                <Form.Group controlId="price">
                  <Form.Label>Cmimi i pajisjes</Form.Label>
                  <Form.Control
                  id="price"
                    name="price"
                    placeholder="Cmimi i pajisjes..."
                    type="number"
                    ref={register({ required: true,      
               
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Only Numbers",
                        }, })}
                  ></Form.Control>

                    <p style={{ color: "red" }}>
                      &#8203;
                      {errors.price && errors.price.type === "required" && (
                        <span>This field is required!</span>
                      )}
                    </p>
                </Form.Group>
                </Col>
              <Col className="col-12 col-md-6">

                <Form.Group controlId="deliveryDate">
                  <Form.Label>Data e pranimit</Form.Label>
                  <Form.Control
                    name="deliveryDate"
                    type="date"
                    id="deliveryDate"
                    id="deliveryDate"
                    ref={register({
                      required: true,
                      validate: (value) => value <= todayDate,
                    })}
                  />
                  <p style={{ color: "red" }}>
                    &#8203;
                    {errors.deliveryDate &&
                      errors.deliveryDate.type === "required" && (
                        <span>This field is required!</span>
                      )}
                    {errors.deliveryDate &&
                      errors.deliveryDate.type === "validate" && (
                        <span>
                          Starting date cant be earlier than tomorrow!
                        </span>
                      )}
                  </p>
                </Form.Group>
                
                <Form.Group controlId="donorName">
                <Form.Label >Donatori</Form.Label>
                  <Form.Control
                    name="donorName"
                    type="text"
                    id="donorName"
                    placeholder="Donatori..."
                    ref={register({ required: true })}
                  />
                  <p style={{ color: "red" }}>
                    &#8203;
                    {errors.donorName &&
                      errors.donorName.type === "required" && (
                        <span>This field is required!</span>
                      )}
                  </p>

                </Form.Group>
                <Form.Group controlId="projectName">
                <Form.Label >Projekti</Form.Label>
                  <Form.Control
                    name="projectName"
                    id="projectName"
                    type="text"
                    placeholder="Projekti..."
                    ref={register({ required: true })}
                  />
                  <p style={{ color: "red" }}>
                    &#8203;
                    {errors.projectName &&
                      errors.projectName.type === "required" && (
                        <span>This field is required!</span>
                      )}
                  </p>

                </Form.Group>
                <Form.Group controlId="assetLocation">
                <Form.Label >Lokacioni i pajisjes</Form.Label>
                  <Form.Control
                    name="assetLocation"
                    id="assetLocation"
                    type="text"
                    placeholder="Lokacioni i pajisjes..."
                    ref={register({ required: true })}
                  />
                  <p style={{ color: "red" }}>
                    &#8203;
                    {errors.assetLocation &&
                      errors.assetLocation.type === "required" && (
                        <span>This field is required!</span>
                      )}
                  </p>

                </Form.Group>
                <Form.Group controlId="roomNo">
                  <Form.Label>Nr. dhomes</Form.Label>
                  <Form.Control
                    name="roomNo"
                    id="roomNo"
                    placeholder="Nr. dhomes..."
                    type="text"
                    ref={register({ required: true, minLength: 1 })}
                  ></Form.Control>

                    <p style={{ color: "red" }}>
                      &#8203;
                      {errors.roomNo && errors.roomNo.type === "required" && (
                        <span>This field is required!</span>
                      )}
                    </p>
                </Form.Group>
                <Form.Group controlId="assetHolder">
                <Form.Label >Mbajtesi i pajisjes</Form.Label>
                  <Form.Control
                    name="assetHolder"
                    id="assetHolder"
                    type="text"
                    placeholder="Mbajtesi i pajisjes..."
                    ref={register({ required: true })}
                  />
                  <p style={{ color: "red" }}>
                    &#8203;
                    {errors.assetHolder &&
                      errors.assetHolder.type === "required" && (
                        <span>This field is required!</span>
                      )}
                  </p>

                </Form.Group>
                <Form.Group controlId="assetAvailability">
                  <Form.Label>Statusi i pajisjes</Form.Label>
                  <Form.Control
                    name="assetAvailability"
                    as="select"
                    ref={register({
                      required: true,
                      validate: (value) => value !== "Asset state",
                    })}
                  >
                    <option>Asset state</option>
                    {status.map((stateStatus) => (
                      <option value={stateStatus}>{stateStatus}</option>
                    ))}
                  </Form.Control>
                  <p style={{ color: "red" }}>
                    &#8203;
                    {errors.assetAvailability &&
                      errors.assetAvailability.type === "validate" && (
                        <span>
                          This field is required, select one of the states!
                        </span>
                      )}
                  </p>
                </Form.Group>
                
              </Col>

              <Col className="col-12 col-md-6">
                <Button
                  className="create__form--submit btn-lg font-weight-bold" 
                  variant="primary"
                  type="submit"
                >
                  Shto 
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddAsset;
