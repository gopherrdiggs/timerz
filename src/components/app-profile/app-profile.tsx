import { Component, Prop } from '@stencil/core';
import { MatchResults } from '@stencil/router';

@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.css',
  shadow: false
})
export class AppProfile {
  @Prop() match: MatchResults;

  render() {
    return [
      <ion-header>
        <ion-toolbar color='primary'>
          <ion-title>Profile Page</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-card>
        <ion-card-header>
          Profile Information
        </ion-card-header>
        <ion-card-content>
          <ion-item>Hello</ion-item>
        </ion-card-content>
      </ion-card>
    ];
  }
}
