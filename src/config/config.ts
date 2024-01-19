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
        password: '123',
        username: 'postgres',
        database: 'letgo_clone',
        host: '127.0.0.1',
        port: 5432
    },
    redis: {
        password: '',
        host: '',
        port: 36780
    }
}

export default config;
