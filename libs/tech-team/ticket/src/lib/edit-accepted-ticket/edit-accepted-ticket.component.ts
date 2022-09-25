import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { TicketPictureDto } from '@grid-watch/api/ticket/api/shared/ticket-picture-dto';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Location } from '@angular/common';
import { TicketService, GoogleMapsService, SessionManagerService, ToastService } from '@grid-watch/shared-ui';

@Component({
	selector: 'grid-watch-edit-accepted-ticket',
	templateUrl: './edit-accepted-ticket.component.html',
	styleUrls: ['./edit-accepted-ticket.component.scss'],
})
export class EditAcceptedTicketComponent implements OnInit
{
	getAllURL = 'http://localhost:3333/api/ticket/';
	UpdateStatusURL = 'http://localhost:3333/api/ticket/update/status/';
	UpdateRepairURL = 'http://localhost:3333/api/ticket/update/repair/';
	UpdateCostURL = 'http://localhost:3333/api/ticket/update/cost/';
	getPictureURL = 'http://localhost:3333/api/ticket/picture/';

	hideRequiredControl = new FormControl(false);
	floatLabelControl = new FormControl('auto' as FloatLabelType);
	formOptions = this.formBuilder.group({
		hideRequired: this.hideRequiredControl,
		floatLabel: this.floatLabelControl,
	});

	estCost!: number;
	estTime!: number;
	issue_id!: string | null;
	ticket: TicketDto = new TicketDto();
	fieldArray: Array<any> = [];
	newAttribute: any = {};

	@Input() cost!: number;
	@Input() repair_time!: number;
	@Input() status!: string;

	constructor(
		private router: Router,
		private http: HttpClient,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private ticketService: TicketService,
		private sessionManager: SessionManagerService,
		private toastService: ToastService,
		private location: Location
	) { }

	ngOnInit(): void
	{
		this.issue_id = this.route.snapshot.paramMap.get('id');
		this.ticket.ticketImg = '';
		this.getAllURL += this.issue_id;
		this.UpdateStatusURL += this.issue_id;
		this.UpdateRepairURL += this.issue_id;
		this.UpdateCostURL += this.issue_id;
		if (this.issue_id)
			this.ticketService.getTicket(this.issue_id).subscribe((data) =>
			{
				this.ticket = data[0];
				this.ticket.ticketImg = '';
				this.status = this.ticket.ticketStatus;
				this.repair_time = this.ticket.ticketRepairTime;
				this.cost = this.ticket.ticketCost;
				this.loadImage();
			});
		this.getAverageRepairCost();
		this.getAverageRepairTime();
	}

	addFieldValue()
	{
		this.fieldArray.push(this.newAttribute)
		this.newAttribute = {};
	}

	deleteFieldValue(index: number)
	{
		this.fieldArray.splice(index, 1);
	}

	getFloatLabelValue(): FloatLabelType
	{
		return this.floatLabelControl.value || 'auto';
	}

	goBack(): void
	{
		this.location.back();
	}

	back(): void
	{
		this.router.navigateByUrl('/acceptedTickets');
	}

	update(): void
	{
		if (this.ticket.ticketCost != this.cost)
		{
			this.updateCost();
		}
		if (this.ticket.ticketRepairTime != this.repair_time)
		{
			this.updateRepairTime();
		}
		if (this.ticket.ticketStatus != this.status)
		{
			this.updateStatus();
		}
		this.createSubtasks()

		const techTeamId = this.sessionManager.getID();
		if (techTeamId)
			this.ticketService.assignTechTeam(this.ticket.ticketId, parseInt(techTeamId)).subscribe(
				(response) =>
				{
					// console.log(response);

				}
			)
		this.toastService.show('Successfully updated ticket',{
			classname: 'bg-success text-light',
			delay: 5000,
			autohide: true
		});

		this.router.navigateByUrl('/profile');

	}

	getAverageRepairCost()
	{
		this.ticketService.getAITicketCost(this.ticket).subscribe(
			(response) =>
			{
				this.estCost = response;
			}
		);
	}

	getAverageRepairTime()
	{
		this.ticketService.getAITicketTime(this.ticket).subscribe(
			(response) =>
			{
				this.estTime = response;
			}
		);
	}

	createSubtasks()
	{
		this.fieldArray.forEach(element => 
		{
			this.ticketService.createTicketSubtask(this.ticket.ticketId, "" + element.description, "" + element.step, "" + element.status).subscribe();
		});
	}

	updateRepairTime(): void
	{
		if (this.issue_id)
			this.ticketService.updateTicketRepairTime(this.issue_id, this.repair_time).subscribe(
				() => { return true },
				() => { return false }
			);
	}

	updateStatus(): void
	{
		if (this.issue_id)
			this.ticketService.updateTicketStatus(this.issue_id, this.status).subscribe(
				(resp) =>
				{
					// console.log(resp);

				}
			)
	}

	updateCost(): void
	{
		if (this.issue_id)
			this.ticketService.updateTicketCost(this.issue_id, this.cost).subscribe(
				(resp) =>
				{
					// console.log(resp);

				}
			)
	}

	showErrorMessage(edits: string): void
	{
		alert(edits);
	}

	showSuccessMessage(errors: string): void
	{
		alert(errors);
	}

	async loadImage(): Promise<void>
	{
		await this.delay(3000);
		this.getPictureURL += this.ticket.ticketId;
		this.http.get<TicketPictureDto[]>(this.getPictureURL).subscribe((data) =>
		{
			// console.log(data);
			if (data.length > 0)
			{
				this.ticket.ticketImg = data[0].pictureLink;
			}
			else
			{
				this.ticket.ticketImg = "image-solid.svg";
			}
		});
	}

	delay(ms: number)
	{
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
}
