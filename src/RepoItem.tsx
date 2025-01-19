import React from 'react';
import { observer } from 'mobx-react';
import repoStore from './RepoStore';

interface RepoItemProps {
    id: number;
    name: string;
}

const RepoItem: React.FC<RepoItemProps> = observer(({ id, name }) => {
    const handleDelete = () => {
        console.log(`Кнопка удаления нажата для репозитория с ID: ${id}`);
        repoStore.removeRepo(id);
    };

    return (
        <li>
            {name}
            <button onClick={handleDelete}>Удалить</button>
        </li>
    );
});

export default RepoItem;
