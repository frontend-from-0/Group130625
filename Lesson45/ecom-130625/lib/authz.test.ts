import {
  AppRole,
  getRolesFromUser,
  hasRole,
  isAdmin,
  type Auth0SessionUser,
} from "@/lib/authz";

jest.mock("./auth0", () => ({
  auth0: {
    getSession: jest.fn(),
  },
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

const ROLES_CLAIM = "https://ecom-130625/roles";

function userWithRoles(roles: unknown): Auth0SessionUser {
  return { sub: "auth0|123", [ROLES_CLAIM]: roles };
}

describe("getRolesFromUser", () => {
  it.each([
    [null, []],
    [undefined, []],
    [{ sub: "auth0|123" }, []],
    [userWithRoles(["admin"]), ["admin"]],
    [userWithRoles(["user", "admin"]), ["user", "admin"]],
    [userWithRoles([123, "admin"]), ["admin"]],
    [userWithRoles("admin"), []],
  ] as const)("returns expected roles for %p", (user, expected) => {
    expect(getRolesFromUser(user)).toEqual(expected);
  });
});

describe("hasRole", () => {
  it("returns true when user has the role", () => {
    expect(hasRole(userWithRoles(["admin"]), AppRole.ADMIN)).toBe(true);
  });

  it("returns false when user lacks the role", () => {
    expect(hasRole(userWithRoles(["user"]), AppRole.ADMIN)).toBe(false);
  });

  it("returns false for null user", () => {
    expect(hasRole(null, AppRole.ADMIN)).toBe(false);
  });
});

describe("isAdmin", () => {
  it.each([
    [null, false],
    [undefined, false],
    [userWithRoles(["user"]), false],
    [userWithRoles(["admin"]), true],
    [userWithRoles(["user", "admin"]), true],
  ] as const)("isAdmin(%p) → %s", (user, expected) => {
    expect(isAdmin(user)).toBe(expected);
  });
});
