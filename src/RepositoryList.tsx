import React, { useState, useEffect } from 'react';

const RepositoryList = () => {
    const [repos, setRepos] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchRepos = async () => {
        setLoading(true);
        const response = await fetch(`https://api.github.com/repositories?per_page=10&page=${page}`);
        const data = await response.json();
        setRepos(prevRepos => [...prevRepos, ...data]);
        setLoading(false);
    };

    useEffect(() => {
        fetchRepos();
    }, [page]);

    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 && !loading) {
            setPage(prevPage => prevPage + 1);
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
                    <li key={repo.id}>{repo.name}</li>
                ))}
            </ul>
            {loading && <p>Загрузка...</p>}
        </div>
    );
};

export default RepositoryList;
