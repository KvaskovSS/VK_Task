import React, { useState } from 'react';
import { observer } from 'mobx-react';
import repoStore from './RepoStore';
import { ListItem, ListItemText, Button, TextField } from '@mui/material';

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
        <ListItem>
            {isEditing ? (
                <TextField 
                    value={newName} 
                    onChange={(e) => setNewName(e.target.value)} 
                    variant="outlined" 
                    size="small" 
                    InputProps={{
                        style: { color: 'white' },
                    }}
                    InputLabelProps={{
                        style: { color: 'white' }, 
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'white',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white', 
                            },
                        },
                    }}
                />
            ) : (
                <ListItemText primary={name} />
            )}
            <Button 
                onClick={handleEditToggle} 
                color="primary" 
                sx={{ color: 'white', '&:hover': { backgroundColor: '#f0f0f0', color: 'black' } }} 
            >
                {isEditing ? 'Сохранить' : 'Редактировать'}
            </Button>
            <Button 
                onClick={handleDelete} 
                color="secondary" 
                sx={{ color: 'white', '&:hover': { backgroundColor: '#f0f0f0', color: 'black' } }}
            >
                Удалить
            </Button>
        </ListItem>
    );
});

export default RepoItem;
