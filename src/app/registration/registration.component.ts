import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ScheduleServiceService } from "../app/schedule-service.service";

@Component({
  selector: "registration",
  templateUrl: "./registration.component.html",
})
export class RegistrationComponent {
  names: string = "";
  dates: string = "";
  items = [];

  constructor(private scheduleService: ScheduleServiceService) {}

  hotelForm = new FormGroup({
    names: new FormControl(""),
    dates: new FormControl(""),
  });

  generateList() {
    let guestNames;
    let guestDates;
    let guestInfo = [];
    let { names, dates } = this.hotelForm.value;

    guestNames = names.split("\n");
    guestDates = dates.split("\n");
    guestNames.map((name, index) => {
      let dates = guestDates[index].split("to");
      let dateCheckIn = new Date(dates[0]);
      let dateCheckOut = new Date(dates[1]);

      if (this.checkDates(dateCheckIn, dateCheckOut)) {
        guestInfo.push({
          name: name,
          checkIn: dates[0],
          checkOut: dates[1],
          differenceDays: this.getDateDiff(dateCheckIn, dateCheckOut),
        });
        this.scheduleService.sendGuest(guestInfo);
      } else {
        console.error(`no se puedo agregar el ${name}`);
      }
    });
  }

  checkDates(checkIn: Date, checkOut: Date) {
    if (checkIn.getTime() > checkOut.getTime()) {
      return false;
    }
    return true;
  }

  getDateDiff(checkIn: Date, checkOut: Date): object {
    let differenceDate = checkOut.getTime() - checkIn.getTime();
    let differenceDays = differenceDate / (1000 * 3600 * 24);

    let emptyArray = [];

    for (let index = 0; index < differenceDays; index++) {
      let any = new Date(checkIn);
      any.setDate(checkIn.getDate() + index);
      let anyConverted = any.toISOString().split("T")[0];
      emptyArray.push(anyConverted);
    }
    debugger;

    return emptyArray;
  }

  getItemsList() {}
}
