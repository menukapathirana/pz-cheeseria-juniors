import React, { useState } from "react";
import { useQuery } from "react-query";
// Components
import Item from "./Cart/Item/Item";
import Cart from "./Cart/Cart";
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import RestoreIcon from "@material-ui/icons/Restore";
import Badge from "@material-ui/core/Badge";

import DialogTitle from "@material-ui/core/DialogTitle";

// Styles
import {
  Wrapper,
  StyledButton,
  StyledAppBar,
  HeaderTypography,
} from "./App.styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import ReusableDialog from "./Cart/Dialog/ReusableDialog";
import Dialog from "@material-ui/core/Dialog";
// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getCheeses = async (): Promise<CartItemType[]> =>
  await (await fetch(`api/cheeses`)).json();

export type RecentItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getPurchase = async (): Promise<RecentItemType[]> =>
  await (await fetch(`api/recent`)).json();

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "cheeses",
    getCheeses
  );

  const {
    data: reusableData,
    isLoading: RisLoading,
    error: Rerror,
  } = useQuery<RecentItemType[]>("purchase", getPurchase);

  console.log(reusableData);

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading || RisLoading) return <LinearProgress />;
  if (error || Rerror) return <div>Something went wrong ...</div>;

  return (
    <Wrapper>
      <StyledAppBar position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <StyledButton onClick={() => setOpenDialog(true)}>
              <RestoreIcon />
              <Typography variant="subtitle2">Recent Purchases</Typography>
            </StyledButton>

            <Dialog
              open={openDialog}
              onClose={() => {
                setOpenDialog(false);
              }}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Recent Purchase</DialogTitle>
              <ReusableDialog
                setOpenDialog={() => setOpenDialog(false)}
                recentItems={reusableData}
              />
            </Dialog>

            <HeaderTypography variant="h3" noWrap>
              Welcome to Patient Zero's Cheeseria
            </HeaderTypography>

            <StyledButton onClick={() => setCartOpen(true)}>
              <Badge
                badgeContent={getTotalItems(cartItems)}
                color="error"
                data-cy="badge-count"
              >
                <AddShoppingCartIcon />
              </Badge>

              <Typography variant="subtitle2">Cart</Typography>
            </StyledButton>
          </Grid>
        </Toolbar>
      </StyledAppBar>

      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>

      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
