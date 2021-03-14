import React from "react";
import { render } from "@testing-library/react";
import SignInScreen from "../../../screens/auth/SignInScreen";

test("loads", async () => {
  const { getByText } = render(<SignInScreen />);
  expect(getByText("Username")).toBeTruthy();
  expect(getByText("Password")).toBeTruthy();
  expect(getByText("Sign In")).toBeTruthy();

  console.log("Finished");
});
