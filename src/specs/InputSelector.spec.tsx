import { render, screen, fireEvent } from "@testing-library/react";
import InputSelector from "../components/InputSelector";

describe("InputSelector Component", () => {
  it("should add a country to the selected list", () => {
    render(<InputSelector />);

    fireEvent.change(screen.getByTestId("Search for a country"), {
      target: { value: "USA" },
    });

    fireEvent.click(screen.getByTestId("add"));

    expect(screen.getByText("USA")).toBeInTheDocument();
  });

  it("should remove a country from the selected list", () => {
    render(<InputSelector />);

    fireEvent.change(screen.getByTestId("Search for a country"), {
      target: { value: "USA" },
    });
    fireEvent.click(screen.getByTestId("add"));

    expect(screen.getByText("USA")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("x"));

    expect(screen.queryByText("USA")).not.toBeInTheDocument();
  });

  it("should clear all selected countries", () => {
    render(<InputSelector />);

    fireEvent.change(screen.getByTestId("Search for a country"), {
      target: { value: "USA" },
    });
    fireEvent.click(screen.getByTestId("add"));

    fireEvent.change(screen.getByTestId("Search for a country"), {
      target: { value: "Canada" },
    });
    fireEvent.click(screen.getByTestId("add"));

    expect(screen.getByText("USA")).toBeInTheDocument();
    expect(screen.getByText("Canada")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("delete all selected"));

    expect(screen.queryByText("USA")).not.toBeInTheDocument();
    expect(screen.queryByText("Canada")).not.toBeInTheDocument();
  });
});
