export default {
  cognito: {
    USER_POOL_ID: "us-east-1_PdeTltNLI",
    APP_CLIENT_ID: "3kc73doqvgne3aabbt1mnlbtqt",
    IDENTITY_POOL_ID: "us-east-1:b03b2a95-d854-4654-a6b1-cf9dac5530d3",
    REGION: "us-east-1"
  },
  google:{
  	APP_ID:"99107107233-07vbkclu74ljtpma607p024q2n0i4f1d.apps.googleusercontent.com"
  },
  facebook:{
  	APP_ID:"1777119195915239"
  },
  apis:{
    LANDLORD_NAME_GET:"https://50sq1sgno7.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/landlord/search/",
    LANDLORD_ADDRESS_GET:"https://50sq1sgno7.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/landlord/address/",
    LANDLORD_LID_GET:"https://50sq1sgno7.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/landlord/",
    LANDLORD_PID_GET:"https://50sq1sgno7.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/landlord/property/",    
    PROPERTY_PID_GET:"https://50sq1sgno7.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/property/",
    PROPERTY_ADDRESS_GET:"https://50sq1sgno7.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/property/address/",
    RENTAL_GET:"https://50sq1sgno7.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/rental/",
    QUESTION_GET:"https://50sq1sgno7.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/question/{q_type}/{search_by}/{search_val}",
    COMPLAINTS_GET:"https://50sq1sgno7.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/Complaints/",
    QUESTIONNAIRE_POST:"https://50sq1sgno7.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/questionnaire",
    TENANT_POST:"https://50sq1sgno7.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/tenant"
  }
};