import React, { Suspense, useEffect } from "react";
import * as Sentry from "@sentry/browser";
import axios from "axios";

import Loading from "./components/Loading";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "./redux/store";
import RouteStack from "./RouteStack";

const App = () => {

  //error reporting
  Sentry.init({
    dsn: "https://5638cca6bfcf45a6a53b3885bc3a7d2f@sentry.io/2481783"
  });

  useEffect(() => {
    checkVersion();
  }, []);

  const checkVersion = async () => {
    try {
      const response = await axios.get('/version');
      if (response.data != process.env.REACT_APP_VERSION) {
        if (caches) {
          // Service worker cache should be cleared with caches.delete()
          caches.keys().then((names) => {
            for (const name of names) {
              caches.delete(name);
            }
          });
        }
        // delete browser cache and hard reload
        window.location.reload(true);
      }

    } catch (err) {
      console.log(err);
    }

  };

  return (
    <Suspense fallback={<Loading />}>
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <RouteStack />
        </PersistGate>
      </Provider>
    </Suspense>
  );
};

export default App;
