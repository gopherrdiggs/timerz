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
          'client_id': 'C2oRUn55a300fpkPqBSGSE6J2TPrPkVS',
          'client_secret': 'nZuqMPq2-Lc1IXUIQimTrIxOY1hDMWRHfJ7T_fmzCLFy17bqnj6A46gWsJ5gN467',
          'code': this.history.location.query.code,
          'redirect_uri': 'http://gifted-dijkstra-5dbe3f.netlify.com/home'
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