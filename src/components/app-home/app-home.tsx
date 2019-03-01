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

    this.timerSegments = [
      { name: 'Segment 1', duration: 3, durationType: 'seconds', active: false },
      { name: 'Segment 2', duration: 10, durationType: 'seconds', active: false },
      { name: 'Segment 3', duration: 5, durationType: 'seconds', active: false }
    ];
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

  @Listen('body:timerSegmentDeleteClicked')
  onTimerSegmentDeleteClicked(event: any) {
    
    this.timerSegments = this.timerSegments.filter((_segment, index) => {
      return index != event.detail.index;
    });
    
    let segmentsListElem = document.getElementById('segmentsList') as HTMLIonListElement;
    if (segmentsListElem) {
      segmentsListElem.closeSlidingItems();
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
            <ion-button slot='end' fill='solid' shape='round' color='primary'
                        onClick={()=>this.onAddSegmentClick()}>
              <ion-icon slot='icon-only' name='add'></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,
      <ion-content padding>
        <ion-list id='segmentsList'>
          { this.timerSegments.map((segment, index) =>
            <timer-segment index={index} 
                           name={segment.name} 
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
      <audio id='audioElem' src='assets/sounds/bell.mp3'></audio>
    ];
  }
}
