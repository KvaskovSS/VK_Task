import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import repoStore from './RepoStore';
import RepoItem from './RepoItem';

const RepositoryList: React.FC = observer(() => {
    const { repos, loading, setLoading, addRepos } = repoStore;

    const fetchRepos = async () => {
        setLoading(true);
        const response = await fetch(`https://api.github.com/repositories?per_page=10&page=${repos.length / 10 + 1}`);
        const data: Repo[] = await response.json();
        addRepos(data); 
        setLoading(false);
    };

    useEffect(() => {
        fetchRepos();
    }, []);

    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 && !loading) {
            console.log('loading more');
            fetchRepos();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

    return (
        <div>
            <h1>Список репозиториев GitHub</h1>
            <ul>
                {repos.map(repo => (
                    <RepoItem key={repo.id} id={repo.id} name={repo.name} />
                ))}
            </ul>
            {loading && <p>Загрузка...</p>}
        </div>
    );
});

export default RepositoryList;
