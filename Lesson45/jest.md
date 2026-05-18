# What is Jest?

**Jest** is a comprehensive JavaScript testing framework designed to make testing simple and enjoyable. It comes with everything you need out of the box, including a test runner, an assertion library, and a powerful mocking system. It's widely used for testing frontend frameworks like React and Vue, as well as Node.js applications.

  * **Test Suite**: A group of related tests, defined using `describe()`. It helps organize your tests logically.
  
    ```javascript
    describe('User Authentication', () => {
      // All tests related to user auth go here
    });
    ```
  * **Test Case**: A single, individual test, defined with `test()` or `it()`. The name of the test should clearly describe what it's testing.
    ```javascript
    it('should validate an email address', () => {
      // ... test logic
    });
    ```
  * **Assertion**: The final check that determines if a test passes or fails. You use `expect()` combined with a **matcher** to perform an assertion.
    ```javascript
    expect(sum(2, 2)).toBe(4);
    ```

-----

### Common Jest Matchers

Matchers are functions that let you check values in different ways. They are chained to the `expect()` function.

  * **Equality**
      * `.toBe(value)`: Checks for **strict equality** (`===`). Best for primitive values like numbers, strings, and booleans.
        ```javascript
        expect(10).toBe(10);
        ```
      * `.toEqual(value)`: Checks for **deep equality**. This is used for objects and arrays, as it compares their contents recursively.
        ```javascript
        expect({ a: 1 }).toEqual({ a: 1 });
        ```
  * **Truthiness**
      * `.toBeNull()`: Checks for `null`.
      * `.toBeUndefined()`: Checks for `undefined`.
      * `.toBeTruthy()`: Checks that a value is truthy (e.g., `true`, non-empty string, non-zero number).
      * `.toBeFalsy()`: Checks that a value is falsy (e.g., `false`, `0`, `''`, `null`, `undefined`).
  * **Arrays**
      * `.toContain(item)`: Checks if an item is in an array or a substring is in a string.
        ```javascript
        expect([1, 2, 3]).toContain(2);
        ```
  * **Negating Matchers**
      * Use `.not` to check for the opposite of a matcher.
        ```javascript
        expect(value).not.toBeNull();
        ```

-----

### Jest Mocking

**Mocking** is the process of creating a fake version of a function or module to test how your code interacts with it without triggering side effects like network requests.

  * `jest.fn()`: Creates a simple mock function. This is the foundation of Jest's mocking.
    ```javascript
    const mockClick = jest.fn();
    mockClick();
    expect(mockClick).toHaveBeenCalled();
    ```
  * `toHaveBeenCalledTimes(number)`: Verifies how many times a mock function was called.
      * `expect(mockClick).toHaveBeenCalledTimes(1);`
  * `toHaveBeenCalledWith(arg1, ...)`: Verifies if a mock function was called with specific arguments.
      * `expect(mockClick).toHaveBeenCalledWith('hello');`
  * `mockReturnValue(value)`: Sets a return value for the mock function.
      * `const mockAuth = jest.fn().mockReturnValue(true);`
  * `mockResolvedValue(value)` / `mockRejectedValue(error)`: Used for mocking asynchronous functions that return a promise.
      * `const mockAPI = jest.fn().mockResolvedValue({ status: 200 });`

-----

### Simple Test File Example

Here is a full example showing the structure of a test file.

```javascript
// Function to be tested
function add(a, b) {
  return a + b;
}

// Mocking a hypothetical async function
const mockApiCall = jest.fn();

// Describe a suite of tests for the add function
describe('add function', () => {
  test('adds two positive numbers', () => {
    expect(add(1, 2)).toBe(3);
  });

  it('adds a positive and a negative number', () => {
    expect(add(5, -3)).toBe(2);
  });
});

// Describe a suite for async behavior
describe('async functionality', () => {
  it('should call the API once', async () => {
    mockApiCall.mockResolvedValue({ data: 'success' });
    
    // Simulate an action that calls the async function
    await mockApiCall();

    expect(mockApiCall).toHaveBeenCalledTimes(1);
    expect(await mockApiCall()).toEqual({ data: 'success' });
  });

  it('should handle API failure gracefully', async () => {
    mockApiCall.mockRejectedValue(new Error('Network error.'));

    await expect(mockApiCall()).rejects.toThrow('Network error.');
  });
});
```