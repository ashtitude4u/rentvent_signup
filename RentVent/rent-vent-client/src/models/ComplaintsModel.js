export class ComplaintsModel {
  constructor(cid,cDescription,cType,cStartDate,cEndDate,cCreatedBy,cUpdatedBy,cCreateOn,cUpdatedOn) {
    this.cid = cid;
    this.cDescription = cDescription;
    this.cType = cType;
    this.cStartDate = cStartDate;
    this.cEndDate = cEndDate;
    this.cCreatedBy = cCreatedBy;
    this.cUpdatedBy = cUpdatedBy;
    this.cCreateOn = cCreateOn;
    this.cUpdatedOn = cUpdatedOn;
  }
}