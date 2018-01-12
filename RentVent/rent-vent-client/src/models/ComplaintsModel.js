export class ComplaintsModel {
  constructor(cid,cDescription,cType,cStartDate,cEndDate,cCreatedBy,cUpdatedBy,cCreateOn,cUpdatedOn,cAddressDirection,cZip,cAddressLine1,cCaseGenerated,
    cpID,cCaseClosed,cCaseNumber,cResponseDays) {
    this.cid = cid;
    this.cDescription = cDescription;
    this.cType = cType;
    this.cStartDate = cStartDate;
    this.cEndDate = cEndDate;
    this.cCreatedBy = cCreatedBy;
    this.cUpdatedBy = cUpdatedBy;
    this.cCreateOn = cCreateOn;
    this.cUpdatedOn = cUpdatedOn;
    this.cAddressDirection = cAddressDirection;
    this.cZip = cZip;
    this.cAddressLine1 = cAddressLine1;
    this.cCaseGenerated = cCaseGenerated;
    this.cpID = cpID;
    this.cCaseClosed = cCaseClosed;
    this.cCaseNumber = cCaseNumber;
    this.cResponseDays = cResponseDays;
  }
}