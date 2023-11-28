const config: {
    db: {
        password: string
        username: string
        database: string
        host: string
        port: number
    },
    redis: {
        password: string
        host: string
        port: number
    }
} = {
    db: {
        password: '',
        username: 'firatyildiz',
        database: 'letgo_clone',
        host: '127.0.0.1',
        port: 5431
    },
    redis: {
        password: '',
        host: '',
        port: 11164
    }
}

export default config;
