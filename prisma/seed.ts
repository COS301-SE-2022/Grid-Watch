import {tickets} from './tickets';
import {techteams} from './techteams';
import {admins} from './admins';
import {users} from './users';
import {subtasks} from './subtasks';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main(){
    
    for (let user of users){
        await prisma.user.create({
            data: user,
        })
    } 

    for (let ticket of tickets){
        await prisma.ticket.create({
            data: ticket,
        })
    } 

    for (let techteam of techteams){
        await prisma.techTeam.create({
            data: techteam,
        })
    } 

    for (let admin of admins){
        await prisma.authorizedOfficials.create({
            data: admin,
        })
    } 

    for (let subtask of subtasks){
        await prisma.subtasks.create({
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