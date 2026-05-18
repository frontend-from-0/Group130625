import { cn, formatMoney } from "@/lib/utils";

describe("formatMoney", () => {
  it("formats SEK in sv-SE locale", () => {
    const formatted = formatMoney(249.99, "SEK", "sv-SE");
    expect(formatted).toMatch(/249/);
    expect(formatted).toMatch(/kr|SEK/i);
  });

  it("formats USD in en-US locale", () => {
    expect(formatMoney(89, "USD", "en-US")).toBe("$89.00");
  });

  it("formats zero", () => {
    const formatted = formatMoney(0, "SEK", "sv-SE");
    expect(formatted).toMatch(/0/);
  });
});
