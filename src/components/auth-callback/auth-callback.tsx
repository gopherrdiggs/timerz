import { Component, Prop } from '@stencil/core';
import { MatchResults, RouterHistory } from '@stencil/router';

@Component({
  tag: 'auth-callback'
})
export class AuthCallback {
  
  @Prop() match: MatchResults;
  @Prop() code: string;
  @Prop() state: string;
  @Prop() history: RouterHistory;

  async componentWillLoad() {

    //ToDo: validate against state sent in with request
    // console.log('state:', this.history.location.query.state);

    // Get config
    let configFile = await fetch('/prod-config.json');
    let config = await configFile.json();

    console.log('Attempting to get auth token...');
    let getTokenResponse = await fetch(
      config.token_uri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'grant_type': config.grant_type,
          'client_id': config.client_id,
          'client_secret': config.client_secret,
          'code': this.history.location.query.code,
          'redirect_uri': config.redirect_uri
        })
      }
    );

    let authResponse = await getTokenResponse.json();
    console.log('Auth response: ', authResponse);

    localStorage.setItem('jia:token', authResponse.access_token);

    this.history.push('/home', {});
  }

  render() {
    return [

    ];
  }
}