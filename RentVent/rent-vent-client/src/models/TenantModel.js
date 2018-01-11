export class TenantModel {
  constructor(tid,tanonymous,tFirstName,tLastName,tEmail,tPhone,tAddressLine1,tAddressLine2,tZipCode,tCity,tState,tCountry,tPhotoId,tCreatedBy,
  	tUpdatedBy,tCreatedOn,tUpdatedOn) {
    this.tid = tid;
    this.tanonymous = tanonymous;
    this.tFirstName = tFirstName;
    this.tLastName = tLastName;
    this.tEmail = tEmail;
    this.tPhone = tPhone;
    this.tAddressLine1 = tAddressLine1;
    this.tAddressLine2 = tAddressLine2;
    this.tZipCode = tZipCode;
    this.tCity = tCity;
    this.tState = tState;
    this.tCountry = tCountry;
    this.tPhotoId = tPhotoId;
    this.tCreatedBy = tCreatedBy;
    this.tUpdatedBy = tUpdatedBy;
    this.tCreatedOn = tCreatedOn;
    this.tUpdatedOn = tUpdatedOn;
  }
}