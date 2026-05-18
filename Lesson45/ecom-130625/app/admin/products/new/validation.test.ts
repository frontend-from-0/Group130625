import {
  createProductSchema,
  getFileName,
} from "@/app/admin/products/new/validation";

function imageFile(name = "photo.png"): File {
  return new File(["pixels"], name, { type: "image/png" });
}

describe("createProductSchema", () => {
  it("rejects empty title", () => {
    const result = createProductSchema.safeParse({
      title: "",
      price: "10",
      images: [imageFile()],
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.title?.[0]).toBe(
        "Product title is required.",
      );
    }
  });

  it("rejects non-positive price", () => {
    const result = createProductSchema.safeParse({
      title: "Valid product",
      price: "-5",
      images: [imageFile()],
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.price?.[0]).toBe(
        "Price must be greater than 0.",
      );
    }
  });

  it("rejects missing images", () => {
    const result = createProductSchema.safeParse({
      title: "Valid product",
      price: "19.99",
      images: [],
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.images?.[0]).toBe(
        "Upload at least one image.",
      );
    }
  });

  it("rejects non-image files", () => {
    const textFile = new File(["data"], "notes.txt", { type: "text/plain" });
    const result = createProductSchema.safeParse({
      title: "Valid product",
      price: "19.99",
      images: [textFile],
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.images?.[0]).toBe(
        "All uploaded files must be images.",
      );
    }
  });

  it("accepts valid payload", () => {
    const result = createProductSchema.safeParse({
      title: "Orbit Wireless Earbuds",
      price: "129.99",
      images: [imageFile()],
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.title).toBe("Orbit Wireless Earbuds");
      expect(result.data.price).toBe(129.99);
      expect(result.data.images).toHaveLength(1);
    }
  });
});

describe("getFileName", () => {
  it("builds a path under products/ with index and extension", () => {
    const file = imageFile("laptop2.avif");
    const name = getFileName(file, 0);

    expect(name).toMatch(/^products\/\d+-0\.avif$/);
  });

  it("omits extension when file has no extension", () => {
    const file = new File(["pixels"], "upload", { type: "image/png" });
    const name = getFileName(file, 2);

    expect(name).toMatch(/^products\/\d+-2$/);
  });
});
