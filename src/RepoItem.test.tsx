import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RepoItem from './RepoItem';
import repoStore from './RepoStore';

jest.mock('./RepoStore', () => ({
    removeRepo: jest.fn(), 
    editRepo: jest.fn(),   
}));

describe('RepoItem', () => {
    const mockRepo = { id: 1, name: 'Test Repo' };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the repository name', () => {
        const { getByText } = render(<RepoItem id={mockRepo.id} name={mockRepo.name} />);
        expect(getByText('Test Repo')).toBeInTheDocument();
    });

    test('edits the repository name', () => {
        const { getByText, getByDisplayValue } = render(<RepoItem id={mockRepo.id} name={mockRepo.name} />);

        fireEvent.click(getByText('Редактировать'));
        fireEvent.change(getByDisplayValue(mockRepo.name), { target: { value: 'Updated Repo' } });
        fireEvent.click(getByText('Сохранить'));

        expect(repoStore.editRepo).toHaveBeenCalledWith(mockRepo.id, 'Updated Repo');
    });

    test('deletes the repository', () => {
        const { getByText } = render(<RepoItem id={mockRepo.id} name={mockRepo.name} />);

        fireEvent.click(getByText('Удалить'));
        
        expect(repoStore.removeRepo).toHaveBeenCalledWith(mockRepo.id);
    });
});
