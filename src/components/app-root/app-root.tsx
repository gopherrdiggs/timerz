import { Component } from '@stencil/core';

@Component({
  tag: 'app-root'
})
export class AppRoot {

  configureRoutes() {
    return [
      <ion-router useHash={false}>
        <ion-route url='/' component='app-home' />
      </ion-router>
    ];
  }

  render() {
    return (
      <ion-app>
        { this.configureRoutes() }
        <ion-toast-controller />
        <ion-modal-controller />
        <ion-nav main animated={false} />
      </ion-app>
    );
  }
}
