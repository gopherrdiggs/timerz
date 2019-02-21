import { Component, Prop, State, Listen } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { Field, Issue, Report, ReportRawData, ReportChangeDate, ReportFieldChange, ReportIssueChange } from '../../interfaces';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: false
})
export class AppHome {
  
  @Prop() history: RouterHistory;
  @State() enteredJql: string = '';
  @State() enteredFromDate: string = '';
  @State() enteredToDate: string = '';
  @State() fields: Field[] = [];
  @State() issues: Issue[] = [];
  @State() selectedFieldIds: string[] = [];
  @State() reportRawData: ReportRawData[] = [];
  @State() report: Report;
  @State() generatingReport: boolean = false;

  async componentDidLoad() {

    // console.log('Auth token available:', localStorage.getItem('jia:token'));
    // await this.getAccessibleResource();
    
    await this.loadFields();
  }

  /// Use this function to get the ID of the cloud instance
  async getAccessibleResource() {
    let getResourcesResponse = await fetch(
      'https://api.atlassian.com/oauth/token/accessible-resources', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jia:token'),
          'Accept': 'application/json'
        }
      }
    );

    let resources = await getResourcesResponse.json();
    // console.log('Resource: ', resources);

    localStorage.setItem('jia:cloudInstanceId', resources[0].id);
    // console.log('Project ID: ', localStorage.getItem('jia:cloudInstanceId'));
  }

  async getFields() {

    let getFieldsResponse = await fetch(
      `https://api.atlassian.com/ex/jira/${localStorage.getItem('jia:cloudInstanceId')}/rest/api/3/field`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jia:token'),
          'Accept': 'application/json'
        }
      }
    );

    if (getFieldsResponse.ok) {

      let fieldsResponse = await getFieldsResponse.json();
      
      let fields = fieldsResponse.sort((a, b) => {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
      });

      return fields;
    }
    else {

      console.log('Attempt to get field information failed:', await getFieldsResponse.text());
    }
  }

  async getJqlSearchResults(startAt: number = 0) {

    let jqlSearchRespose = await fetch(
      `https://api.atlassian.com/ex/jira/${localStorage.getItem('jia:cloudInstanceId')}/rest/api/3/search`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jia:token'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jql: this.enteredJql,
          fields: ['summary'],
          expand: ['changelog'],
          startAt: startAt
        })
      }
    );

    if (jqlSearchRespose.ok) {
      
      return await jqlSearchRespose.json();
    }
    else {

      console.log('Attempt to get issues page failed:', await jqlSearchRespose.text());
    }
  }

  async getIssues() {

    let issues: Issue[] = [];
    let searchResults = await this.getJqlSearchResults();
    // console.log('JQL Search Results: ', searchResults);

    // Set initial results to list being returned
    issues = searchResults.issues;

    let maxResults = searchResults.maxResults;
    let startAt = maxResults;

    // while additional pages to get...
    while (searchResults.total > issues.length) {

      let nextPageOfResults = await this.getJqlSearchResults(startAt);
      // console.log('Next Page of Results: ', nextPageOfResults);

      // Append additional results to list being returned
      issues.push(...nextPageOfResults.issues);

      // Modify the start index for the next request
      startAt = startAt + maxResults;
    }

    return issues;
  }

  async loadFields() {

    this.selectedFieldIds = [];
    let fields = await this.getFields();

    if (fields) {

      this.fields = fields;
    }
  }

  getReportChangeDateIndex(changeDate: string): number {

    if (!this.report.changeDates) {
      this.report.changeDates = [];
      return -1;
    }

    return this.report.changeDates.findIndex((itm) => {
      return itm.changeDate === changeDate;
    });
  }

  getFieldChangeIndex(changeDateIndex: number, fieldName: string) {

    if (!this.report.changeDates) {
      this.report.changeDates = [];
    }

    if (this.report.changeDates.length == 0 
        || changeDateIndex > this.report.changeDates.length) {
      return -1;
    }

    if (!this.report.changeDates[changeDateIndex]) {
      this.report.changeDates[changeDateIndex] = {} as ReportChangeDate;
      this.report.changeDates[changeDateIndex].fieldChanges = [];
      return -1
    }

    return this.report.changeDates[changeDateIndex].fieldChanges.findIndex((itm) => {
      return itm.fieldName === fieldName;
    });
  }

  async collectReportRawData() {

    this.reportRawData = [];

    if (this.issues) {

      for (let i = 0; i < this.issues.length; i++) {

        let issue = this.issues[i];

        if (issue.changelog && issue.changelog.histories && issue.changelog.histories.length > 0) {

          let matchingChangeGroups = issue.changelog.histories.filter((changeGroup) => {
            return Date.parse(changeGroup.created) > Date.parse(this.enteredFromDate) 
                && Date.parse(changeGroup.created) < Date.parse(this.enteredToDate + 'T23:59:59');
          });

          if (matchingChangeGroups && matchingChangeGroups.length > 0) {

            for (let j = 0; j < matchingChangeGroups.length; j++) {

              let changeGroup = matchingChangeGroups[j];
              let matchingChangeItems = changeGroup.items.filter((itm) => {
                return this.selectedFieldIds.findIndex((fldId) => {
                  return fldId === itm.fieldId;
                }) > -1;
              });

              if (matchingChangeItems && matchingChangeItems.length > 0) {

                for (let k = 0; k < matchingChangeItems.length; k++) {

                  let changeItem = matchingChangeItems[k];

                  if (changeItem.fromString != changeItem.toString) {

                    // Add record to raw data for report
                    this.reportRawData.push({
                      changeDate: changeGroup.created.substring(0, changeGroup.created.indexOf('T')),
                      changeTime: changeGroup.created.substring(changeGroup.created.indexOf('T') + 1, changeGroup.created.indexOf('.')),
                      changedByUserName: changeGroup.author.name,
                      issueKey: issue.key,
                      // issueSummary: issue.fields.summary,
                      fieldName: changeItem.field,
                      fieldFromValue: changeItem.fromString,
                      fieldToValue: changeItem.toString
                    });
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  async processReportRawData() {

    this.report = {} as Report;

    for (let i = 0; i < this.reportRawData.length; i++) {

      let rawData = this.reportRawData[i];

      let changeDateIndex = this.getReportChangeDateIndex(rawData.changeDate);
      if (changeDateIndex < 0) {
        // Add the change date to the report
        this.report.changeDates.push({
          changeDate: rawData.changeDate,
          fieldChanges: []
        });
        // Update the current change date index
        changeDateIndex = this.report.changeDates.length - 1;
      }

      let fieldChangeIndex = this.getFieldChangeIndex(changeDateIndex, rawData.fieldName);
      if (fieldChangeIndex < 0) {
        // Add the field change to the change date
        this.report.changeDates[changeDateIndex].fieldChanges.push({
          fieldName: rawData.fieldName,
          issueChanges: []
        });
        // Update the current field change index
        fieldChangeIndex = this.report.changeDates[changeDateIndex].fieldChanges.length - 1;
      }

      // Add the issue change
      this.report.changeDates[changeDateIndex].fieldChanges[fieldChangeIndex].issueChanges.push({
        issueKey: rawData.issueKey,
        fieldFromValue: rawData.fieldFromValue,
        fieldToValue: rawData.fieldToValue,
        changedByUserName: rawData.changedByUserName,
        timeOfChange: rawData.changeTime
      });
    }
  }

  async handleBeginSearchClick() {
    
    this.generatingReport = true;
    this.report = {} as Report;
    this.issues = [];

    this.issues = await this.getIssues();
    // console.log('Total issues found:', this.issues.length);
    
    await this.collectReportRawData();
    // console.log('Raw data: ', this.reportRawData);

    await this.processReportRawData();
    // console.log('Report data: ', this.report);

    this.generatingReport = false;
  }

  @Listen('ionChange')
  handleIonChange(event: any) {

    if (event && event.detail) {

      // console.log("ionChange:", event);
      if (event.target.id === 'fieldsSelect') {

        this.selectedFieldIds = event.detail.value;
        // console.log('Selected fields: ', this.selectedFieldIds);
      }
      else if (event.target.id === 'jql') {

        this.enteredJql = event.detail.value;
        // console.log('Entered JQL: ', this.enteredJql);
      }
      else if (event.target.id === 'fromDate') {

        this.enteredFromDate = event.detail.value;
        // console.log('Entered From Date: ', this.enteredFromDate);
      }
      else if (event.target.id === 'toDate') {

        this.enteredToDate = event.detail.value;
        // console.log('Entered To Date: ', this.enteredToDate);
        
      }
    }
  }

  renderReportIssueChangeSection(issueChange: ReportIssueChange) {
    if (issueChange) {
      return [
        <ion-item>
          <ion-label>
            <ion-grid no-padding>
              <ion-row no-padding>
                <ion-col>{ issueChange.issueKey }</ion-col>
                <ion-col>{ issueChange.fieldFromValue } &rarr; { issueChange.fieldToValue }</ion-col>
                <ion-col>by { issueChange.changedByUserName } at { issueChange.timeOfChange }</ion-col>
              </ion-row>
            </ion-grid>
          </ion-label>
        </ion-item>
      ];
    }
  }

  renderReportFieldChangeSection(fieldChange: ReportFieldChange) {
    return [
      <div>
        <ion-item-divider>{ fieldChange.fieldName }</ion-item-divider>
        { fieldChange && fieldChange.issueChanges
          ? fieldChange.issueChanges.map(issueChange =>
            this.renderReportIssueChangeSection(issueChange))
          : <div></div>
        }
      </div>
    ];
  }

  renderReportChangeDateSection(changeDate: ReportChangeDate) {
    return [
      <ion-list>
        <ion-list-header>
          <ion-label>
            <h2>{ changeDate.changeDate }</h2>
          </ion-label>
        </ion-list-header>
        { changeDate && changeDate.fieldChanges 
          ? changeDate.fieldChanges.map(fieldChange => 
              this.renderReportFieldChangeSection(fieldChange))
          : <div></div>
        }
      </ion-list>
    ];
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color='primary'>
          <ion-title>Jira Issue Auditor</ion-title>
        </ion-toolbar>
        <ion-toolbar color='secondary'>
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content id='homeContent'>
      <ion-card>
        <ion-card-header>Specify Filters</ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-label position='stacked'>JQL</ion-label>
            <ion-input id='jql' value={ this.enteredJql }></ion-input>
          </ion-item>
          <ion-grid no-padding>
            <ion-row no-padding>
              <ion-col no-padding>
                <ion-item>
                  <ion-label position='stacked'>From Date</ion-label>
                  <ion-input id='fromDate' type='date'
                             value={ this.enteredFromDate }></ion-input>
                </ion-item>
              </ion-col>
              <ion-col no-padding>
                <ion-item>
                  <ion-label position='stacked'>To (Thru) Date</ion-label>
                  <ion-input id='toDate' type='date' 
                             value={ this.enteredToDate }></ion-input>
                </ion-item>
              </ion-col>
            </ion-row>
          </ion-grid>
          <ion-item>
            <ion-label position='stacked'>Field/s</ion-label>
            <ion-select id='fieldsSelect' multiple
                        placeholder='Select field/s'>
              { this.fields.map((field) => 
                <ion-select-option value={field.id}>
                  {field.name}
                </ion-select-option>
              )}
            </ion-select>
          </ion-item>
          <ion-button onClick={()=>this.handleBeginSearchClick()}
                      disabled={ this.generatingReport }>
            Begin Search
          </ion-button>
          { this.generatingReport
            ? <ion-progress-bar type='indeterminate'></ion-progress-bar>
            : <div></div>
          }
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>Search Results { this.issues ? this.issues.length + ' issues' : '' }</ion-card-header>
        <ion-card-content>
          { this.report && this.report.changeDates 
            ? this.report.changeDates.map(changeDate =>
                this.renderReportChangeDateSection(changeDate)) 
            : <div></div>
          }
        </ion-card-content>
      </ion-card>
      </ion-content>
    ];
  }
}
