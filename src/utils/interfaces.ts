// Configs
export interface DatabaseConfig {
    DB_CLIENT: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
}
  
export interface ServerConfig {
    PORT: number;
}

export interface AppConfig {
    KARMA_API_KEY: string
}

// Interfaces

//DB
export interface IUser {
    user_id?: number;
    name: string;
    username: string;
    email: string;
    password: string;
    created_at?: Date;
    deleted_at?: Date;
}

// Error
export interface CustomError {
    msg: string;
    statusCode: number;
    error: string;
  }

