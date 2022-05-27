import Button from "@material-ui/core/Button";
// Types
import { CartItemType } from "../../App";
// Styles
import { Wrapper } from "./Item.styles";

import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Wrapper>
      <img src={item.image} alt={item.title} onClick={handleClickOpen} />
      <div>
        <h3>{item.title}</h3>
        <h3>${item.price}</h3>
      </div>
      <Button
        onClick={() => handleAddToCart(item)}
        data-cy={`add-to-cart-${item.id}`}
      >
        Add to cart
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {item.title} - {item.category}
        </DialogTitle>
        <DialogContent>
          <h3>Price: ${item.price}</h3>
          <DialogContentText id="alert-dialog-description">
            {item.description}
          </DialogContentText>
          <img
            src={item.image}
            alt={item.title}
            style={{ width: "100%", height: "100%" }}
          />
        </DialogContent>
        <DialogActions
          style={{ flexDirection: "row", justifyContent: "space-evenly" }}
        >
          <Button onClick={handleClose}>Dismiss</Button>
          <Button
            onClick={() => handleAddToCart(item)}
            data-cy={`add-to-cart-${item.id}`}
          >
            Add to cart
          </Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
};

export default Item;
