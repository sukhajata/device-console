import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const ConnectionCard = ({ docid, connection, onSelect, showData }) => {
  const filtered = useSelector(state => state.connection.filtered);
  const [matches, setMatches] = useState([]);
  
  // find all connections for this ICP
  useEffect(() => {
    if (connection) {
      const found = filtered.filter(item => item.IDNumber === connection.IDNumber);
      setMatches(found);
    }
  }, [connection, filtered]);

  return (
    <div style={{ width: 250 }}>
      {connection && 
      <>
        <Typography>{connection.IDNumber}</Typography>
        <Typography>{connection.location.streetAddress1}</Typography>
      </>
      }
      {matches && matches.map(item =>
        <>
          <Typography>{item.phase}</Typography>
          <Button
              variant="outlined"
              color="primary"
              onClick={() => onSelect(docid)}
            >
            Details
          </Button>
          <Button
              variant="outlined"
              color="primary"
              style={{ marginLeft: 10 }}
              onClick={() => showData(docid)}
              >
            Data
          </Button>
        </>
      )} 
    </div>
  );
};

ConnectionCard.propTypes = {
  docid: PropTypes.string.isRequired,
  connection: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default ConnectionCard;

/* 
<Grid container direction="row">
    {matches && matches.map(item =>
      <Grid item>
        <Grid container direction="column">
          <Typography style={styles.header}>
            {connection.type === 1
              ? "Install Number: "
              : "Asset Number: "}
          </Typography>
          <Typography>{connection.idNumber}</Typography>
          <Typography style={styles.header}>Address:&nbsp;</Typography>
          <Typography>{connection.streetAddress}</Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => onSelect(docid)}
          >
            Details
          </Button>
          <Button
            variant="outlined"
            color="primary"
            style={{ marginLeft: 10 }}
            onClick={() => showData(docid)}
            >
              Data
            </Button>
          </Grid>
       </Grid>
    )} 
    </Grid>
*/
