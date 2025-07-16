import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class PostgresService implements OnModuleInit{
    constructor(private readonly dataSource: DataSource) {}

    async rawQuery(sql: string, params?: any[]) {
        return this.dataSource.query(sql, params);
    }
    async onModuleInit() {
        await this.testConnection();
    }

    async testConnection() {
    try {
        await this.dataSource.query('SELECT 1');
        console.log('✅ Connected to Postgres via TypeORM DataSource');
        } catch (err) {
        console.error('❌ Database connection failed', err);
        }
    }
}