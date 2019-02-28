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
      </ion-header>,
      <ion-content>
        <ion-list>
          <ion-list-header>Timer Sections</ion-list-header>
          <ion-item>
            <ion-grid no-padding>
              <ion-row no-padding>
                <ion-col size='5' no-padding>
                  Section 1
                </ion-col>
                <ion-col size='5' no-padding>
                  3 min
                </ion-col>
                <ion-col size='2' no-padding>
                  <ion-button>
                    <ion-icon slot='icon-only' name='trash'></ion-icon>
                  </ion-button>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-item>
        </ion-list>
      </ion-content>,
      <ion-footer>
        <ion-toolbar color='secondary'>
          <ion-button expand='block' size='large' 
                      fill='solid' color='light'
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
