import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post,
    Put,
    SetMetadata,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';

import { ApiTicketService } from '@grid-watch/api/ticket/service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage, Multer } from 'multer';
import { Helper } from './helper';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { HttpParams } from '@angular/common/http';
import { JwtAuthGuard } from '@grid-watch/api/authentication';

@Controller('ticket')
export class TicketController {

    constructor(private readonly apiTicketService:ApiTicketService){}

    //Testing endpoint to test functionality
    // @SetMetadata('roles', ['admin'])
    @Get()
    testing(){
        return  "Testing Tickets";
    }

    //get endpiont to return a specific ticket
    @Get(':id')
    async getTicket(@Param() params){
        return this.apiTicketService.getTicket(parseInt(params.id));
    }

    //get endpoint to increment the ticket upvotes
    @Get('inc/:id')
    async incUpvotes(@Param() params){
        return this.apiTicketService.incUpvotes(parseInt(params.id));
    }

    //get endpoint to return tickets in a specified city
    @Get('city/:city')
    async getCity(@Param() params){
        return this.apiTicketService.getCityTicket(params.city);
    }

    @Get('status/:status')
    async getStatus(@Param() params){
        return this.apiTicketService.getStatus(params.status);
    }

    @Get('issue/:issue')
    async getIssue(@Param() params){
        return this.apiTicketService.getIssue(params.issue);
    }

    //get endpint to return all tickets
    @UseGuards(JwtAuthGuard)
    @Get('/all/tickets')
    async getAll(){
        return this.apiTicketService.getAll();
    }

    //get endpint to return all tickets sort by Date
    @Get('/all/tickets/Date')
    async getAllSortByDate(){
        return this.apiTicketService.getAllSortByDate();
    }
    
    //get endpint to return all tickets sort by Issue
    @Get('/all/tickets/Issue')
    async getAllSortByIssue(){
        return this.apiTicketService.getAllSortByIssue();
    }
    
    //get endpint to return all tickets sort by City
    @Get('/all/tickets/City')
    async getAllSortByCity(){
        return this.apiTicketService.getAllSortByCity();
    }
    
    //get endpint to return all tickets sort by Status
    @Get('/all/tickets/Status')
    async getAllSortByStatus(){
        return this.apiTicketService.getAllSortBystatus();
    }
    
    //get endpint to return all tickets sort by Upvotes
    @Get('/all/tickets/Upvotes')
    async getAllSortByUpvotes(){
        return this.apiTicketService.getAllSortByUpvotes();
    }

    //get endpint to return all tickets dispatched
    @Get('/all/tickets/dispatched')
    async getAllDispatched(){
        return this.apiTicketService.getAllDispatched();
    }


    //creating tickets
    @Post('/create')
    async createTicket(@Body() ticket: TicketDto){
        return this.apiTicketService.createTicket(ticket);
    }

    //update ticket 
    @Put('/update/:id')
    async updateTicket(@Param() params,@Body() ticket: TicketDto):Promise<boolean> {
        return this.apiTicketService.updateTicket(parseInt(params.id),ticket);
    }

    //update ticket status
    @Put('/update/status/:id')
    async updateTicketStatus(@Param() params,@Body() status: string):Promise<boolean> {
        return this.apiTicketService.updateTicketStatus(parseInt(params.id),status["status"]);
    }

    //update ticket createdate
    @Put('/update/createdate/:id')
    async updateTicketCreateDate(@Param() params,@Body() createDate: Date):Promise<boolean>{
        return this.apiTicketService.updateTicketCreateDate(parseInt(params.id),createDate["createDate"]);
    }

    //update ticket street address
    @Put('/update/streetaddress/:id')
    async updateStreetAddress(@Param() params,@Body() address: string):Promise<boolean>{
        return this.apiTicketService.updateStreetAddress(parseInt(params.id),address["address"]);
    }

    //update ticket longitude
    @Put('/update/longitude/:id')
    async updateLongitude(@Param() params,@Body() long: number):Promise<boolean> {
        return this.apiTicketService.updateLongitude(parseInt(params.id),long["longitude"]);
    }

    //update ticket longitude
    @Put('/update/latitude/:id')
    async updateLatitudde(@Param() params,@Body() lat: number):Promise<boolean> {
        return this.apiTicketService.updateLatitude(parseInt(params.id),lat["latitude"]);
    }

    //update ticket closedate
    @Put('/update/closedate/:id')
    async updateTicketCloseDate(@Param() params,@Body() closeDate: Date):Promise<boolean> {
        return this.apiTicketService.updateTicketCloseDate(parseInt(params.id),closeDate["closeDate"]);
    }

    //update ticket type
    @Put('/update/type/:id')
    async updateTicketType(@Param() params,@Body() type: string):Promise<boolean> {
        return this.apiTicketService.updateTicketType(parseInt(params.id),type["type"]);
    }
  
    //update ticket location
    @Put('/update/location/:id')
    async updateTicketLocation(@Param() params,@Body() location: string):Promise<boolean> {
        return this.apiTicketService.updateTicketLocation(parseInt(params.id),location["location"]);
    }

    //update ticket cost
    @Put('/update/cost/:id')
    async updateTicketCost(@Param() params,@Body() cost: string):Promise<boolean> {
        return this.apiTicketService.updateTicketCost(parseInt(params.id),cost["cost"]);
    }

    //update ticket description
    @Put('/update/description/:id')
    async updateTicketDescription(@Param() params,@Body() description: string):Promise<boolean> {
        return this.apiTicketService.updateTicketDescription(parseInt(params.id), description["description"]);
    }

    //update ticket repair
    @Put('/update/repair/:id')
    async updateTicketRepairTime(@Param() params,@Body() repairTime: string):Promise<boolean> {
        return this.apiTicketService.updateTicketRepairTime(parseInt(params.id),repairTime["repairTime"]);
    }
    
    //update ticket upvotes
    @Put('/update/upvotes/:id')
    async updateTicketUpvotes(@Param() params,@Body() upvotes: string):Promise<boolean> {
        return this.apiTicketService.updateTicketUpVotes(parseInt(params.id),upvotes["upvotes"]);
    }
    //update ticket upvotes
    @Put('/update/assignedTeam/techTeam')
    async assignTechTeam(@Body() info: string,):Promise<boolean> {
        return this.apiTicketService.updateAssignedTechTeam(parseInt(info["ticketId"]),parseInt(info["techTeamId"]));
    }

    @Post('/close')
    async closeTicket(@Body() ticketNum: number):Promise<boolean> {
        return this.apiTicketService.closeTicket(ticketNum["ticketNum"]);
    }

    @Delete('/delete')
    async deleteTicket(@Body() ticketNum: number):Promise<boolean> {
        return this.apiTicketService.deleteTicket(ticketNum["ticketNum"]);
    
    }


    /////////////////////////////////////////////////
    //////////////Picture endpoints//////////////////
    /////////////////////////////////////////////////

    @Post('/upload')
    @UseInterceptors(
        FileInterceptor('photo', {
            storage : diskStorage(
                {
                    destination: Helper.destinationPath,
                    filename : Helper.customFileName
                }
            )
        }))
        
    uploadFile(@UploadedFile() file: Express.Multer.File){
        const response = {
            
            originalname: file.originalname,
            filename: file.filename,
        };
        return response;
        
    }

    //Create picture Endpoint
    //Provide ticket id to be linked
    @Post('/picture/create/:id')
    async createPicture(@Param() params,@Body() imgLink: string):Promise<boolean> {
        return this.apiTicketService.createPicture(parseInt(params.id),imgLink["imgLink"]);
    
    }

    //get Pictures of specified ticket
    @Get('/picture/:id')
    async getPictures(@Param() params){
        return this.apiTicketService.getPicture(parseInt(params.id));
    }

    //get Pictrues of specified ticket sorted according to newest picture
    @Get('/picture/sort/:id')
    async getAllPictures(@Param() params){
        return this.apiTicketService.getAllPictures(parseInt(params.id));
    }

    //update Picture endpoint
    @Put('/picture/update/:id')
    async updatePicture(@Param() params, @Body() imgLink : string): Promise<boolean>{
        return this.apiTicketService.updatePicture(parseInt(params.id),imgLink["imgLink"]);
        return true;
    }

    @Delete('/picture/delete')
    async deletePicture(@Body() PictureId: number):Promise<boolean> {
        return this.apiTicketService.deletePicture(PictureId["PictureId"]);
    }

    //////////////////////////////////////////////
    /////////////Subtask Endpoints////////////////
    //////////////////////////////////////////////

    //creating ticket subtasks
    @Post('/subtask/create/:id')
    async createSubtask(@Param() params,@Body() tasks){
        return this.apiTicketService.createSubtask(parseInt(params.id),tasks['taskDesc'],parseInt(tasks['taskStep']),tasks['taskStat']);
    }

    //get all subtasks of specific ticket
    @Get('/subtasks/:id')
    async getAllSubtasks(@Param() params){
       return this.apiTicketService.getAllSubtasks(parseInt(params.id));
    }

    //update subtask endpoint
    @Put('/subtask/update/:id')
    async updateSubtask(@Param() params, @Body() tasks): Promise<boolean>{
        return this.apiTicketService.updateSubtask(parseInt(params.id),parseInt(tasks['ticketId']),tasks['taskDesc'],parseInt(tasks['taskStep']),tasks['taskStat']);
    }

    //update subtask ticket endpoint
    @Put('/subtask/updateticket/:id')
    async updateSubtaskTicket(@Param() params, @Body() tasks): Promise<boolean>{
        return this.apiTicketService.updateSubtaskTicket(parseInt(params.id),parseInt(tasks['ticketId']));
    }
     
    //update subtask description endpint
    @Put('/subtask/update/desc/:id')
    async updateSubtaskDesc(@Param() params, @Body() tasks): Promise<boolean>{
        return this.apiTicketService.updateSubtaskDesc(parseInt(params.id),tasks["desc"]);
    }

    //update subtask step endpint
    @Put('/subtask/update/step/:id')
    async updateSubtaskStep(@Param() params, @Body() tasks): Promise<boolean>{
        return this.apiTicketService.updateSubtaskStep(parseInt(params.id),parseInt(tasks["step"]));
    }
   
    //update subtask status endpoint
    @Put('/subtask/update/status/:id')
    async updateSubtaskStatus(@Param() params, @Body() tasks): Promise<boolean>{
        return this.apiTicketService.updateSubtaskStatus(parseInt(params.id),tasks['stat']);
    } 
    
    //delete subtask endpoint
    @Delete('/subtask/delete')
    async deleteSubtask(@Body() taskId: number):Promise<boolean> {
        return this.apiTicketService.deleteSubtask(parseInt(taskId['taskId']));
    } 

}
