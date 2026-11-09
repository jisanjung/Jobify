import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("react-map-gl", () => {
  const React = require("react");
  const Passthrough = ({ children }) => <div>{children}</div>;
  return {
    __esModule: true,
    default: Passthrough,
    Marker: Passthrough,
    Popup: Passthrough,
    FlyToInterpolator: function FlyToInterpolator() {},
  };
});

test("renders the search form and empty state", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: /jobify/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /search jobs/i })).toBeDisabled();
  expect(screen.getByText(/search for jobs near you/i)).toBeInTheDocument();
});
