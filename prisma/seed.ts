import {tickets} from './tickets';
import {techteams} from './techteams';
import {admins} from './admins';
import {users} from './users';
import {subtasks} from './subtasks';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main(){
    for (let ticket of tickets){
        await this.prisma.ticket.create({
            data: ticket,
        })
    } 

    for (let techteam of techteams){
        await this.prisma.ticket.create({
            data: techteam,
        })
    } 

    for (let admin of admins){
        await this.prisma.ticket.create({
            data: admin,
        })
    } 

    for (let user of users){
        await this.prisma.ticket.create({
            data: user,
        })
    } 

    for (let subtask of subtasks){
        await this.prisma.ticket.create({
            data: subtask,
        })
    } 

}

//yarn prisma db seed
main().catch(e => {
    console.log(e);
    process.exit(1)
}).finally(() => {
    prisma.$disconnect();
})