import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import repoStore from './RepoStore';
import RepoItem from './RepoItem';
import { Container, List, Typography, CircularProgress } from '@mui/material';
import { Repo } from './RepoStore';

const RepositoryList: React.FC = observer(() => {
    const { repos, loading, setLoading, addRepos } = repoStore;

    const fetchRepos = async () => {
        if (loading) return; 
        setLoading(true);

        console.log('Запрос на загрузку репозиториев...');
        
        const response = await fetch(`https://api.github.com/repositories?per_page=10&page=2`);

        if (!response.ok) {
            console.error('Ошибка при загрузке репозиториев:', response.statusText);
            setLoading(false);
            return;
        }

        const data: Repo[] = await response.json();
        
        if (data.length > 0) {
            console.log('Новые репозитории загружены:', data);
            addRepos(data);
        } else {
            console.log('Нет новых репозиториев для загрузки.');
        }
        
        setLoading(false);
    };

    useEffect(() => {
        fetchRepos();
    }, []);

    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 && !loading) {
            console.log('Прокрутка вниз, загружаем новые репозитории...');
            fetchRepos();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Список репозиториев GitHub
            </Typography>
            <List>
                {repos.map(repo => (
                    <RepoItem key={repo.id} id={repo.id} name={repo.name} />
                ))}
            </List>
            {loading && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: '20px' }}>
                    <CircularProgress />
                    <Typography variant="body1" style={{ marginTop: '10px' }}>
                        Загружаем репозитории...
                    </Typography>
                </div>
            )}
        </Container>
    );
});

export default RepositoryList;
