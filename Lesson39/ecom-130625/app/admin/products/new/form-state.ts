export type CreateProductFormState = {
  status: "idle" | "error" | "success";
  message: string;
  fieldErrors: {
    title?: string;
    price?: string;
    images?: string;
  };
};

export const initialCreateProductFormState: CreateProductFormState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};
