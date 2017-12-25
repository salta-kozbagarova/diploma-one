import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit, AfterViewInit {

  @Input() deadline: string;
  @Input() id: string;
  @Input() color: string;
  @Input() mini: boolean;
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(){
    var that = this;
    function getTimeRemaining(endtime) {
      var t = Date.parse(endtime) - Date.parse(new Date().toString());
      var seconds = Math.floor((t / 1000) % 60);
      var minutes = Math.floor((t / 1000 / 60) % 60);
      var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      var days = Math.floor(t / (1000 * 60 * 60 * 24));
      return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
      };
    }
    
    function initializeClock(id, endtime) {
      var clock = document.getElementById(that.id);
      var daysSpan = clock.querySelector('.days');
      var hoursSpan = clock.querySelector('.hours');
      var minutesSpan = clock.querySelector('.minutes');
      var secondsSpan = clock.querySelector('.seconds');
    
      function updateClock() {
        var t = getTimeRemaining(endtime);
    
        daysSpan.innerHTML = t.days.toString();
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
    
        if (t.total <= 0) {
          clearInterval(timeinterval);
        }
      }
    
      updateClock();
      var timeinterval = setInterval(updateClock, 1000);
    }
    
    var deadline = new Date(parseInt(that.deadline));
    initializeClock('countdown', deadline);
  }
}
