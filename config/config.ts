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
        password: 'g-f5ea3G65b43GA-5Bd-E6224Ebd6F*A',
        username: 'postgres',
        database: 'letgo_clone',
        host: 'roundhouse.proxy.rlwy.net',
        port: 11199
    },
    redis: {
        password: 'JIjG4dhn6A1dmd2JnnBJaaAf1LFA3pin',
        host: 'monorail.proxy.rlwy.net',
        port: 36780
    }
}

export default config;
