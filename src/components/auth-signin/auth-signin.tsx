import { Component } from "@stencil/core";

@Component({
  tag: 'auth-signin',
  shadow: false
})
export class AuthSignin {

  private audience = 'api.atlassian.com';
  private client_id = 'C2oRUn55a300fpkPqBSGSE6J2TPrPkVS';
  private scope = 'read:jira-user read:jira-work';
  private redirect_uri = 'http://gifted-dijkstra-5dbe3f.netlify.com/callback';
  private state = 'lLf9flFS89FSLsf8h';
  private response_type = 'code';
  private prompt = 'consent';

  private authUri = `
https://auth.atlassian.com/authorize
?audience=${this.audience}
&client_id=${this.client_id}
&scope=${this.scope}
&redirect_uri=${this.redirect_uri}
&state=${this.state}
&response_type=${this.response_type}
&prompt=${this.prompt}
`;

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