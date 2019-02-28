import { Component, State } from '@stencil/core';
import { TimerSegment } from '../../interfaces';

@Component({
  tag: 'app-home'
})
export class AppHome {

  @State() timerSegments: TimerSegment[] = [];

  componentWillLoad() {

    let segments: TimerSegment[] = [
      { name: 'Segment 1', duration: 3, active: false },
      { name: 'Segment 2', duration: 10, active: false },
      { name: 'Segment 3', duration: 5, active: false }
    ]

    this.timerSegments = segments;
  }
  
  onStartTimerClick() {

    let audioElem = document.getElementById('audioElem') as HTMLAudioElement;
    audioElem.play();
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color='primary'>
          <ion-title>Timerz</ion-title>
        </ion-toolbar>
        <ion-toolbar color='secondary'>
          <ion-title>Segments</ion-title>
          <ion-buttons slot='end'>
            <ion-button slot='end' fill='solid' color='primary'>
              Add
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,
      <ion-content padding>
        <ion-list>
          { this.timerSegments.map(segment =>
            <timer-segment name={segment.name} 
                           duration={segment.duration} 
                           active={segment.active} />  
          )}
        </ion-list>
      </ion-content>,
      <ion-footer>
        <ion-toolbar >
          <ion-button expand='block' size='large' shape='round'
                      fill='solid' color='primary'
                      onClick={()=>this.onStartTimerClick()}>
            Start Timer
          </ion-button>
        </ion-toolbar>
      </ion-footer>,
      <audio id="audioElem">
        <source src="assets/sounds/ship-bell.mp3" type="audio/ogg" />
      </audio>
    ];
  }
}
