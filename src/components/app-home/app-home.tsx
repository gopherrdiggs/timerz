import { Component, Listen, State } from '@stencil/core';
import { TimerSegment } from '../../interfaces';

@Component({
  tag: 'app-home'
})
export class AppHome {

  @State() timerSegments: TimerSegment[] = [];
  @State() currentSegmentIndex: number = 0;
  @State() timerInProgress: boolean;

  componentWillLoad() {

    let segments: TimerSegment[] = [
      { name: 'Segment 1', duration: 3, durationType: 'seconds', active: false },
      { name: 'Segment 2', duration: 10, durationType: 'seconds', active: false },
      { name: 'Segment 3', duration: 5, durationType: 'seconds', active: false }
    ]

    this.timerSegments = segments;
  }

  onAddSegmentClick() {

    let newSegment = {} as TimerSegment;
    newSegment.name = `Segment ${this.timerSegments.length + 1}`;
    newSegment.duration = 1;

    this.timerSegments = [...this.timerSegments, newSegment];
  }
  
  onStartTimerClick() {

    this.timerInProgress = true;
    this.currentSegmentIndex = 0;
    let segmentElem = document
      .getElementsByTagName('timer-segment')[this.currentSegmentIndex];
    if (segmentElem) {
      segmentElem.activate();
      segmentElem.startSegmentTimer();
    }
  }

  onCancelTimerClick() {

    this.timerInProgress = false;
    let segmentElem = document
      .getElementsByTagName('timer-segment')[this.currentSegmentIndex];
    if (segmentElem) {
      segmentElem.deactivate();
      segmentElem.cancelSegmentTimer();
    }
  }

  @Listen('body:timerSegmentCompleted')
  onTimerSegmentCompleted(_event: any) {

    let audioElem = document.getElementById('audioElem') as HTMLAudioElement;
    if (audioElem) {
      audioElem.load();
      audioElem.play();
    }

    let segmentElem = document
      .getElementsByTagName('timer-segment')[this.currentSegmentIndex];

    if (segmentElem) {
      segmentElem.deactivate();
    }

    this.currentSegmentIndex = this.currentSegmentIndex + 1;

    if (this.timerSegments.length > this.currentSegmentIndex) {

      this.timerSegments[this.currentSegmentIndex].active = true;
    }

    segmentElem = document
      .getElementsByTagName('timer-segment')[this.currentSegmentIndex];

    if (segmentElem) {
      segmentElem.activate();
      segmentElem.startSegmentTimer();
    }
    else {
      this.timerInProgress = false;
    }
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
            <ion-button slot='end' fill='solid' color='primary'
                        onClick={()=>this.onAddSegmentClick()}>
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
                           durationType={segment.durationType}
                           active={segment.active} />  
          )}
        </ion-list>
      </ion-content>,
      <ion-footer>
        <ion-toolbar >
          { this.timerInProgress
            ? <ion-button expand='block' size='large' shape='round'
                          fill='solid' color='primary'
                          onClick={()=>this.onCancelTimerClick()}>
                Stop Timer
            </ion-button>
            : <ion-button expand='block' size='large' shape='round'
                          fill='solid' color='primary'
                          onClick={()=>this.onStartTimerClick()}>
                Start Timer
              </ion-button>
          }
        </ion-toolbar>
      </ion-footer>,
      <audio id='audioElem'>
        <source src="assets/sounds/bell.ogg" type="audio/ogg" />
      </audio>
    ];
  }
}
