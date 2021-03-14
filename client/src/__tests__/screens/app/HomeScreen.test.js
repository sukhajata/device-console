import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  wait
} from "@testing-library/react";
import HomeScreen from "../../../screens/app/HomeScreen";

test("loads", async () => {
  const { getByText, getByTestId } = render(<HomeScreen />);
  await wait(() => getByText("Site address: 13 High St"));
  console.log("Finished");
});
