import React, { useEffect } from "react";
import {
  Button,
  Box,
  useTheme,
  useMediaQuery,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import {
  BaseActionObject,
  Interpreter,
  ResolveTypegenMeta,
  ServiceMap,
  TypegenDisabled,
} from "xstate";
import { isEmpty } from "lodash/fp";
import { useActor, useMachine } from "@xstate/react";

import { userOnboardingMachine } from "../machines/userOnboardingMachine";
import BankAccountForm from "../components/BankAccountForm";
import { DataContext, DataEvents, DataSchema } from "../machines/dataMachine";
import { AuthMachineContext, AuthMachineEvents, AuthMachineSchema } from "../machines/authMachine";

export interface Props {
  authService: Interpreter<AuthMachineContext, AuthMachineSchema, AuthMachineEvents, any, any>;
  bankAccountsService: Interpreter<
    DataContext,
    DataSchema,
    DataEvents,
    any,
    ResolveTypegenMeta<TypegenDisabled, DataEvents, BaseActionObject, ServiceMap>
  >;
}

const UserOnboardingContainer: React.FC<Props> = ({ authService, bankAccountsService }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [bankAccountsState, sendBankAccounts] = useActor(bankAccountsService);
  const [authState] = useActor(authService);
  const [userOnboardingState, sendUserOnboarding] = useMachine(userOnboardingMachine);

  const currentUser = authState?.context?.user;

  useEffect(() => {
    sendBankAccounts("FETCH");
  }, [sendBankAccounts]);

  const noBankAccounts =
    bankAccountsState?.matches("success.withoutData") &&
    isEmpty(bankAccountsState?.context?.results);

  const dialogIsOpen =
    (userOnboardingState.matches("stepTwo") && !noBankAccounts) ||
    (userOnboardingState.matches("stepThree") && !noBankAccounts) ||
    (!userOnboardingState.matches("done") && noBankAccounts) ||
    false;

  const nextStep = () => sendUserOnboarding("NEXT");

  const createBankAccountWithNextStep = (payload: any) => {
    sendBankAccounts({ type: "CREATE", ...payload });
    nextStep();
  };

  return (
    <Dialog data-test="user-onboarding-dialog" fullScreen={fullScreen} open={dialogIsOpen}>
      <DialogTitle style={{ color: "#ff6200" }} data-test="user-onboarding-dialog-title">
        {userOnboardingState.matches("stepOne") && "Lets Get Started"}
        {userOnboardingState.matches("stepTwo") && "Create Bank Account"}
        {userOnboardingState.matches("stepThree") && "Finished"}
      </DialogTitle>
      <DialogContent data-test="user-onboarding-dialog-content">
        <Box display="flex" alignItems="center" justifyContent="center">
          {userOnboardingState.matches("stepOne") && (
            <>
              <img style={{ width: 200, height: 200 }} src="/img/LestStart.png" alt="" />
              <br />
              <DialogContentText style={{ paddingLeft: 20 }} color="secondary">
                The application requires a Bank Account to perform transactions.
                <br />
                <br />
                Click <b>Next</b> to begin setup of your Bank Account.
              </DialogContentText>
            </>
          )}
          {userOnboardingState.matches("stepTwo") && (
            <BankAccountForm
              userId={currentUser?.id!}
              createBankAccount={createBankAccountWithNextStep}
              onboarding
            />
          )}
          {userOnboardingState.matches("stepThree") && (
            <>
              <img style={{ width: 150, height: 100 }} src="/img/Finished.png" alt="" />
              <br />
              <DialogContentText style={{ paddingLeft: 20 }} color="secondary">
                You're all set !
                <br />
                <br />
                We are excited to welcome you to the INGenious Testing Bank !
              </DialogContentText>
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Grid container justify="space-between">
          <Grid item justify="flex-end">
            {!userOnboardingState.matches("stepTwo") && (
              <Button onClick={() => nextStep()} color="secondary" data-test="user-onboarding-next">
                {userOnboardingState.matches("stepThree") ? "Done" : "Next"}
              </Button>
            )}
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default UserOnboardingContainer;
