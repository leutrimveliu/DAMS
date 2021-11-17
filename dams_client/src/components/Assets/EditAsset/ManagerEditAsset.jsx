import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {  getAsset } from "../../../api/assets";
import { editAsset} from "../../../api/editAsset";
import { useHistory, Redirect, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import "./style.scss";

function EditAsset() {
    const history = useHistory();
    let { id } = useParams();
    const { user: currentUser } = useSelector((state) => state.auth);
    const [showEditForm, setShowEditForm] = useState(false);
    const [errMessage, setErrMessage] = useState(false);
    const [assetDetails, setAssetDetails] = useState({});
    const [successMessage, setSuccessMessage] = useState(false);
    const getAssetFields = async () => {
      const response = await getAsset(id);
      setAssetDetails((oldDetails) => ({
        ...oldDetails,
        assetNr: response.assetNr,
        assetCategory: response.assetCategory,
        assetDescription: response.assetDescription,
        assetModel: response.assetModel,
        assetSerialNo: response.assetSerialNo,
        assetSupplier: response.assetSupplier,
        price: response.price,
        deliveryDate: response.deliveryDate,
        donorName: response.donorName,
        projectName: response.projectName,
        assetLocation: response.assetLocation,
        roomNo: response.roomNo,
        assetHolder: response.assetHolder,
      
    }));
    setShowEditForm(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssetDetails({ ...assetDetails, [name]: value });
  };
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data,e) => {
    const registerData = {
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
        user_id: currentUser.user._id,
      };
    try {
      await editAsset(registerData, id);
      setTimeout(() => {
        history.push("/manager");
      }, 1000);
    } catch (e) {}
  };
  useEffect(() => {
    getAssetFields();
    console.log(assetDetails)
  }, [currentUser]);
  if (!currentUser) {
    return <Redirect to={"/"} />;
  }
  // const todayDate = format(new Date(), "yyyy-MM-dd");
  const todayDate = format(new Date(), "yyyy-MM-dd");
  return (
    <>
      <div className="form--createevent">
        <div className="form__title d-flex justify-content-center mb-5 mt-5 ">
          <h1>Edit an Asset</h1>
        </div>
        <div className="d-flex justify-content-center mb-5 mt-5">
          <Form
            className="event-form col-md-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Row>
              <Col className="col-12 col-md-6">
             
                <Form.Group controlId="assetCategory">
                  <Form.Label>Asset Category</Form.Label>
                  <Form.Control
                    name="assetCategory"
                    type="text"
                    onChange={handleChange}
                    defaultValue={assetDetails.assetCategory}
                    placeholder="Asset Category..."
                    ref={register({ required: true,      
                    })}
                  />
                    
               
                    <p style={{ color: "rdelied" }}>
                      &#8203;
                      {errors.assetCategory && errors.assetCategory.type === "required" && (
                        <span>This field is required!</span>
                      )}
                    </p>
                </Form.Group>
                <Form.Group controlId="assetDescription">
                  <Form.Label>Asset Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    onChange={handleChange}
                    defaultValue={assetDetails.assetDescription}
                    name="assetDescription"
                    placeholder="Asset Description..."
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
                  <Form.Label>Asset Model</Form.Label>
                  <Form.Control
                    name="assetModel"
                    onChange={handleChange}
                    defaultValue={assetDetails.assetModel}
                    type="text"
                    placeholder="Asset Model..."
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
                  <Form.Label>Asset Serial No.</Form.Label>
                  <Form.Control
                    name="assetSerialNo"
                    onChange={handleChange}
                    defaultValue={assetDetails.assetSerialNo}
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
                  <Form.Label>Asset Supplier</Form.Label>
                  <Form.Control
                    name="assetSupplier"
                    onChange={handleChange}
                    defaultValue={assetDetails.assetSupplier}
                    type="text"
                    placeholder="Asset Supplier..."
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
                  <Form.Label>Asset Price</Form.Label>
                  <Form.Control
                  id="price"
                    name="price"
                    onChange={handleChange}
                    defaultValue={assetDetails.price}
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
                  <Form.Label>Delivery Date</Form.Label>
                  <Form.Control
                    name="deliveryDate"
                    type="date"
                    onChange={handleChange}
                    defaultValue={assetDetails.deliveryDate}
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
                <Form.Label >Donor Name</Form.Label>
                  <Form.Control
                    name="donorName"
                    type="text"
                    onChange={handleChange}
                    defaultValue={assetDetails.donorName}
                    placeholder="Donor name..."
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
                <Form.Label >Project Name</Form.Label>
                  <Form.Control
                    name="projectName"
                    onChange={handleChange}
                    defaultValue={assetDetails.projectName}
                    type="text"
                    placeholder="Project name..."
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
                <Form.Label >Asset Location</Form.Label>
                  <Form.Control
                    name="assetLocation"
                    onChange={handleChange}
                    defaultValue={assetDetails.assetLocation}
                    type="text"
                    placeholder="Asset Location..."
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
                  <Form.Label>Room No.</Form.Label>
                  <Form.Control
                    name="roomNo"
                    onChange={handleChange}
                    defaultValue={assetDetails.roomNo}
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
                <Form.Label >Asset Holder</Form.Label>
                  <Form.Control
                    name="assetHolder"
                    onChange={handleChange}
                    defaultValue={assetDetails.assetHolder}
                    type="text"
                    placeholder="Asset Holder..."
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
              </Col>


                
              <Col className="col-12 col-md-6">
                <Button
                  className="btn-lg font-weight-bold"
                  variant="primary"
                  type="submit"
                >
                  Edit Asset
                </Button>
              </Col>
              
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
};

export default EditAsset;

