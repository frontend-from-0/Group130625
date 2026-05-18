import { AppRole, hasRole, ROLES_CLAIM } from './authz';

jest.mock('./auth0', () => {
  auth0: {
    getSession: jest.fn();
  }
});

jest.mock('next/navigation', () => {
  redirect: jest.fn();
});

function userWithRoles(roles: AppRole[]) {
  return {
    sub: 'auth0|123',
    [ROLES_CLAIM]: roles,
  };
}

describe('authz', () => {
  describe('hasRole', () => {
    it('returns true if the user has a role', () => {
      const adminUser = userWithRoles([AppRole.ADMIN]);
      expect(hasRole(adminUser, AppRole.ADMIN)).toBe(true);
    });
    
    it('returns false if the user is missing a role', () => {
      const adminUser = userWithRoles([]);
      expect(hasRole(adminUser, AppRole.ADMIN)).toBe(false);
    });

    it('returns fails if the user is null', () => {
      expect(hasRole(null, AppRole.USER)).toBe(false);
    });
  });
});
