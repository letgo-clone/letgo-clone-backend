const config: {
    db: {
        password: string
        username: string
        database: string
    },
    redis: {
        password: string
        host: string
        port: number
    }
} = {
    db: {
        password: '',
        username: '',
        database: 'letgo_clone'
    },
    redis: {
        password: '',
        host: '',
        port: 11164
    }
}

export default config;
