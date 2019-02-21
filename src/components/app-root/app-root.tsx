import { Component } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: false
})
export class AppRoot {

  configureRoutes() {
    return [
      <stencil-router id='mainRouter'>
        <stencil-route-switch scrollTopOffset={0}>
          <stencil-route 
            url='/' 
            component='auth-signin' 
            exact={true} />
          <stencil-route 
            url='/callback' 
            component='auth-callback' />
          <stencil-route 
            url='/home' 
            component='app-home' />
        </stencil-route-switch>
      </stencil-router>
    ];
  }

  render() {
    return (
      <div>
        { this.configureRoutes() }
        <main></main>
      </div>
    );
  }
}
