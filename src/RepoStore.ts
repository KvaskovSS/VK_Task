import { makeAutoObservable } from 'mobx';

interface Repo {
    id: number; 
    name: string;
}

class RepoStore {
    repos: Repo[] = [];
    loading: boolean = false;
    private nextId: number = 1; 

    constructor() {
        makeAutoObservable(this);
    }

    setLoading = (loading: boolean) => {
        console.log(`Установка состояния загрузки: ${loading}`);
        this.loading = loading;
    };

    addRepos = (newRepos: Repo[]) => {
        console.log('Добавление новых репозиториев:', newRepos);
        newRepos.forEach(repo => {
            const uniqueId = this.nextId++;
            const newRepo = { ...repo, id: uniqueId }; 
            this.repos.push(newRepo);
            console.log(`Добавлен репозиторий: ${newRepo.name} (ID: ${newRepo.id})`);
        });
        console.log('Текущий список репозиториев:', this.repos);
    };

    removeRepo = (repoId: number) => {
        console.log(`Удаление репозитория с ID: ${repoId}`);
        this.repos = this.repos.filter(repo => repo.id !== repoId);
        console.log(`Оставшиеся репозитории после удаления:`, this.repos);
    };
}

const repoStore = new RepoStore();
export default repoStore;
