import React, { useEffect }  from 'react'
import { Link } from "react-router-dom";
import {getAssets} from "../../api/assets";


function LowerAdminBox() {

    const [status1, setStatus1] = React.useState([]);
    const [status2, setStatus2] = React.useState([]);

    const getStatusNum1 = async () => {
        const response = await getAssets();
        const filteredCategory = response.filter(
          (asset) => asset.assetAvailability === "Active"
        );
        setStatus1(filteredCategory);
      };
      const getStatusNum2 = async () => {
        const response = await getAssets();
        const filteredCategory = response.filter(
          (asset) => asset.assetAvailability === "Passive"
        );
        setStatus2(filteredCategory);
      };

      useEffect(() => {
        getStatusNum1();
        getStatusNum2();
      }, []);

    return (
        <div className='row'>
             <div className="col-lg-4 col-6 mx-auto">
                  {/* <!-- small box --> */}
                  <div className="small-box bg-success">
                    <div className="inner">
                      <h3 style={{color:'white'}}>{status1.length}</h3>

                      <p style={{color:'white',fontSize:22}}>Pajisje aktive</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-person-add"></i>
                    </div>
                    <Link to="/admin" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right"></i>
                    </Link>
                  </div>
                </div>
                <div className="col-lg-4 col-6 mx-auto">
                  {/* <!-- small box --> */}
                  <div className="small-box bg-danger">
                    <div className="inner">
                      <h3 style={{color:'white'}}>{status2.length}</h3>

                      <p style={{color:'white',fontSize:22}}>Pajisje pasive</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-person-add"></i>
                    </div>
                    <Link to="/admin" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right"></i>
                    </Link>
                  </div>
            </div>
            
        </div>
    )
}

export default LowerAdminBox
