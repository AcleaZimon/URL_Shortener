import yaml from 'js-yaml';
import fs from 'fs';

interface config {
    server_domain: string,
    port: number,
    page_dir: string,
    reverse_proxy_enabled: boolean,
    sqlite_path: string
    enable_postgre: boolean,
    postgre_config: {
        database: string
        host: string
        port: number
        user: string
        pool_max: number
    }
}

export class Config implements config {
    server_domain: string;
    port: number;
    page_dir: string;
    reverse_proxy_enabled: boolean;
    sqlite_path: string;
    enable_postgre: boolean;
    postgre_config: { database: string; host: string; port: number; user: string; pool_max: number; };
    
    constructor() {
        const doc: config = yaml.load(
            fs.readFileSync('./config.yaml', 'utf8')) as config;

        this.server_domain = doc.server_domain;
        this.port = doc.port;
        this.page_dir = doc.page_dir;
        this.reverse_proxy_enabled = doc.reverse_proxy_enabled;
        this.sqlite_path = doc.sqlite_path;
        this.enable_postgre = doc.enable_postgre;
        this.postgre_config = doc.postgre_config;
    }
}