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
      <ion-content padding>
        <ion-list>
          <ion-list-header>Timer Sections</ion-list-header>
          <ion-item>
            <ion-grid no-padding>
              <ion-row no-padding>
                <ion-col size='5' no-padding>
                  <ion-item lines='none'>Segment 1</ion-item>
                </ion-col>
                <ion-col size='5' no-padding>
                  <ion-item lines='none'>
                    <ion-button slot='start' fill='clear' size='large'>
                      <ion-icon slot='icon-only' name='remove-circle-outline'></ion-icon>
                    </ion-button>
                    <h3>3</h3>
                    <ion-button fill='clear' size='large'>
                      <ion-icon slot='icon-only' name='add-circle-outline'></ion-icon>
                    </ion-button>
                  </ion-item>
                </ion-col>
                <ion-col size='2' no-padding>
                  <ion-item lines='none'>
                    <ion-button fill='clear'>
                      <ion-icon slot='icon-only' name='create'></ion-icon>
                    </ion-button>
                    <ion-button fill='clear'>
                      <ion-icon slot='icon-only' name='trash'></ion-icon>
                    </ion-button>
                  </ion-item>
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
