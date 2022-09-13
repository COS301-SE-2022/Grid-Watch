import { AiDto } from '@grid-watch/libs/api/ai/ticket/api/shared
import { Injectable } from '@nestjs/common';
import {PrismaClient} from '@prisma/client';

@Injectable()
export class ApiAiTicketRepositoryDataAccess {

    prisma = new PrismaClient();

    async saveAI(AIdto : AiDto){
        const AIdata = await this.prisma.aI.create

        ({
            data            :   AIdto.aiData,
            fitness         :   AIdto.aiFitness,
            ticketTypes     :   AIdto.aiTicketTypes,
            ticketCities    :   AIdto.aiTicketCities
        })

        return AIdata
    }

    async readAI(ID : number){
        return await this.prisma.aI.findMany

        ({
            where:
            {
                id: ID,
            },

        })

    }

    async updateAI(ID: number, AIdto : AiDto){

        await this.prisma.aI.update({
            where:
            {
                id : ID,
            },
            data:
            {
                dateCreated     :   AIdto.dateCreated,
                data            :   AIdto.aiData,
                fitness         :   AIdto.aiFitness,
                ticketTypes     :   AIdto.aiTicketTypes,
                ticketCities    :   AIdto.aiTicketCities
            }
        })
    }

    async updateAIData(ID: number, AIdto : AiDto){

        await this.prisma.aI.update({
            where:
            {
                id : ID,
            },
            data:
            {
                data        :   AIdto.data,
            }
        })
    }

    async updateAIFitness(ID: number, AIdto : AiDto){

        await this.prisma.aI.update({
            where:
            {
                id : ID,
            },
            data:
            {
                fitness     :   AIdto.fitness,
            }
        })
    }

    async updateAIDateCreated(ID: number, AIdto : AiDto){

        await this.prisma.aI.update({
            where:
            {
                id : ID,
            },
            data:
            {
                dateCreated     :   AIdto.dateCreated,
            }
        })
    }

    async updateAITicketTypes(ID: number, AIdto : AiDto){

        await this.prisma.aI.update({
            where:
            {
                id : ID,
            },
            data:
            {
                ticketTypes     :   AIdto.aiTicketTypes,
            }
        })
    }

    async updateAITicketCities(ID: number, AIdto : AiDto){

        await this.prisma.aI.update({
            where:
            {
                id : ID,
            },
            data:
            {
                ticketCities     :   AIdto.aiTicketCities,
            }
        })
    }

    async deleteAI(ID: number, ){

        await this.prisma.aI.delete({
            where:
            {
                id : ID,
            },

        })
    }
}
