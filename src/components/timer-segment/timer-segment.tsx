import { Component, Prop, State } from "@stencil/core";

@Component({
  tag: 'timer-segment'
})
export class TimerSegment {

  @Prop() active: boolean = false;
  @Prop() name: string = 'Segment 1';
  @Prop() duration: number = 3;
  @Prop() durationType: string = 'minutes';

  @State() _active: boolean;
  @State() _duration: number;

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
        <ion-progress-bar value={0.5}></ion-progress-bar>
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