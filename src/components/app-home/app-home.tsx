import { Component } from '@stencil/core';

@Component({
  tag: 'app-home'
})
export class AppHome {

  
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
          <ion-item>
            <ion-label position='stacked'>Segment 1</ion-label>
            <ion-grid no-padding>
              <ion-row no-padding>
                <ion-col size='10' no-padding>
                  <ion-grid no-padding>
                    <ion-row no-padding>
                      <ion-col size='4' no-padding>
                        <ion-button fill='clear'>
                          <ion-icon slot='icon-only' name='remove-circle-outline'></ion-icon>
                        </ion-button>
                      </ion-col>
                      <ion-col size='4' no-padding>
                        <ion-input value='3'></ion-input>
                      </ion-col>
                      <ion-col size='4' no-padding>
                        <ion-button fill='clear'>
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
          <ion-item>
            <ion-label position='stacked'>Segment 2</ion-label>
            <ion-grid no-padding>
              <ion-row no-padding>
                <ion-col size='10' no-padding>
                  <ion-grid no-padding>
                    <ion-row no-padding>
                      <ion-col size='4' no-padding>
                        <ion-button fill='clear'>
                          <ion-icon slot='icon-only' name='remove-circle-outline'></ion-icon>
                        </ion-button>
                      </ion-col>
                      <ion-col size='4' no-padding>
                        <ion-input value='10'></ion-input>
                      </ion-col>
                      <ion-col size='4' no-padding>
                        <ion-button fill='clear'>
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
        <source src="assets/sounds/alien-siren.mp3" type="audio/ogg" />
        
      </audio>
    ];
  }
}
