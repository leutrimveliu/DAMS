import  React, { useEffect }  from 'react';
import { DataGrid ,GridToolbarContainer,
    GridToolbarExport,
    gridClasses,} from '@mui/x-data-grid';
import { getCategories } from "../../api/filter";
import { useSelector } from "react-redux";
import {getRegister} from "../../api/register";
import {getAssets} from "../../api/assets";

const columns = [
  { field: 'assetNr', headerName: 'No', width: 30 },
  { field: 'assetCode', headerName: 'Code',  width: 100 },
  { field: 'assetCategory', headerName: 'Category', width: 220 },
  { field: 'assetDescription', headerName: 'Description', width: 220 },
  { field: 'assetModel', headerName: 'Model',  width: 220 },
  { field: 'assetSerialNo', headerName: 'Serial no.', width: 100 },
  { field: 'assetSupplier', headerName: 'Supplier', width: 150 },
  { field: 'price', headerName: 'Price',  width: 70 },
  { field: 'deliveryDate', headerName: 'Delivery date', width: 150 },
  { field: 'publishDate', headerName: 'Publish date', width: 150 },
  { field: 'donorName', headerName: 'Donor',  width: 150 },
  { field: 'projectName', headerName: 'Project Name', width: 150 },
  { field: 'assetLocation', headerName: 'Location', width: 150 },
  { field: 'roomNo', headerName: 'Room no.',  width: 150 },
  { field: 'assetHolder', headerName: 'Holder', width: 150 },
  { field: 'assetAvailability', headerName: 'Status', width: 150 },
 
  
];

function CustomToolbar() {
    return (
      <GridToolbarContainer className={gridClasses.toolbarContainer}>
        <GridToolbarExport  printOptions={{ allColumns: true }}  />
      </GridToolbarContainer>
    );
  }

export default function ReportTable() {
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
           assetSupplier: obj.assetSupplier,
           price: obj.price.toFixed(2),
           deliveryDate: obj.deliveryDate.split("T")[0],
           publishDate: obj.publishDate.split("T")[0],
           donorName: obj.donorName,
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