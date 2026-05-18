import ForbiddenPage from './page';
import { render } from '@testing-library/react';

describe('ForbiddenPage', () => {
  it('renders 403 error message correctly', () => {
    const { container } = render(<ForbiddenPage />);

    expect(container).toMatchSnapshot();
  });

  it('shows access deined message', () => {
    const { getByText, getByTestId } = render(<ForbiddenPage />);

    expect(getByText('403')).toHaveTextContent('403');
    expect(getByTestId('go-home-link')).toHaveAttribute('href', '/');
  });
});
