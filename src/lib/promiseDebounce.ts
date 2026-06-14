export default function promiseDebounce<T>(func: (...args: any[]) => T, delay: number) {
    let timer: number;

    let promiseResolve: null | ((value: T) => void) = null; 
    let promiseReject: null | ((value: T) => void) = null;
    let promise: null | Promise<T> = null;

    const f = (...args: any[]): Promise<T> => {
        window.clearTimeout(timer);

        if (!promise) {
            promise = new Promise((resolve, reject) => {
                promiseResolve = resolve
                promiseReject = reject
            })
        }
        
        timer = window.setTimeout(() => {
            const res = func.call({}, args)

            if (promiseResolve)
                promiseResolve(res)

            promise = null;
            promiseReject = null;
            promiseResolve = null;
        }, delay);

        return promise;
    }

    return f
}