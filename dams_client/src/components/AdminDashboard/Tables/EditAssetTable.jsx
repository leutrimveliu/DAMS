import React, { useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Link ,Redirect} from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import {getAssets} from "../../../api/assets";
import { deleteAsset } from "../../../api/editAsset";
import {getRegister} from "../../../api/register";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCategories } from "../../../api/filter";
import './AssetsTable.scss';



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}


function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "assetNr",
    // numeric: "right",
    disablePadding: false,
    label: "No.",
  },
  {
    id: "assetCode",
    // numeric: "right",
    disablePadding: false,
    label: "Tag no.",
  },
  
  {
    id: "assetCategory",
    numeric: "center",
    disablePadding: false,
    label: "Kategoria",
  },
  {
    id: "assetDescription",
    numeric: "center",
    disablePadding: false,
    label: "Pershkrimi",
  },
  {
    id: "assetModel",
     numeric: "left",
    disablePadding: false,
    label: "Modeli",
  },
  {
    id: "assetSerialNo",
    numeric: "center",
    disablePadding: false,
    label: "Serial no.",
  },
  {
    id: "assetSupplier",
    numeric: "center",
    disablePadding: false,
    label: "Furnitori",
  },
  {
    id: "price",
    numeric: "center",
    disablePadding: false,
    label: "Cmimi",
  }, 
  {
    id: "deliveryDate",
     numeric: "left",
    disablePadding: false,
    label: "Data e pranimit",
  },
  {
    id: "publishDate",
     numeric: "left",
    disablePadding: false,
    label: "Data e publikimit",
  },
  
  {
    id: "donorName",
    numeric: "center",
    disablePadding: false,
    label: "Donatori",
  },
  {
    id: "projectName",
    numeric: "center",
    disablePadding: false,
    label: "Projekti",
  },
  {
    id: "assetLocation",
    numeric: "center",
    disablePadding: false,
    label: "Lokacioni",
  },
  {
    id: "roomNo",
    numeric: "center",
    disablePadding: false,
    label: "Nr. dhomes",
  },
  {
    id: "assetHolder",
    numeric: "center",
    disablePadding: false,
    label: "Mbajtesi",
  },
  {
    id: "assetAvailability",
    numeric: "center",
    disablePadding: false,
    label: "Statusi",
  },

  {
    id: "edit",
    numeric: "center",
    disablePadding: false,
    label: "Ndrysho pajisjen",
  },
  {
    id: "delete",
    numeric: "center",
    disablePadding: false,
    label: "Fshij pajisjen",
  },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}>
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div">
          Menaxho pajisjet digjitale
        </Typography>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },

  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function EditAssetTable() {
    const classes = useStyles();
    const history = useHistory();
    const { user: currentUser } = useSelector((state) => state.auth);
    // const { user: currentUser } = useSelector((state) => state.auth);
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("name");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    // const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
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
  
    const handleDeleteSubmit = async (id) => {
      const deleteuser = {
        user_id: currentUser.user._id,
      };
      try {
        await deleteAsset(id, deleteuser);
  
        console.log("Event has been deleted!");
        setTimeout(() => {
          
          history.go("/admin");
        }, 1000);
      } catch (e) {}
    };
  
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    };
  
    
  
    const handleClick = (event, name) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
  
      setSelected(newSelected);
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    
  
    const isSelected = (name) => selected.indexOf(name) !== -1;
  
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, asset.length - page * rowsPerPage);
    return (
        <div className={classes.root}>
       <Grid
        item
        xs={12}
        sm={12}
        md={12}
        component={Paper}
        className={classes.paper}
      >
            <EnhancedTableToolbar numSelected={selected.length} />
             <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={asset.length}
            />
            <TableBody>
              {stableSort(asset, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((asset, index) => {
                  const isItemSelected = isSelected(asset.title);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(e) => handleClick(e, asset.title)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={asset._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="left"
                      >
                        {asset.assetNr}
                      </TableCell>
                      <TableCell align="left">{asset.assetCode}</TableCell>
                      {searchCategories.map((category) =>
                      asset.assetCategory === category._id ? (
                        <TableCell align="center">
                          {category.assetCategory}
                        </TableCell>
                      ) : null
                    )}
                      {/* <TableCell align="center">{asset.assetCategory}</TableCell> */}
                      <TableCell align="center">{asset.assetDescription}</TableCell>
                      <TableCell align="center">{asset.assetModel}</TableCell>
                      <TableCell align="center">{asset.assetSerialNo}</TableCell>
                      <TableCell align="center">{asset.assetSupplier}</TableCell>
                      <TableCell align="center">
                        {asset.price.toFixed(2)}€{" "}
                       </TableCell>
                      <TableCell align="center">
                        {asset.deliveryDate.split("T")[0]}
                        </TableCell>
                      <TableCell align="center">
                        {asset.publishDate.split("T")[0]}
                      </TableCell>
                      <TableCell align="center">{asset.donorName}</TableCell>
                      <TableCell align="center">{asset.projectName}</TableCell>
                      <TableCell align="center">{asset.assetLocation}</TableCell>
                      <TableCell align="center">{asset.roomNo}</TableCell>
                      <TableCell align="center">{asset.assetHolder}</TableCell>
                      <TableCell align="left">{asset.assetAvailability}</TableCell>
                      <TableCell align="center">
                        <Link to={`/admins/asset/${asset._id}`}>
                          <IconButton
                            aria-label="center"
                            className="edit_button"
                          >
                            <EditIcon className="edit_icon" />
                          </IconButton>
                        </Link>
                      </TableCell>
                      <TableCell align="center">
                        {currentUser ? (
                          <IconButton
                            onClick={() => {
                              if (window.confirm("Delete the event?")) {
                                handleDeleteSubmit(asset._id);
                              }
                            }}
                            className="delete_button"
                            aria-label="delete"
                          >
                            <DeleteIcon className="delete_icon" />
                          </IconButton>
                        ) : (
                          <IconButton
                            onClick={() => {
                              <Redirect to="/" />;
                            }}
                            className="delete_button"
                            aria-label="delete"
                          >
                            <DeleteIcon className="delete_icon" />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ emptyRows }}>
                  {/* <TableCell colSpan={6} /> */}
                  <Divider />
                </TableRow>
              )}
            </TableBody>
          </Table>
           
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={asset.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
     </Grid>
    </div>
    )
}

export default EditAssetTable
