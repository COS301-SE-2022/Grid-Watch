import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiTicketService {


    // createTicket(user: User ,issue_type : string, description: string, imgUrl: string, location: MapLocation): boolean
    createTicket(name: string, issue_type : string, description: string, imgUrl: string): boolean
    {
        console.log('Issue type: ' + issue_type);
        console.log('description: ' + description);
        console.log('img Url: ' + imgUrl);
        return true;
    }
}
