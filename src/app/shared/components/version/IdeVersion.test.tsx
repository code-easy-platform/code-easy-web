import React from 'react';
import { render } from '@testing-library/react';

import { IdeVersion } from './IdeVersion';

test('Get by version code', () => {
    const { queryByText } = render(<IdeVersion prefix="0.0.1" />);
    const element = queryByText('0.0.1');
    expect(element).toBeTruthy();
});
