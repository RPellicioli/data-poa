export namespace CookiesUtils {
    export function get(key: string): string {
        key = key + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }

            if (c.indexOf(key) == 0) {
                return c.substring(key.length, c.length);
            }
        }
        return null;
    }

    export function set(key: string, value: string, expiration?: Date, domain?: string): void {
        let cookie = `${key}=${value};`;

        if (expiration) {
            cookie += ` expires=${expiration.toUTCString()};`
        }

        if (domain) {
            cookie += ` domain=${domain};`;
        }

        document.cookie = `${cookie} path=/`;
    }

    export function remove(key: string, domain?: string): void {
        const date = new Date();
        date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

        let cookie = `${key}=; expires=${date.toUTCString()};`;

        if (domain) {
            cookie += ` domain=${domain};`;
        }

        document.cookie = `${cookie} path=/`;
    }
}
