type Listener<T = any> = (...args: T[]) => void;

class EventEmitter {
    private events: { [key: string]: Listener[] } = {};

    on<T>(eventName: string, listener: Listener<T>): void {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(listener);
    }

    emit<T>(eventName: string, ...args: T[]): void {
        if (this.events[eventName]) {
            this.events[eventName].forEach(listener => listener(...args));
        }
    }

    off<T>(eventName: string, listener: Listener<T>): void {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(l => l !== listener);
        }
    }
}

export { EventEmitter };
