import "reflect-metadata"
import { DataSource } from "typeorm"
import { Member } from "./entity/Member"
import { Loan } from "./entity/Loan"
import { Item } from "./entity/Item"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: undefined,
    database: "konyvtar",
    synchronize: true,
    logging: true,
    entities: [Item, Member,Loan],
    migrations: [],
    subscribers: [],
})
