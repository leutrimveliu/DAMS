import React, { useEffect }  from 'react'
import { Link } from "react-router-dom";
import {getAssets} from "../../api/assets";
import {getRegister} from "../../api/register";
import { useSelector } from "react-redux";
import { getCategories } from "../../api/filter";

function UpperAdminBox() {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [asset, setAssets] = React.useState([]);
    const [searchCategories, setSearchCategories] = React.useState([]);
    const [user, setUsers] = React.useState([]);
    
    const getUsersList = async () => {
        const response = await getRegister();

        setUsers(response);
    };
    
    const getAssetsList = async () => {
        const response = await getAssets(currentUser.user._id);

        setAssets(response);
    };
    const getCategoriesList = async () => {
        const response = await getCategories();
        setSearchCategories(response);
    };

    useEffect(() => {
        getAssetsList();
        getCategoriesList();
        getUsersList();
      }, []);

    return (
        <div className='row '>
            <div className="col-lg-4 col-6 mx-auto">
                 
                  <div className="small-box bg-info">
                    <div className="inner">
                    <h3 style={{color:'white'}}>{asset.length}
                    <sup styles="font-size: 20px"></sup></h3>
                      <p style={{color:'white', fontSize:22}}>Pajisje digjitale të regjistruara</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-briefcase"></i>
                    </div>
                    <Link to="/admin" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right"></i>
                    </Link>
                  </div>
                </div>
             
                <div className="col-lg-4 col-6 mx-auto">
             
                  <div className="small-box bg-warning">
                    <div className="inner">
                      <h3 style={{color:'white'}}>
                        {searchCategories.length}
                        <sup styles="font-size: 20px"></sup>
                      </h3>

                      <p style={{color:'white',fontSize:22}}>Kategori të ndryshme të pajisjeve</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-clipboard"></i>
                    </div>
                    <Link to="/admin" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right"></i>
                    </Link>
                  </div>
                </div>
             
                <div className="col-lg-4 col-6 mx-auto">
                
                  <div className="small-box bg-secondary">
                    <div className="inner">
                      <h3 style={{color:'white'}}>{user.length}</h3>

                      <p style={{color:'white',fontSize:22}}>Përdorues të regjistruar</p>
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

export default UpperAdminBox
