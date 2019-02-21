import { Component } from "@stencil/core";

@Component({
  tag: 'auth-signin',
  shadow: false
})
export class AuthSignin {

  private authUri = '';

  async componentWillLoad() {

    let configFile = await fetch('/prod-config.json');
    let config = await configFile.json();
    this.authUri = `
${config.auth_uri}
?audience=${config.audience}
&client_id=${config.client_id}
&scope=${config.scope}
&redirect_uri=${config.redirect_uri}
&state=${config.state}
&response_type=${config.response_type}
&prompt=${config.prompt}
`;
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color='primary'>
          <ion-title>Jira Issue Auditor</ion-title>
        </ion-toolbar>
        <ion-toolbar color='secondary'>
          <ion-title>Authenticate</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-card>
        <ion-card-header>Connect to your Jira instance</ion-card-header>
        <ion-card-content>
          <ion-button href={this.authUri} >
            Authenticate
          </ion-button>
        </ion-card-content>
      </ion-card>
    ];
  }
}