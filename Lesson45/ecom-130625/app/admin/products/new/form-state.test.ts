import { initialCreateProductFormState } from "@/app/admin/products/new/form-state";

describe("initialCreateProductFormState", () => {
  it("starts idle with no errors", () => {
    expect(initialCreateProductFormState).toEqual({
      status: "idle",
      message: "",
      fieldErrors: {},
    });
  });
});
