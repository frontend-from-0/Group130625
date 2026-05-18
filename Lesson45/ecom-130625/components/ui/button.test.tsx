import { render } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("matches snapshot for default Buy now button", () => {
    const { container } = render(<Button>Buy now</Button>);
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot for ghost sm Like button", () => {
    const { container } = render(
      <Button variant="ghost" size="sm">
        Like
      </Button>,
    );
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot for destructive variant", () => {
    const { container } = render(<Button variant="destructive">Delete</Button>);
    expect(container).toMatchSnapshot();
  });
});
