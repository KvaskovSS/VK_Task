import { makeAutoObservable } from 'mobx';

interface Repo {
    id: number;
    name: string;
}

class RepoStore {
    repos: Repo[] = [];
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setLoading = (loading: boolean) => {
        this.loading = loading;
    };

    addRepos = (newRepos: Repo[]) => {
        newRepos.forEach(repo => {
            if (!this.repos.some(existingRepo => existingRepo.id === repo.id)) {
                this.repos.push(repo);
            }
        });
    };

    removeRepo = (repoId: number) => {
        console.log(`Удаление репозитория с ID: ${repoId}`);
        this.repos = this.repos.filter(repo => repo.id !== repoId);
        console.log(`Оставшиеся репозитории:`, this.repos);
    };

    editRepo = (repoId: number, updatedData: Partial<Repo>) => {
        const index = this.repos.findIndex(repo => repo.id === repoId);
        if (index !== -1) {
            this.repos[index] = { ...this.repos[index], ...updatedData };
        }
    }
}

const repoStore = new RepoStore();
export default repoStore;
