import React from 'react';
import { render } from '@testing-library/react';
import RepositoryList from './RepositoryList';
import repoStore from './RepoStore';

jest.mock('./RepoStore', () => ({
    repos: [],
    loading: false,
    setLoading: jest.fn(),
    addRepos: jest.fn(),   
}));

beforeEach(() => {
    jest.clearAllMocks(); 
});

describe('RepositoryList', () => {
    test('renders loading indicator when loading', () => {
        repoStore.loading = true;
        const { getByRole } = render(<RepositoryList />);
        expect(getByRole('progressbar')).toBeInTheDocument(); 
    });
});
