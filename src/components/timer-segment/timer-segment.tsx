import { Component, Element, Event, EventEmitter, Method, Prop, State } from "@stencil/core";

@Component({
  tag: 'timer-segment'
})
export class TimerSegment {

  @Element() el: HTMLElement;
  @Event() timerSegmentCompleted: EventEmitter;

  @Prop() active: boolean = false;
  @Prop() name: string = 'Segment 1';
  @Prop() duration: number = 3;
  @Prop() durationType: string = 'minutes';

  @State() _active: boolean;
  @State() _duration: number;
  @State() _progressValue: number;

  private secondsElapsed;
  private intervalTimerId;

  componentWillLoad() {

    this._active = this.active;
    this._duration = this.duration;
  }

  onIncrementClick() {

    if (this._duration < 60) {
      this._duration = this._duration + 1;
    }
  }

  onDecrementClick() {
    
    if (this._duration > 0) {
      this._duration = this._duration - 1;
    }
  }

  @Method()
  activate() {
    this._active = true;
  }

  @Method()
  deactivate() {
    this._active = false;
  }

  @Method()
  startSegmentTimer() {

    let timeoutSeconds = this.durationType === 'minutes'
      ? this._duration * 60
      : this._duration;

    this.secondsElapsed = 0;
    this.intervalTimerId = setInterval(() => {
      
      this.secondsElapsed = this.secondsElapsed + 1;
      this._progressValue = Math.ceil(this.secondsElapsed / timeoutSeconds * 100) / 100;
      
      if (this.secondsElapsed >= timeoutSeconds) {
        
        this.completeSegmentTimer();
      }
    }, 1000);
  }

  @Method()
  cancelSegmentTimer() {

    clearInterval(this.intervalTimerId);
  }

  completeSegmentTimer() {

    clearInterval(this.intervalTimerId);
    
    this.timerSegmentCompleted.emit();
  }

  onTimerStart() {

  }

  onTimerTick() {

  }

  render() {
    if (this._active) {
      return [
        <ion-item>
          <ion-label position='stacked'>{this.name} ({this.durationType})</ion-label>
          <ion-grid no-padding>
            <ion-row no-padding>
              <ion-col size='10' no-padding>
                <ion-grid no-padding>
                  <ion-row no-padding>
                    <ion-col size='4' no-padding>
                      <ion-button fill='clear' disabled
                                  onClick={()=>this.onDecrementClick()}>
                        <ion-icon slot='icon-only' name='remove-circle-outline'></ion-icon>
                      </ion-button>
                    </ion-col>
                    <ion-col size='4' no-padding>
                      <ion-input readonly value={this._duration.toString()}></ion-input>
                    </ion-col>
                    <ion-col size='4' no-padding>
                      <ion-button fill='clear' disabled
                                  onClick={()=>this.onIncrementClick()}>
                        <ion-icon slot='icon-only' name='add-circle-outline'></ion-icon>
                      </ion-button>
                    </ion-col>
                  </ion-row>
                </ion-grid>
              </ion-col>
              <ion-col size='2' no-padding>
                <ion-button fill='clear' disabled>
                  <ion-icon slot='icon-only' name='more'></ion-icon>
                </ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-item>,
        <ion-progress-bar value={this._progressValue}></ion-progress-bar>
      ];
    }
    else {
      return [
        <ion-item>
          <ion-label position='stacked'>{this.name} ({this.durationType})</ion-label>
          <ion-grid no-padding>
            <ion-row no-padding>
              <ion-col size='10' no-padding>
                <ion-grid no-padding>
                  <ion-row no-padding>
                    <ion-col size='4' no-padding>
                      <ion-button fill='clear'
                                  onClick={()=>this.onDecrementClick()}>
                        <ion-icon slot='icon-only' name='remove-circle-outline'></ion-icon>
                      </ion-button>
                    </ion-col>
                    <ion-col size='4' no-padding>
                      <ion-input type='number' value={this._duration.toString()}></ion-input>
                    </ion-col>
                    <ion-col size='4' no-padding>
                      <ion-button fill='clear'
                                  onClick={()=>this.onIncrementClick()}>
                        <ion-icon slot='icon-only' name='add-circle-outline'></ion-icon>
                      </ion-button>
                    </ion-col>
                  </ion-row>
                </ion-grid>
              </ion-col>
              <ion-col size='2' no-padding>
                <ion-button fill='clear'>
                  <ion-icon slot='icon-only' name='more'></ion-icon>
                </ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-item>
      ];
    }
  }
}