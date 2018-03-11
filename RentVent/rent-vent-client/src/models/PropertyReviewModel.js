export class PropertyReviewModel {
  constructor(prid,prType,prCreatedDate,prtid,prDescription,prApproval,prRating,prTitle,prCondition,prCreatedBy,
    prUpdatedBy,prCreatedOn,prUpdatedOn,prCount,prtCity,prtState,prRental,prRentalArray,prRentalStyleArray,prRentalObj) {
    this.prid = prid;
    this.prType = prType;
    this.prCreatedDate = prCreatedDate;
    this.prtid = prtid;
    this.prDescription = prDescription;
    this.prApproval = prApproval;
    this.prRating = prRating;
    this.prTitle = prTitle;
    this.prCondition = prCondition;
    this.prCreatedBy = prCreatedBy;
    this.prUpdatedBy = prUpdatedBy;
    this.prCreatedOn = prCreatedOn;
    this.prUpdatedOn = prUpdatedOn;
    this.prCount = prCount;
    this.prtCity = prtCity;
    this.prtState = prtState; 
    this.prRental = prRental;
    this.prRentalArray = prRentalArray;
    this.prRentalStyleArray = prRentalStyleArray;
    this.prRentalObj = prRentalObj;
  }
}