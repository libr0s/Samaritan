import React from 'react';
import { SnackbarProvider, withSnackbar } from 'notistack';
import App from './App';

const SApp = withSnackbar(App);

function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <SApp />
    </SnackbarProvider>
  );
}

export default IntegrationNotistack;