import React, { Component } from "react";
import "jquery";

import "./Home.css";
import "../libs/font-awesome/css/font-awesome.css";
import "../libs/Ionicons/css/ionicons.css";
import "../libs/select2/css/select2.min.css";
import ReactGA from 'react-ga';
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";

export default class PrivacyPolicy extends Component {
   constructor(props) {
    super(props);

  }

  navigateToHomeScreen = event => {
    this.props.history.push("/home");
  }

  componentDidMount () {
      window.scrollTo(0, 0)
  }
  
  render() {

    return (

      <div>

      <Navbar fluid collapseOnSelect>
                <Navbar.Header>
                  <Navbar.Brand>
                    <Link to="/">Back to Login</Link>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
              </Navbar>

      <h1 dir="ltr">
          RentVent Privacy and Cookie Policy
      </h1>
      <p dir="ltr">
          Effective January 1, 2018.
      </p>
      <p dir="ltr">
          We, RentVent, Inc., a Delaware corporation with offices in California,
          explain in this Privacy and Cookie Policy how we process information that
          we receive via our website, emails, and mobile applications (collectively
          "RentVent") that link to this Privacy and Cookie Policy, as amended from
          time to time. This Privacy Policy describes how RentVent collects, uses,
          shares and secures the personal information you provide. It also describes
          your choices regarding use, access and correction of your personal
          information.
      </p>
      <p dir="ltr">
          This Privacy and Cookie Policy applies only to information we collect,
          process, and use through RentVent. This Privacy and Cookie Policy does not
          apply to information that we collect through other channels, such as
          information that we collect offline, from other websites or from emails you
          send us.
      </p>
      <h2 dir="ltr">
          Information We Collect and How We Use It
      </h2>
      <p dir="ltr">
          Personal Information that You Provide Us Actively
      </p>
      <p dir="ltr">
          When you fill out registration forms, submit reviews or provide us with
          other information actively, you will know what information we are
          collecting because you are actively submitting it. Because we change our
          offerings and features from time to time, the options you have to provide
          us with personal information also may change, but here are some examples of
          situations in which you may decide to provide personal information to us:
      </p>
      <ul>
          <li dir="ltr">
              <p dir="ltr">
                  Creating an account;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Signing up for email alerts;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Completing a form related to one of our products or services;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Leaving a property or landlord review;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Contacting us for technical support or customer service.
              </p>
          </li>
      </ul>
      <p dir="ltr">
          Depending on how you interact with RentVent, the personal information we
          collect from you may vary. For example, to create an account we may ask
          only for an email address and password. In other circumstances, such as
          when you complete a form related to a particular service offering, we may
          ask you to provide other information, which may include your name, phone
          number, and/or postal address. On a voluntary basis, you may also decide us
          to provide us more sensitive information such as your social security
          number; driver's license or other government-issued identification number,
          or payment information, including a bank account, credit or debit card
          number.You should not include sensitive data (such as, social security
          number, driver's license number, credit or debit card numbers, etc.) to
          RentVent, except where we specifically prompt you to provide such
          information.
      </p>
      <p dir="ltr">
          If you connect to RentVent using Facebook, Google+, or another social
          networking site (each a "Social Networking Site"), we will receive
          information that you authorize the Social Networking Site to share with us,
          including information about your friends and connections on that Social
          Networking Site. Any information that we collect from your Social
          Networking Site account may depend on the privacy settings you have set
          with the Social Networking Site, so please consult the Social Networking
          Site's privacy and data practices.
      </p>
      <p dir="ltr">
          Landlords that have claimed their profile may provide us with email
          addresses of their Tenants for us to use to send an email encouraging those
          Tenants to leave candid reviews of the Landlord on RentVent. Email
          addresses obtained in this manner are used solely for the purposes
          authorized by the Landlord.
      </p>
      <p dir="ltr">
          Information We Collect by Automated Means
      </p>
      <p dir="ltr">
          When you use RentVent, your device is automatically providing information
          to us so we can respond and customize our response to you. The type of
          information we collect by automated means may vary, but generally includes
          technical information about your computer, such as your IP address or other
          device identifier, the type of device you use, and operating system
          version. The information we collect also may include usage information and
          statistics about your interaction with RentVent. That information may
          include the URLs of our web pages that you visited, URLs of referring and
          exiting pages, page views, time spent on a page, number of clicks, platform
          type, location data, and other information about how you used RentVent.
      </p>
      <p dir="ltr">
          Automated means of data collection include the following:
      </p>
      <p dir="ltr">
          Web Browser. When you visit a RentVent website, your browser automatically
          sends us your Internet protocol ("IP") address so that the web pages you
          request can be sent to your computer or device. We use your IP address to
          determine additional information, such as whether the computer or device
          has ever been used to visit RentVent before, which RentVent features were
          used the most often, and how much time was spent on a page.
      </p>
      <p dir="ltr">
          Web Beacons and Log Files. We use "web beacons" (also known as Internet
          tags, pixel tags, tracking pixels, and clear GIFs) on our websites and
          those of certain of our advertising clients. These web beacons allow us and
          third parties to collect information such as the IP address of the device,
          the URL of the web page, the time the page was viewed, the type of browser
          used, and any additional information in cookies that may have been set by
          the third party. The information is typically collected in log files, which
          generally track traffic on our websites. We use this information for a
          variety of purposes, including the management of our online advertising by
          establishing which ads brought users to our websites. The information also
          is used for analytical purposes and to manage technical issues that may
          arise. We do not attempt to identify individual users through this
          information.
      </p>
      <p dir="ltr">
          Cookies. We also collect, process and/or use information using cookies or
          similar technologies to help us identify you when you visit RentVent and we
          may share cookies with third-party advertisers or advertising networks to
          serve you relevant, targeted ads. For more information on cookies and
          similar tracking mechanisms, how we use them, and how you can control them,
          please see the section entitled Cookie Policy and Ad Choices.
      </p>
      <p dir="ltr">
          Mobile Device ID. If you access or use the RentVent Website on your mobile
          telephone or other mobile device, including tablets, we collect mobile
          device identifiers and IP Address. We may create and assign to your device
          an identifier that is similar to an account number. We may collect the
          device type and any other information you choose to provide, such as user
          name, geolocation or email address.
      </p>
      <p dir="ltr">
          Mobile Analytics. We use mobile analytics software to allow us to better
          understand the functionality of our mobile software on your phone. This
          software may record information such as how often you use the application,
          the events that occur within the application, aggregated usage, performance
          data, and from where the application was downloaded. We do not link the
          information we store within the analytics software to any personally
          identifiable information you submit within the mobile application.
      </p>
      <p dir="ltr">
          Location Data.. If you access RentVent using a mobile device, we we may
          collect your physical location if you have enabled this feature. Even if
          you are not using a mobile device, information about your general location
          may be discernable from your device's IP address or the URLs we receive.
      </p>
      <p dir="ltr">
          Information We Collect By Other Means
      </p>
      <p dir="ltr">
          We may receive information about your activity on and off RentVent from our
          affiliates, advertisers, partners and other third parties.
      </p>
      <p dir="ltr">
          Information Third Parties Collect from RentVent
      </p>
      <p dir="ltr">
          Via "web beacons" (also known as Internet tags, pixel tags, tracking
          pixels, and clear GIFs) on our website, third parties can collect
          information such as the IP address of the device, the URL of the web page,
          the time the page was viewed, the type of browser used, and any additional
          information in cookies that may have been set by the third party.
      </p>
      <p dir="ltr">
          Our partners also use cookies or similar technologies to analyze trends,
          administer the website, track users' movements around the website, and to
          gather demographic information about our user base as a whole. You can
          control the use of cookies at the individual browser level, but if you
          choose to disable cookies, it may limit your use of certain features or
          functions on our website or service.
      </p>
      <p dir="ltr">
          If you respond to ads posted by third parties or submit information to
          third parties via RentVent, such third parties receive information about
          you subject to their privacy policies.
      </p>
      <p dir="ltr">
          If you come to RentVent through social media sites, from other websites or
          with devices that enable third parties to collect information from or about
          you, such third parties receive information about you subject to their
          privacy policies.
      </p>
      <p dir="ltr">
          Do Not Track Signals
      </p>
      <p dir="ltr">
          We do not currently respond to 'do not track' signals and similar settings
          or mechanisms. When you use RentVent, we try to provide a customized
          experience.
      </p>
      <p dir="ltr">
          How We Use Information
      </p>
      <p dir="ltr">
          We may use the information we collect:
      </p>
      <ul>
          <li dir="ltr">
              <p dir="ltr">
                  to provide you with personalized content, services offered by
                  RentVent as well as promotional content and services;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  to moderate and display the landlord reviews, property reviews,
                  landlord and property data and other content you have submitted for
                  the benefit of our other users;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  to customize and improve the features, performance, and support of
                  the site;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  to show you relevant information, if you connect to RentVent
                  through a Social Networking Site, from your Social Networking Site
                  friends and connections, and to allow you to share job and profile
                  information with them;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  to provide relevant advertising, including interest-based
                  advertising from us and third parties, which may mean that we share
                  non-personally identifiable information to third-party advertisers;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  for internal operations, including troubleshooting, data analysis,
                  testing, research, and service improvement;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  to communicate with you regarding our services;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  to analyze use of RentVent and improve RentVent;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  to create aggregate and statistical data that does not identify you
                  individually and that we can commercialize;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  for other purposes that you separately authorize as you interact
                  with RentVent.
              </p>
          </li>
      </ul>
      <p dir="ltr">
          When you set up an individual user account on RentVent, we create a member
          profile (a "Profile") for you that will include personal information you
          provide. We will update your Profile with information we extract on
          RentVent. You may permit us to share information in your Profile with
          prospective landlords and others. Subject to visibility settings that you
          control, subscribers to services we may introduce will be able to view
          information in your Profile. Because your anonymity on RentVent is
          important, your Profile does not include or link to information about the
          reviews you submit to RentVent.
      </p>
      <h2 dir="ltr">
          How We Share Information
      </h2>
      <p dir="ltr">
          We do not disclose your individual account or usage data to third parties,
          except as follows:
      </p>
      <ul>
          <li dir="ltr">
              <p dir="ltr">
                  With your consent;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  We use affiliated and unaffiliated service providers all over the
                  world that help us deliver our service and run our business subject
                  to strict confidentiality agreements. These companies are
                  authorized to use your personal information only as necessary to
                  provide these services to us;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  We share aggregated usage statistics that cannot be used to
                  identify you individually;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  We will disclose data if we believe in good faith that such
                  disclosure is necessary (1) to comply with relevant laws or to
                  respond to subpoenas or warrants or legal process served on us; (2)
                  to enforce our RentVent Terms of Use and Privacy Policy; (3) when
                  we believe disclosure is necessary or appropriate to prevent
                  physical harm or financial loss or in connection with an
                  investigation of suspected or actual illegal activity; or (4) as we
                  otherwise deem necessary to protect and defend the rights or
                  property of us, the users of our services, or third parties. Our
                  general procedure with respect to civil subpoenas and
                  properly-served demands requesting user data is to require a court
                  order, binding on RentVent, before we release such information;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  In a reorganization or sale of our company or assets, your data may
                  be transferred, subject to the acquirer accepting the commitments
                  made in this Privacy and Cookie Policy and compliance with
                  applicable law;
              </p>
          </li>
      </ul>
      <br/>
      <ul>
          <li dir="ltr">
              <p dir="ltr">
                  We may share certain information that does not identify you
                  personally, but which is unique to your use of RentVen that you
                  have entered at the time of registration or on your profile.
              </p>
          </li>
      </ul>
      <h2 dir="ltr">
          Cookie Policy and Ad Choices
      </h2>
      <p dir="ltr">
          This Cookie policy describes how RentVent, Inc.("we", "our", "us") uses
          Cookies and similar technologies. For more information on our general data
          privacy practices, please see our Privacy Policy.
      </p>
      <p dir="ltr">
          Cookies
      </p>
      <p dir="ltr">
          Cookies are small pieces of data that are stored on your computer, mobile
          phone, or other device when you first visit a page. We use cookies, web
          beacons, locally shared objects (sometimes called "flash cookies"), mobile
          identifiers and similar technologies ("Cookies") to help us recognize you
          on RentVent, enhance your user experience, understand RentVent usage, and
          show you relevant advertising. By visiting RentVent, you consent to their
          placement in your browser in accordance with this Privacy and Cookie
          Policy. Cookies may also be set by other websites or services that run
          content on the page you're visiting. After you register on RentVent, we may
          connect information we collect from the Cookies set by us and our partners
          with other information received from you.
      </p>
      <p dir="ltr">
          What types of Cookies do we use?
      </p>
      <p dir="ltr">
          We use two types of Cookies on RentVent: "session cookies" and "persistent
          cookies." Session Cookies are temporary Cookies that remain on your device
          until you leave RentVent. A persistent Cookie remains on your device for
          much longer until you manually delete it (how long the Cookie remains will
          depend on the duration or "lifetime" of the specific Cookie and your
          browser settings).
      </p>
      <p dir="ltr">
          What are Cookies used for?
      </p>
      <p dir="ltr">
          Cookies may transmit information about you and your use of RentVent, such
          as your browser type, search preferences, data relating to advertisements
          that have been displayed to you or that you have clicked on, and the date
          and time of your use. With the exception of an identifier Cookie that we
          associate with registered accounts to prevent fraud by RentVent members,
          data stored in Cookies is anonymous and is not linked to your personally
          identifiable information without your permission (such Cookies may link to
          certain unique, non-personally identifiable information such as the job
          titles that you entered at time of registration or on your profile, but
          this is not linked to your name or any personally identifiable
          information).
      </p>
      <p dir="ltr">
          We use Cookies for things like:
      </p>
      <p dir="ltr">
          Purpose / Explanation
      </p>
      <p dir="ltr">
          Authentication
      </p>
      <p dir="ltr">
          We use Cookies to help us determine whether or not you've signed in to
          RentVent and to keep you signed in during visits as you access different
          pages.
      </p>
      <p dir="ltr">
          Security
      </p>
      <p dir="ltr">
          We use Cookies to enable and support security features, prevent fraud, and
          protect your data from unauthorized access.
      </p>
      <p dir="ltr">
          Preferences and Features
      </p>
      <p dir="ltr">
          We use Cookies to enable features, help us provide you with personalized
          content such as showing you your recent search activity.
      </p>
      <p dir="ltr">
          Advertising
      </p>
      <p dir="ltr">
          We use Cookies to deliver, evaluate and improve advertising, such as by
          using information about you to provide relevant advertising both on and off
          RentVent. Our partners may use a cookie to determine whether you've already
          been shown an ad or how it performed, or provide us with information about
          how you interacted with an ad.
      </p>
      <p dir="ltr">
          Analytics and Performance
      </p>
      <p dir="ltr">
          We use Cookies to analyze how our visitors use RentVent and to monitor site
          performance. These Cookies help us to identify and fix errors, understand
          and improve services, research and test out different features, and monitor
          how our visitors reach our sites.
      </p>
      <br/>
      <p dir="ltr">
          Ad Choices and Managing Cookies
      </p>
      <p dir="ltr">
          RentVent works with several third parties to provide you with personalized,
          interest-based advertising. We may target ads to you on and off RentVent
          using:
      </p>
      <ul>
          <li dir="ltr">
              <p dir="ltr">
                  Cookies (both on and off RentVent);
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Location information, to the extent you have enabled location
                  tracking on your mobile device;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Member-provided profile information;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Your use of RentVent (for example, your RentVent search history);
                  and
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Information from third-parties (including advertising partners,
                  publishers, and data aggregators) which we use to help deliver
                  relevant ads to you.
              </p>
          </li>
      </ul>
      <p dir="ltr">
          We work with third parties, such as Google Analytics, to provide analytics
          services that may use the Cookies set on your device to measure the
          performance of advertising and track traffic to RentVent generally. In
          addition, we have implemented
          <a href="https://support.google.com/analytics/answer/2799357?hl=en">
              Google Analytics Demographics and Interest Reporting
          </a>
          , which categorizes cookie information so that we and third-party service
          providers can better deliver advertisements that are relevant and useful to
          you on RentVent and various websites across the internet. You may opt out
          of tracking by Google Analytics and Google Analytics Demographics and
      Interest Reporting services by visiting    <a href="https://www.google.com/settings/u/0/ads">Google Ads Settings</a>
          or by downloading the
          <a href="https://tools.google.com/dlpage/gaoptout">
              Google Analytics Opt-Out Browser Add-on
          </a>
          .
      </p>
      <p dir="ltr">
          You may be able to opt out of other third-party advertiser and ad network
          placement of Cookies or targeted advertising by visiting the following
          links:
          <a href="http://www.networkadvertising.org/choices/">
              Network Advertising Initiative
          </a>
          ,
          <a href="http://www.aboutads.info/choices/">
              Digital Advertising Alliance
          </a>
          ;
          <a href="http://www.youronlinechoices.eu/">
              European Interactive Digital Advertising Alliance
          </a>
          (for users in the EU);
          <a href="http://youradchoices.ca/choices">
              The Digital Advertising Alliance of Canada
          </a>
          (for users in Canada); or by following opt-out instructions of the
          advertising networks, analytics providers and other advertising third
      parties we work with listed    <a href="https://www.glassdoor.com/about/privacy-third-party.htm">here</a>.
          You will continue to receive generic ads by companies not listed with these
          opt-out tools.
      </p>
      <p dir="ltr">
          You may also be able to disable placement of some (but not all) Cookies by
          setting your browser to decline cookies, though this may worsen your user
          experience. If you delete your browser cookies, your opt-out cookie will
          also be deleted. Additionally, if you change computers or web browsers, you
          will need to opt out again.
      </p>
      <p dir="ltr">
          If you enable location data for the mobile version of RentVent (including
          any version installed as a native application), you are expressly agreeing
          that we may use your location data to serve you geo-targeted ads and offers
          for businesses and landlords that are local to you. In such instances, we
          do not share your location with the advertiser or advertising network,
          rather, we provide the advertiser or advertising network with a means to
          push ads through to users located in certain areas or zip codes. You may
          disable location services at any time in your device privacy settings or
          the RentVent native app settings.
      </p>
      <p dir="ltr">
          Please note: if ads or other features on RentVent are provided by third
          parties, those parties also may set and use their own Cookies that are
          subject to those third parties' privacy notices and policies. RentVent does
          not have access to, or control over, these Cookies.
      </p>
      <h2 dir="ltr">
          Other Important Privacy Information
      </h2>
      <p dir="ltr">
          Choices Regarding Your Personal Information
      </p>
      <p dir="ltr">
          Upon request RentVent will provide you with information about whether we
          hold any of your personal information. You may access, correct, or request
          deletion of your personal information by contacting us at
          privacy@vent.rent. We will respond to your request within a reasonable
          timeframe.
      </p>
      <p dir="ltr">
          You can manage your account settings in the "Account Settings" page on
          RentVent. We provide you with the opportunity to 'opt-out' of having your
          personally identifiable information used for certain purposes and to
          unsubscribe from newsletters and marketing emails.
      </p>
      <p dir="ltr">
          We may send you notifications, promotional communications, or other
          messages using the contact information (e.g., your e-mail address, your
          mobile device identifier) you provided to us when you registered or when
          you requested information from us. You may opt-out of continuing to receive
          optional messages by following the instructions included in each message.
          Also, you can control most of the e-mails you receive from us by editing
          your e-mail preferences within "My Account" settings on the site; provided
          you will need to separately opt-out of receiving our various blog post
          update emails by unsubscribing to each blog. You release us from any
          responsibility for communications you do not receive.
      </p>
      <p dir="ltr">
          We may send you service-related announcements when we believe it is
          necessary to do so. Generally, you may not opt-out of these announcements,
          which are not primarily promotional in nature. If you do not wish to
          receive these announcements, you have the option to deactivate your
          account.
      </p>
      <p dir="ltr">
          In some cases, you can stop or limit the information we collect by
          automated means. To learn more about how you may be able to stop or limit
          our receipt of that information please review the section entitled Cookie
          Policy and Ad Choices.
      </p>
      <p dir="ltr">
          Close Your Account
      </p>
      <p dir="ltr">
          If you'd like to delete your RentVent account entirely, you can do so
          within your Account Settings on RentVent. Upon account deletion you will no
          longer have full access to reviews although any reviews you submitted will
          remain active on the site. Any personal information collected will be
          deleted from our active databases but may remain in our archives to comply
          with our legal obligations, resolve disputes and enforce our agreements.
      </p>
      <p dir="ltr">
          Security Safeguards
      </p>
      <p dir="ltr">
          Security. We employ physical, electronic, and managerial measures to
          safeguard the information we collect online. However, no company can fully
          eliminate security risks, so we cannot make guarantees about any part of
          our services. You are responsible for keeping your username and password
          secret. Once you have registered with us, we will never ask you for your
          password. Please create a unique password for RentVent and do not use it
          for any other web services or applications. Do not share your password with
          anyone else.
      </p>
      <p dir="ltr">
          If you enter credit card information on RentVent in connection with a
          purchase, that information is sent directly from your browser to the
          third-party service provider we use to manage credit card processing and we
          do not store it on our servers. The service provider is not permitted to
          use the information you provide except for the sole purpose of credit card
          processing on our behalf.
      </p>
      <p dir="ltr">
          Privacy of Minors. RentVent is not intended for minors. Minors must obtain
          parental consent to use RentVent. Minors under 13 years of age are
          expressly prohibited from using RentVent or providing any personal
          information. If you become aware that a child has provided us with personal
          information without parental consent, please contact us at
          privacy@vent.rent. If we become aware that a child under 13 has provided us
          with personal information without parental consent, we remove such
          information and terminate the child's account.
      </p>
      <p dir="ltr">
          California Residents
      </p>
      <p dir="ltr">
          California Civil Code Section 1798.83 permits our users who are California
          residents to request and obtain from us a list of what personal information
          (if any) we disclosed to third parties for direct marketing purposes in the
          preceding calendar year and the names and addresses of those third parties.
          Requests may be made only once a year and are free of charge.
      </p>
      <p dir="ltr">
          Data Controller
      </p>
      <p dir="ltr">
          The information about you that we collect through RentVent is controlled by
          RentVent, Inc. This information is stored in the United States..
      </p>
      <p dir="ltr">
          Updates to Our Privacy Policy
      </p>
      <p dir="ltr">
          We may revise this Privacy and Cookie Policy from time to time by posting
          an updated version on RentVent. The revised Privacy and Cookie Policy will
          be effective immediately for unregistered users and users registering
          accounts on or after the revision date. For users who registered accounts
          before the revision date, it will become effective thirty (30) days after
          the revision date If we make a change that we believe materially reduces
          your rights or increases your responsibilities we will notify you by email
          (sent to the e-mail address specified in your account) or by means of a
          notice on this website prior to the change becoming effective. We may
          provide notice of changes in other circumstances as well. We encourage you
          to periodically review this page for the latest information on our privacy
          practices. Your continued use of RentVent is subject to the most current
          effective version of these Privacy and Cookie Policy.
      </p>
      <p dir="ltr">
          Contact Us
      </p>
      <p dir="ltr">
          If you have any questions or suggestions regarding our Privacy and Cookie
      Policy please contact us    <a href="http://help.glassdoor.com/ContactUs/en_US">here</a>.
      </p>
      <p dir="ltr">
          RentVent, Inc
      </p>
      <p dir="ltr">
          Attn: Legal Department
      </p>
      <p dir="ltr">
          100 Shoreline Highway
      </p>
      <p dir="ltr">
          Mill Valley, CA 94941
      </p>
      <p dir="ltr">
          USA
      </p>
      <br/>

      </div>
    );
  }
}