import { Component, OnInit } from "@angular/core";
import { ScheduleServiceService } from "../app/schedule-service.service";
@Component({
  selector: "schedule",
  templateUrl: "./schedule.component.html",
})
export class ScheduleComponent implements OnInit {
  itemsList = [];

  constructor(private scheduleService: ScheduleServiceService) {
    this.scheduleService.getSendGuest().subscribe((p) => {
      this.itemsList = p;
    });
  }
  ngOnInit() {}
}
