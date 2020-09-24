import { Injectable } from "@angular/core";
import { Subject, Observable, BehaviorSubject } from "rxjs";

@Injectable()
export class ScheduleServiceService {
  private subject: Subject<any>;
  private BehaviorSubject: BehaviorSubject<any>;
  constructor() {
    this.subject = new Subject<any>();
    this.BehaviorSubject = new BehaviorSubject<string>("xd");
  }

  sendGuest(object: any) {
    console.log("esto imprime: ", object);
    this.subject.next(object);
    this.BehaviorSubject.next(object);
  }

  getSendGuest(): Observable<any> {
    return this.subject.asObservable();
  }
}
