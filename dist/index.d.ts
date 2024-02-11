declare class ListenerCleaner {
    cleaners: (() => void)[];
    add(cleanerCallback: () => void): void;
    cleaner(): () => void;
    cleanUp(): void;
}

declare class PromiseQueue<T> {
    private onlyLast;
    private nextPromise;
    private canceled;
    private queueSize;
    private queueID;
    constructor(onlyLast?: boolean);
    getQueueSize(): number;
    awaitQueueEmpty(): Promise<void>;
    add(task: () => Promise<T>, id?: string): {
        id: string;
        promise: Promise<T>;
    };
    cancel(id: string): void;
    cancelAll(): Promise<void>;
}

declare class MultiQueue<T> {
    private readonly queues;
    constructor(concurrentTask?: number);
    getQueueSize(): number;
    awaitQueueEmpty(): Promise<void>;
    add(task: () => Promise<T>, id?: string): {
        id: string;
        promise: Promise<T>;
    };
    cancel(id: string): void;
    cancelAll(): Promise<void>;
}

declare function makeid(length: any): string;

type Lazy<T> = () => Promise<T>;

export { Lazy, ListenerCleaner, MultiQueue, PromiseQueue, makeid };
