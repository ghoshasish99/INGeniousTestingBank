import React from "react";

import { Grid, Typography, Button, ListItem } from "@material-ui/core";
import { BankAccount } from "../models";

export interface BankAccountListItemProps {
  bankAccount: BankAccount;
  deleteBankAccount: Function;
}

const BankAccountListItem: React.FC<BankAccountListItemProps> = ({
  bankAccount,
  deleteBankAccount,
}) => {
  return (
    <ListItem data-test={`bankaccount-list-item-${bankAccount.id}`}>
      <Grid container direction="row" justify="space-around" alignItems="center">
        <Grid item>
          <Typography component="h2" variant="overline" color="secondary" gutterBottom>
            {bankAccount.bankName} {bankAccount.isDeleted ? "(Deleted)" : undefined}
          </Typography>
        </Grid>
        {!bankAccount.isDeleted && (
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              data-test="bankaccount-delete"
              onClick={() => {
                deleteBankAccount({ id: bankAccount.id });
              }}
            >
              Delete
            </Button>
          </Grid>
        )}
      </Grid>
    </ListItem>
  );
};

export default BankAccountListItem;
