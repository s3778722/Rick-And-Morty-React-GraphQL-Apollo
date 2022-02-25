import React, { useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import { Grid } from "@mui/material";
const Spinner = () => {
  const [loading] = useState(true);

  return (
    <>
     <div style={{ height: "80vh", width: "100%" }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item style={{marginTop: '30vh'}}>
          {loading && (
            <div>
              <PropagateLoader size={15} color={"#32de84"} loading={loading} />
            </div>
          )}
        </Grid>
      </Grid>
      </div>
    </>
  );
};

export default Spinner;
