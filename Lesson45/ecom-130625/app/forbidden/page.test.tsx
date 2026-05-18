import { render } from "@testing-library/react";
import ForbiddenPage from "@/app/forbidden/page";

describe("ForbiddenPage", () => {
  it("renders 403 message unchanged", () => {
    const { container } = render(<ForbiddenPage />);
    expect(container).toMatchSnapshot();
  });

  it("shows access denied heading", () => {
    const { getByRole, getByText } = render(<ForbiddenPage />);
    expect(getByRole("heading", { level: 1 })).toHaveTextContent("403");
    expect(
      getByText("You don’t have access to this page."),
    ).toBeInTheDocument();
  });
});
