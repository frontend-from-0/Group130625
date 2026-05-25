export type CreateProductFormData = {
  title: string;
  price: string;
  imageNames: string[];
};

export type CreateProductFormState = {
  status: "idle" | "error" | "success";
  message: string;
  data: CreateProductFormData;
  fieldErrors: {
    title?: string;
    price?: string;
    images?: string;
  };
};

export const initialCreateProductFormData: CreateProductFormData = {
  title: "",
  price: "",
  imageNames: [],
};

export const initialCreateProductFormState: CreateProductFormState = {
  status: "idle",
  message: "",
  data: initialCreateProductFormData,
  fieldErrors: {},
};
