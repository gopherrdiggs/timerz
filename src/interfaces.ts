export interface AvatarUrls {
  '16x16': string,
  '24x24': string,
  '32x32': string,
  '48x48': string
}

export interface User {
  key: string,
  name: string,
  avatarUrls: AvatarUrls,
  displayName: string,
  emailAddress: string,
  active: boolean
}

export interface Project {
  id: number,
  isPrivate: boolean,
  key: string,
  name: string,
  projectTypeKey: string,
  self: string,
  simplified: boolean,
  style: string,
  avatarUrls: AvatarUrls
}

export interface Field {
  id: string,
  key: string,
  name: string,
  custom: boolean
}

export interface Issue {
  id: number,
  key: string,
  fields: {
    summary: string,
    description: string
  },
  changelog: ChangeLog
}

export interface ChangeLog {
  histories: ChangeGroup[],
  maxResults: number,
  startAt: number,
  total: number
}

export interface ChangeGroup {
  id: number,
  author: User,
  created: string,
  items: ChangeItem[]
}

export interface ChangeItem {
  field: string,
  fieldId: string,
  fieldtype: string,
  from: string,
  fromString: string,
  to: string,
  toString: string
}

export interface ReportRawData {
  changeDate: string,
  changeTime: string,
  changedByUserName: string,
  issueKey: string,
  // issueSummary: string,
  fieldName: string,
  fieldFromValue: string,
  fieldToValue: string
}

export interface Report {
  changeDates: ReportChangeDate[]
}

export interface ReportChangeDate {
  changeDate: string,
  fieldChanges: ReportFieldChange[]
}

export interface ReportFieldChange {
  fieldName: string,
  issueChanges: ReportIssueChange[]
}

export interface ReportIssueChange {
  issueKey: string,
  // issueSummary: string,
  fieldFromValue: string,
  fieldToValue: string,
  changedByUserName: string,
  timeOfChange: string
}