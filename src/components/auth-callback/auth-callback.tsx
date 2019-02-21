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

    // Incoming URL: /callback?code=t4IbEaAEsfjATw42&state=lLf9flFS89FSLsf8h
    // console.log('history:', this.history);
    // console.log('history.location:', this.history.location);
    // console.log('code:', this.history.location.query.code);
    //ToDo: validate against state sent in with request
    // console.log('state:', this.history.location.query.state);

    console.log('Attempting to get auth token...');
    let getTokenResponse = await fetch(
      'https://auth.atlassian.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'grant_type': 'authorization_code',
          'client_id': 'IroDFcYJSRJ4IpYAyV9pLRDI7xrIHoqt',
          'client_secret': '_rtf-EorT0_SbbCfRkUzfSPUBwLfIVVfxozBTT3G_hc6xZPlB3xkZ5_7eZ8_UGON',
          'code': this.history.location.query.code,
          'redirect_uri': 'http://localhost:3333/home'
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