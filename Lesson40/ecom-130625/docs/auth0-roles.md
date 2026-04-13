## Auth0 roles setup (user/admin)

This app expects **Auth0 RBAC roles** to be present on the authenticated user, exposed via a **custom claim** on the ID token/session user.

### 1) Create roles in Auth0

In the Auth0 Dashboard:

- Go to **User Management → Roles**
- Create roles:
  - `user`
  - `admin`
- Assign roles to users as needed.

### 2) Add roles to tokens using an Auth0 Action

In the Auth0 Dashboard:

- Go to **Actions → Library**
- Create (or edit) a **Post Login** Action and add:

```js
/**
 * @param {Event} event
 * @param {PostLoginAPI} api
 */
exports.onExecutePostLogin = async (event, api) => {
  const namespace = "https://ecom-130625";
  const roles = (event.authorization && event.authorization.roles) || [];

  api.idToken.setCustomClaim(`${namespace}/roles`, roles);
  api.accessToken.setCustomClaim(`${namespace}/roles`, roles);
};
```

Then attach the Action to the **Login / Post Login** flow.

### 3) What the app reads

The app checks for the claim key:

- `https://ecom-130625/roles`

If it contains `admin`, the user is considered an admin.

### 4) Local development URLs (port 4005)

Because the dev server runs on port **4005**, configure your Auth0 application URLs:

- **Allowed Callback URLs**: `http://localhost:4005/auth/callback`
- **Allowed Logout URLs**: `http://localhost:4005`
- **Allowed Web Origins**: `http://localhost:4005`

