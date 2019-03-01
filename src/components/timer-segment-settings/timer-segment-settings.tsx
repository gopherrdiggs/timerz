import { Component, Prop, Listen, State } from "@stencil/core";

@Component({
  tag: 'timer-segment-settings'
})
export class TimerSegmentSettings {
  
  @Prop() name: string;
  @Prop() durationType: string;

  @State() _name: string;
  @State() _minutesChecked: boolean;
  @State() _secondsChecked: boolean;

  private modalController: HTMLIonModalControllerElement;

  componentWillLoad() {

    this._name = this.name;
    console.log("durationType received:", this.durationType);
    if (this.durationType && this.durationType === 'seconds') {
      this._secondsChecked = true;
    }
    else {
      this._minutesChecked = true;
    }

    this.modalController = document.querySelector('ion-modal-controller');
  }

  async onBackClick() {
    
    this.modalController.dismiss();
  }

  async onSaveClick() {

    this.modalController.dismiss({
      name: this._name,
      durationType: this._minutesChecked ? 'minutes' : 'seconds'
    });
  }

  @Listen('ionChange')
  onIonChange(event: any) {

    if (event && event.detail) {
      if (event.target.id === 'name') {
        this._name = event.detail.value;
      }
    }
  }

  @Listen('ionSelect')
  onRadioSelect(event: any) {

    if (event && event.detail) {
      if (event.target.id === 'minutesRadio') {
        this._minutesChecked = true;
        this._secondsChecked = false;
      }
      else {
        this._minutesChecked = false;
        this._secondsChecked = true;
      }
    }
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color='primary'>
          <ion-buttons slot='start'>
            <ion-button onClick={()=>this.onBackClick()}>
              <ion-icon slot='icon-only' name='arrow-round-back'></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-title>Segment Settings</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content padding>
        <ion-item>
          <ion-label position='stacked'>Name</ion-label>
          <ion-input id='name' value={this._name}></ion-input>
        </ion-item>
        <ion-list>
          <ion-radio-group>
            <ion-list-header>Duration Type</ion-list-header>
            <ion-item>
              <ion-label>Minutes</ion-label>
              <ion-radio id='minutesRadio' slot='start' 
                         value='minutes' checked={this._minutesChecked}></ion-radio>
            </ion-item>
            <ion-item>
              <ion-label>Seconds</ion-label>
              <ion-radio id='secondsRadio' slot='start' 
                        value='seconds' checked={this._secondsChecked}></ion-radio>
            </ion-item>
          </ion-radio-group>
        </ion-list>        
      </ion-content>,
      <ion-footer>
      <ion-toolbar >
        <ion-button expand='block' size='large' shape='round'
                    fill='solid' color='primary'
                    onClick={()=>this.onSaveClick()}>
          Save Settings
        </ion-button>
      </ion-toolbar>
    </ion-footer>
    ];
  }
}