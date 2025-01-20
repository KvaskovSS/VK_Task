import React, { useState } from 'react';
import { observer } from 'mobx-react';
import repoStore from './RepoStore';

interface RepoItemProps {
    id: number;
    name: string;
}

const RepoItem: React.FC<RepoItemProps> = observer(({ id, name }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(name);

    const handleDelete = () => {
        console.log(`Кнопка удаления нажата для репозитория с ID: ${id}`);
        repoStore.removeRepo(id);
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            repoStore.editRepo(id, newName);
        } else {
            setNewName(name);
        }
    };

    return (
        <li>
            {isEditing ? (
                <input 
                    type="text" 
                    value={newName} 
                    onChange={(e) => setNewName(e.target.value)} 
                />
            ) : (
                <span>{name}</span>
            )}
            <button onClick={handleEditToggle}>
                {isEditing ? 'Сохранить' : 'Редактировать'}
            </button>
            <button onClick={handleDelete}>Удалить</button>
        </li>
    );
});

export default RepoItem;
