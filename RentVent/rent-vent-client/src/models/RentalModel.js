export class RentalModel {
  constructor(rid,rPrice,rLeaseRequired,rStartDate,rEndDate,rLeaseDoc,rtid,rDepositRequired,rDepositAmount,rDepositReturnDate,
  	rDepositReturned,rAnnualIncrease,rApplicationFee,rIssues,rIssuesPhotos,rRentersInsurance,rUtilitiesCost,rProfitMargin,rCreatedBy,
  	rUpdatedBy,rCreatedOn,rUpdatedOn,prID,rTenants,rExpanded) {
    this.rid = rid;
    this.rPrice = rPrice;
    this.rLeaseRequired = rLeaseRequired;
    this.rStartDate = rStartDate;
    this.rEndDate = rEndDate;
    this.rLeaseDoc = rLeaseDoc;
    this.rtid = rtid;
    this.rDepositRequired = rDepositRequired;
    this.rDepositAmount = rDepositAmount;
    this.rDepositReturnDate = rDepositReturnDate;
    this.rDepositReturned = rDepositReturned;
    this.rAnnualIncrease = rAnnualIncrease;
    this.rApplicationFee = rApplicationFee;
    this.rIssues = rIssues;
    this.rIssuesPhotos = rIssuesPhotos;
    this.rRentersInsurance = rRentersInsurance;
    this.rUtilitiesCost = rUtilitiesCost;
    this.rProfitMargin = rProfitMargin;
    this.rCreatedBy = rCreatedBy;
    this.rUpdatedBy = rUpdatedBy;
    this.rCreatedOn = rCreatedOn;
    this.rUpdatedOn = rUpdatedOn;
    this.prID = prID;
    this.rTenants = rTenants;
    this.rExpanded = rExpanded;
  }
}