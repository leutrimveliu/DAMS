import  React, { useEffect }  from 'react';
import { DataGrid ,GridToolbarContainer,
    GridToolbarExport,
    gridClasses,} from '@mui/x-data-grid';
import { getCategories } from "../../api/filter";
import { useSelector } from "react-redux";
import {getRegister} from "../../api/register";
import {getAssets} from "../../api/assets";

const columns = [
    { field: 'assetNr', headerName: 'No.', width: 30 },
    { field: 'assetCode', headerName: 'Tag no.',  width: 120 },
    { field: 'assetCategory', headerName: 'Kategoria', width: 120 },
    { field: 'assetDescription', headerName: 'Pershkrimi', width: 220 },
    { field: 'assetModel', headerName: 'Modeli',  width: 270 },
    { field: 'assetSerialNo', headerName: 'Serial no.', width: 120 },
    { field: 'projectName', headerName: 'Projekti', width: 120 },
    { field: 'assetLocation', headerName: 'Lokacioni', width: 120 },
    { field: 'roomNo', headerName: 'Nr. dhomes',  width: 100 },
    { field: 'assetHolder', headerName: 'Mbajtesi', width: 120 },
    { field: 'assetAvailability', headerName: 'Statusi', width: 85},
   
    
  ];
  
  function CustomToolbar() {
      return (
        <GridToolbarContainer className={gridClasses.toolbarContainer}>
          <GridToolbarExport  printOptions={{ allColumns: true }}  />
        </GridToolbarContainer>
      );
    }
  

function UserReportTable() {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [asset, setAssets] = React.useState([]);
    const [searchCategories, setSearchCategories] = React.useState([]);
    const [user, setUsers] = React.useState([]);
    const [sortModel, setSortModel] = React.useState([
        {
          field: 'commodity',
          sort: 'asc',
          rowLength: 10,
    maxColumns: 6,
        },
      ]);
  let rows=[];
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

      

      rows = asset.map((obj, index) => {
          
        return (rows = {
           id: index,
           assetNr: obj.assetNr,
           assetCode: obj.assetCode,
           assetCategory: searchCategories.filter((category) =>  
            obj.assetCategory === category._id ? 
                            category.assetCategory : null).map((categotry)=>
                            obj.assetCategory === categotry._id ? 
                                categotry.assetCategory : null),
           assetDescription: obj.assetDescription,
           assetModel: obj.assetModel,
           assetSerialNo: obj.assetSerialNo,
           projectName: obj.projectName,
           assetLocation: obj.assetLocation,
           roomNo: obj.roomNo,
           assetHolder: obj.assetHolder,
           assetAvailability: obj.assetAvailability,
        });
    }); 
    
  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={rows}      
        columns={columns}
        pageSize={10}
        // rowsPerPageOptions={[5]}
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
        checkboxSelection
        components={{
            Toolbar: CustomToolbar,
          }}
      />
    </div>
  );
}

export default UserReportTable
