import Button from "@material-ui/core/Button";
// Types

// Styles

import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Divider from "@material-ui/core/Divider";

type Props = {
  setOpenDialog: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  recentItems: any;
};

const ReusableDialog: React.FC<Props> = ({ recentItems, setOpenDialog }) => {
  return (
    <div>
      <DialogContent>
        {recentItems.length === 0 ? <h2>No recent purchase</h2> : null}

        {recentItems?.map((item: any) => (
          <DialogContent>
            <h3>
              {item.title} — Price: ${item.price} — No of Items: {item.amount}
            </h3>

            <DialogContentText id="alert-dialog-description">
              {item.description}
            </DialogContentText>
            <img
              src={item.image}
              alt={item.title}
              style={{ width: "100%", height: "100%", marginBottom: 10 }}
            />
            <Divider />
          </DialogContent>
        ))}
      </DialogContent>

      <DialogActions
        style={{ flexDirection: "row", justifyContent: "space-evenly" }}
      >
        <Button
          onClick={() => {
            setOpenDialog(false);
          }}
        >
          Dismiss
        </Button>
      </DialogActions>
    </div>
  );
};

export default ReusableDialog;
