
import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
// import './AssetsTable.scss';
import CategoryChart from "../../Charts/CategoryChart";
import ReportTable from "../../Home/ReportTable";
import ManagerBox from "../../Boxes/ManagerBox";
import TopChart from "../../Charts/ManagerChart/TopChart";
import CostChart from "../../Charts/CostChart";

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

export default function AssetsTable() {
  const classes = useStyles();
 

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
         <ManagerBox/>
         <br />
         <br />
         
         <CostChart/>
         <br />
         <br />
         {/* <LowerAdminBox/> */}
         <CategoryChart/>
         <br />
         <br />
         <br />
         <br />
        <TopChart/>
        <br />
        <br />
        <ReportTable/>
        <br />
        <br />
      
        
      </Grid>
    </div>
  );
}
