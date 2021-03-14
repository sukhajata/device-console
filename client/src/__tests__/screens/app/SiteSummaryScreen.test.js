import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  wait
} from "@testing-library/react";
import SiteSummaryScreen from "../../../screens/app/SiteSummaryScreen";
import { withCurrentSite } from "../../../context/CurrentSiteContext";

const props = {
  match: {
    params: {
      siteId: 1
    }
  }
};
test("loads", async () => {
  const { getByText, getByTestId } = render(
    withCurrentSite(<SiteSummaryScreen {...props} />)
  );

  console.log("Finished");
});
