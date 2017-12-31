import React, { Component } from "react";
import "jquery";

import "./Home.css";
import "../libs/font-awesome/css/font-awesome.css";
import "../libs/Ionicons/css/ionicons.css";
import "../libs/select2/css/select2.min.css";
import ReactGA from 'react-ga';
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";

export default class TermsofUse extends Component {
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
                </Navbar.Header>
              </Navbar>

      <p dir="ltr">
          RentVent Terms of Use
      </p>
      <p dir="ltr">
          Effective: January 1, 2018
      </p>
      <p dir="ltr">
          These Terms of Use (the "Terms") govern your access to and use of our
          websites, emails and mobile applications ("RentVent"). These Terms also
          include our Privacy and Cookie Policy. By accessing and using RentVent, you
          agree to comply with these Terms. If you are using RentVent on behalf of a
          company or other legal entity, then “you” also means such company or legal
          entity and you agree to be bound by these Terms even if we have separate
          agreement with you. You may not use RentVent if you do not agree to the
          version of the Terms posted on RentVent at the time you access RentVent.
          (The terms "we" and "us" refer to RentVent, Inc., a Delaware corporation.)
      </p>
      <p dir="ltr">
          Please note: These Terms require the use of arbitration on an individual
          basis to resolve disputes, rather than jury trials or class actions, and
          also limit the remedies available to you in the event of a dispute.
      </p>
      <ol>
          <li dir="ltr">
              <p dir="ltr">
                  Eligibility to Use RentVent
              </p>
          </li>
      </ol>
      <p dir="ltr">
          A. To access or use RentVent, (1) you must be 13 years of age or older and,
          if under 18 or the age of majority in your jurisdiction, your use of
          RentVent must be under the supervision of a parent or guardian or other
          responsible adult and (2) you, or (where applicable) the adult supervising
          your use of RentVent, must have the power and authority to enter into these
          Terms. A landlord and its authorized agent(s) are permitted to use the
          landlord’s account and any data about that landlord provided via that
          account for the landlord’s internal business purposes. Except as set forth
          above, or as otherwise approved by us, RentVent is for your personal,
          non-commercial use unless you enter into a separate agreement with us for
          your commercial use. You may not use RentVent if we have terminated your
          account or banned you.
      </p>
      <ol start="2">
          <li dir="ltr">
              <p dir="ltr">
                  Your RentVent Account
              </p>
          </li>
      </ol>
      <ol>
          <li dir="ltr">
              <p dir="ltr">
                  RentVent Account. In order for you to create a RentVent account, we
                  require that you provide a valid email address and set up a
                  password. The email you use must be one where we can reach you. In
                  the event we cannot correspond with you via this email address,
                  your submitted content may be rejected and your account may be
                  disabled. Other registration requirements (such as the requirement
                  for individuals to contribute no more than one landlord review or
                  property review per landlord and/or property) may also apply. You
                  are entirely responsible for maintaining the confidentiality of
                  your password. You agree to notify us immediately if you suspect
                  any unauthorized use of your account or access to your password.
                  You are solely responsible for any and all use of your account.
                  Passwords are subject to cancellation or suspension by RentVent at
                  any time. When you set up an individual user account on RentVent,
                  we create a member profile (a "Profile") for you that will include
                  personal information you provide. We will update your Profile with
                  information we extract from your reviews. You may permit us to
                  share information in your Profile with others. Subject to
                  visibility settings that you control, subscribers to services we
                  may introduce will be able to view information in your Profile.
                  Because your anonymity on RentVent is important, your Profile does
                  not include or link to information about the reviews you submit to
                  RentVent.
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Social Sign Up and Sign In. You may be able to register an account
                  and subsequently access RentVent through a social networking site,
                  such as Facebook or Google+ ("Social Networking Site"). If you
                  access RentVent through a Social Networking Site you agree that we
                  may access, make available through RentVent, and store (if
                  applicable) any information, data, text, messages, tags, and/or
                  other materials that you have provided to and stored and made
                  accessible in your Social Networking Site account so that it is
                  available on and through RentVent via your account and your Profile
                  page. Subject to the privacy settings that you have set with the
                  Social Networking Site account you use to access RentVent,
                  personally identifiable information that you post to that Social
                  Networking Site may be displayed on RentVent. Please note: your
                  relationship with your Social Networking Sites is governed solely
                  by your agreement with those Social Networking Sites and we
                  disclaim any liability for personally identifiable information that
                  may be provided to us by a Social Networking Site in violation of
                  the privacy settings that you have set with that Social Networking
                  Site account.
              </p>
          </li>
      </ol>
      <ol start="3">
          <li dir="ltr">
              <p dir="ltr">
                  Using RentVent
              </p>
          </li>
      </ol>
      <ol>
          <li dir="ltr">
              <p dir="ltr">
                  Third-Party Content on RentVent. Content from other users,
                  advertisers, and other third parties is made available to you
                  through RentVent. Content means any work of authorship or
                  information, including landlord reviews and property reviews,
                  property photos, landlord responses, landlord profile information,
                  advertisements, comments, opinions, postings, messages, text,
                  files, images, photos, works of authorship, e-mail, data or other
                  materials you find on RentVent. Because we do not control such
                  Content, you understand and agree that: (1) we are not responsible
                  for, and do not endorse, any such Content, including advertising
                  and information about third-party products and services, job ads,
                  or the landlord, property and other related information provided by
                  other users; (2) we make no guarantees about the accuracy,
                  currency, suitability, reliability or quality of the information in
                  such Content; and (3) we assume no responsibility for unintended,
                  objectionable, inaccurate, misleading, or unlawful Content made
                  available by users, advertisers, and third parties.
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  In accordance with
                  <a href="http://www.law.cornell.edu/uscode/text/47/230">
                      Section 230 of the U.S. Communications Decency Act
                  </a>
                  , and any equivalent or similar laws in other jurisdictions which
                  are intended to exclude or limit the liability of online service
                  providers who provide access to user-generated content, we
                  generally cannot be held liable for claims arising from the Content
                  provided by third parties on RentVent.
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  We allow users to post content about landlords and properties when
                  they have been tenants of the landlord / rented the property. We
                  also allow users to review the property management companies that
                  place them in these roles. We consider all tenants, irresepctive of
                  their length of tenancy as tenants with regard to Content left on
                  RentVent. While we provide the option for RentVent reviewers to
                  specify the length of their tenancy when they leave a review, we do
                  not consider this a requirement.
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  House Rules. You represent and warrant that you will use RentVent
                  solely for lawful purposes in a manner consistent with these Terms
                  and any and all applicable laws, regulations, or other legally
                  enforceable obligations (including contractual obligations) you may
                  have towards us and any third parties. You are solely responsible
                  for any and all Content that is posted through your account on
                  RentVent ("Your Content"). You agree that by submitting Your
                  Content to RentVent, you have reviewed and understood our Community
                  Guidelines. You understand that you may expose yourself to
                  liability if Your Content or other use of RentVent violates
                  applicable law or any third-party right.
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  You agree that you will not:
              </p>
          </li>
      </ol>
      <ul>
          <li dir="ltr">
              <p dir="ltr">
                  Impersonate another person, or his or her email address, or
                  misrepresent your current or former affiliation with an landlord;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Create user accounts under false or fraudulent pretenses; create or
                  use an account for anyone other than yourself; or create multiple
                  active user accounts to post multiple reviews for the same company
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Post Content that you do not own or have the right to post in
                  accordance with the license set forth in these Terms;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Violate these Terms, the terms of your agreements with us, explicit
                  restrictions set forth in our Community Guidelines, or any
                  applicable law, rule or regulation;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Post Content that is defamatory, libelous, or fraudulent; that you
                  know to be false or misleading; or that does not reflect your
                  honest opinion and experience;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Act in a manner that is harassing, threatening, abusive, racist or
                  bigoted, is otherwise objectionable (as determined by RentVent);
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Promote, endorse or further illegal activities;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Disclose information in violation of any legally enforceable
                  confidentiality, non-disclosure or other contractual restrictions
                  or rights of any third party, including any current or former
                  landlords or potential landlords;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Violate the privacy, publicity, copyright, patent, trademark, trade
                  secret, or other intellectual property or proprietary rights of any
                  third-party;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Post anything pornographic or sexually explicit in nature, or
                  engage in the exploitation of persons in a sexual or violent
                  manner;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Solicit personally identifying information from minors;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Except as expressly approved by us, use RentVent for commercial
                  activities and/or promotions such as contests, sweepstakes, barter,
                  pyramid schemes, advertising, affiliate links, and other forms of
                  solicitation;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Imply a RentVent endorsement or partnership of any kind without our
                  express written permission;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Send messages in violation of the USA CAN-SPAM Act or any other
                  applicable anti-spam law;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Introduce software or automated agents to RentVent, or access
                  RentVent so as to produce multiple accounts, generate automated
                  messages, or to scrape, strip or mine data from RentVent without
                  our express written permission;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  “Frame” or “mirror” or otherwise incorporate part of RentVent into
                  any website, or “deep-link” to any portion of RentVent without our
                  express written permission.
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Copy, modify or create derivative works of RentVent or any Content
                  (excluding Your Content) without our express written permission);
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Copy or use the information, Content (excluding Your Content), or
                  data on RentVent in connection with a competitive service, as
                  determined by RentVent;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Sell, resell, rent, lease, loan, trade or otherwise monetize access
                  to RentVent or any Content (excluding Your Content) without our
                  express written permission;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Interfere with, disrupt, modify, reverse engineer, or decompile any
                  data or functionality of RentVent;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Interfere with, disrupt, or create an undue burden on RentVent or
                  the networks or services connected to RentVent;
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Introduce any viruses, Trojan horses, worms, time bombs,
                  cancelbots, corrupted files, or similar software to RentVent; or
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Attempt to circumvent any security feature of RentVent;
              </p>
          </li>
      </ul>
      <p dir="ltr">
          F. Links to Third-Party Websites. RentVent may contain links to third-party
          websites placed by us as a service to those interested in this information,
          or posted by other users. Your use of all such links to third-party
          websites is at your own risk. We do not monitor or have any control over,
          and make no claim or representation regarding third-party websites. To the
          extent such links are provided by us, they are provided only as a
          convenience, and a link to a third-party website does not imply our
          endorsement, adoption or sponsorship of, or affiliation with, such
          third-party website. When you leave RentVent, our terms and policies do not
          govern your use of third-party websites.
      </p>
      <ol>
          <li dir="ltr">
              <p dir="ltr">
                  Rent Estimates. In certain markets we may offer rent estimate
                  features, such as personalized market value estimates, property tax
                  estimates, utility estimates, landlord mortgage estimates, and
                  landlord profit margin estimates. Unless otherwise indicated, we
                  estimate based based on publicly available information. Though we
                  may offer landlords the ability to supplement or replace these
                  estimates with their own data, users should understand that, unless
                  indicated otherwise, results do not represent verified amounts, or
                  endorsements from landlords. Their purpose is to provide data to
                  promote transparency and to help people make informed decisions. We
                  do not guarantee the accuracy of results and you are responsible
                  for how you use them.
              </p>
          </li>
      </ol>
      <p dir="ltr">
          J. We encourage you to supplement RentVent's property data estimates with
          other research. If you are an landlord and would like to provide feedback
          to help make our data estimates more accurate, please contact us
          terms@vent.rent.
      </p>
      <ol start="4">
          <li dir="ltr">
              <p dir="ltr">
                  Special Provisions Applicable To Landlords
              </p>
          </li>
          <ol>
              <li dir="ltr">
                  <p dir="ltr">
                      Reviews on RentVent. You may not offer incentives in exchange
                      for landlord or property reviews. You may not trade reviews
                      with other landlords. We will remove reviews where we have
                      evidence that users were compensated to leave reviews.
                  </p>
              </li>
              <li dir="ltr">
                  <p dir="ltr">
                      You may not coerce tenants to leave reviews. Coercion includes
                      asking tenants to provide proof to a landlord that they wrote a
                      review whether or not that proof includes the content of the
                      review itself.
                  </p>
              </li>
          </ol>
          <li dir="ltr">
              <p dir="ltr">
                  Special Provisions Applicable to Advertisers
              </p>
          </li>
      </ol>
      <ol>
          <li dir="ltr">
              <p dir="ltr">
                  This provision applies to all advertisers, including landlords who
                  purchase property ads or display ads. Unless we agree otherwise,
                  you may not use or otherwise process data collected or derived from
                  ads ("Ad Data") for any purpose (including retargeting, building or
                  augmenting user profiles, allowing piggybacking or redirecting with
                  tags, or combining with data across multiple advertisers'
                  campaigns) other than to assess the performance and effectiveness
                  of your campaigns on an aggregate and anonymous basis. You may not,
                  and you may not permit a third-party to, transfer or sell any Ad
                  Data to, or use Ad Data in connection with, any ad network, ad
                  exchange, data broker, or other party not acting on behalf of you
                  and your campaigns. You may use information provided directly to
                  you from users if you provide clear notice to and obtain consent
                  from those users and comply with all applicable laws and industry
                  guidelines, including those applicable to data protection.
              </p>
          </li>
      </ol>
      <ol start="6">
          <li dir="ltr">
              <p dir="ltr">
                  Enforcement by RentVent
              </p>
          </li>
          <ol>
              <li dir="ltr">
                  <p dir="ltr">
                      Removal of Content. While RentVent has no obligation to do so,
                      RentVent reserves the right to review and delete any Content
                      (or portion thereof) that we believe, in our sole discretion,
                      violates these Terms or other applicable policies posted on
                      RentVent (including our Community Guidelines), or that we deem,
                      in our sole discretion, inappropriate. If you see any Content
                      on RentVent that you believe violates our policies, you may
                      report that Content by clicking on an applicable link adjacent
                      to that Content (e.g. links titled: "Inappropriate" or "Flag
                      Review") or by contacting us at terms@vent.rent. Once notified,
                      we will review the Content and consider whether to remove it
                      (or a portion thereof). Please note: Our interpretation of our
                      policies and the decision whether or not to edit or remove
                      Content is within our sole discretion. You understand and agree
                      that if we choose not to remove or edit Content that you find
                      objectionable, that decision will not constitute a violation of
                      these Terms or any agreement we have with you.
                  </p>
              </li>
              <li dir="ltr">
                  <p dir="ltr">
                      Other Enforcement Actions. While we have no obligation to do
                      so, we reserve the right to investigate and take appropriate
                      action in our sole discretion against you if you violate these
                      Terms, including without limitation: removing Content (or
                      portions thereof) from RentVent; suspending your rights to use
                      RentVent; terminating your membership and account; reporting
                      you to law enforcement, regulatory authorities, or
                      administrative bodies; and taking legal action against you.
                  </p>
              </li>
              <li dir="ltr">
                  <p dir="ltr">
                      Defending Our Users. While we have no obligation to do so, we
                      reserve the right, to the fullest extent permitted by
                      applicable law, to take appropriate action to protect the
                      anonymity of our users against the enforcement of subpoenas or
                      other information requests that seek a user's electronic
                      address or identifying information.
                  </p>
              </li>
          </ol>
          <li dir="ltr">
              <p dir="ltr">
                  Rights to Your Content. We do not claim ownership in any Content
                  that you submit to RentVent, but you grant us the rights to use
                  such Content as set forth below. By submitting any Content to
                  RentVent, you hereby grant to us an unrestricted, irrevocable,
                  perpetual, non-exclusive, fully-paid and royalty-free, license
                  (with the right to sublicense through unlimited levels of
                  sublicenses) to use, copy, perform, display, create derivative
                  works of, adapt and distribute such Content in any and all media
                  (now known or later developed) throughout the world. To the
                  greatest extent permitted by applicable law, you hereby expressly
                  waive any and all of your moral rights applicable to RentVent's
                  exercise of the foregoing license. You agree that this license
                  includes the right for us to provide, promote, and improve RentVent
                  and to make Content submitted to or through RentVent available to
                  other companies, organizations or individuals for the syndication,
                  broadcast, distribution, promotion or publication of such Content
                  on other media and services, subject to our terms and conditions
                  for such Content use. No compensation will be paid with respect to
                  the Content that you post through RentVent. You should only submit
                  Content to RentVent that you are comfortable sharing with others
                  under the terms and conditions of these Terms.
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Rights to RentVent Content. RentVent contains Content provided by
                  us and our licensors. We and our licensors (including other users)
                  own and retain all proprietary (including all intellectual
                  property) rights in the Content we each provide and RentVent owns
                  and retains all property rights in RentVent. If you are a user, we
                  hereby grant you a limited, revocable, non-sublicensable license
                  under the intellectual property rights licensable by us to
                  download, view, copy and print Content from RentVent solely for
                  your personal use in connection with using RentVent. Except as
                  provided in the foregoing, you agree not to: (1) reproduce, modify,
                  publish, transmit, distribute, publicly perform or display, sell,
                  adapt or create derivative works based on RentVent or the Content
                  (excluding Your Content); or (2) rent, lease, loan, or sell access
                  to RentVent. RentVent ® is a registered trademark of RentVent, Inc.
                  The trademarks, logos and service marks ("Marks") displayed on
                  RentVent are our property or the property of third parties. You are
                  not permitted to use these Marks without our prior written consent
                  or the consent of the third party that owns the Mark.
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Indemnity. You agree to defend, indemnify, and hold us and our
                  subsidiaries and our and their respective officers, directors,
                  board members, board advisors, employees, partners, agents
                  successors and assigns (collectively, the "RentVent Group")
                  harmless from any loss, liability, claim, or demand, including
                  reasonable attorneys’ fees and costs, made by any third party due
                  to or otherwise arising from your use of RentVent, including due to
                  or arising from your breach of any provision of these Terms.
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Disclaimers and Limitation on Liability
              </p>
          </li>
      </ol>
      <ol>
          <li dir="ltr">
              <p dir="ltr">
                  The disclaimers and limitations on liability in this section apply
                  to the maximum extent allowable under applicable law. Nothing in
                  this section is intended to limit any rights you have which may not
                  be lawfully limited.
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  You are solely responsible for your interactions with advertisers
                  and other users and we are not responsible for the activities,
                  omissions, or other conduct, whether online or offline, of any
                  advertiser or user of RentVent. We are not responsible for any
                  incorrect, inaccurate, or unlawful Content (including any
                  information in profiles) posted on RentVent, whether caused by
                  users or by any of the equipment or programming associated with or
                  utilized in RentVent. We assume no responsibility for any error,
                  omission, interruption, deletion, defect, delay in operation or
                  transmission, communications line failure, theft or destruction or
                  unauthorized access to, or alteration of, any communication with
                  advertisers or other users. We are not responsible for any problems
                  or technical malfunction of any hardware and software due to
                  technical problems on the Internet or on RentVent or combination
                  thereof, including any injury or damage to users or to any person's
                  computer related to or resulting from participation or downloading
                  materials in connection with RentVent. Under no circumstances shall
                  we be responsible for any loss or damage resulting from use of
                  RentVent or from any Content posted on RentVent or transmitted to
                  users, or any interactions between users of RentVent, whether
                  online or offline.
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  RentVent is provided "as-is" and as available. We expressly
                  disclaim any warranties and conditions of any kind, whether express
                  or implied, including the warranties or conditions of
                  merchantability, fitness for a particular purpose, title, quiet
                  enjoyment, accuracy, or non-infringement. We make no warranty that:
                  (1) RentVent will meet your requirements; (2) RentVent will be
                  available on an uninterrupted, timely, secure, or error-free basis;
                  or (3) the results that may be obtained from the use of RentVent
                  will be accurate or reliable.
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  You hereby release the RentVent Group from any and all claims,
                  demands, and losses, damages, rights, claims, and actions of any
                  kind that are either directly or indirectly related to or arises
                  from: (1) the actions, Content, or data of third parties
                  (including, advertisers and other users) (2) your participation in
                  any offline events.
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  IN NO EVENT SHALL THE REVTVENT GROUP BE LIABLE TO YOU OR ANY THIRD
                  PARTY FOR ANY LOST PROFIT OR ANY INDIRECT, CONSEQUENTIAL,
                  EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES ARISING FROM
                  YOUR USE OF REVTVENT, EVEN IF WE HAVE BEEN ADVISED OF THE
                  POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE
                  CONTRARY CONTAINED HEREIN, WHERE PERMITTED BY APPLICABLE LAW, YOU
                  AGREE THAT THE RentVent GROUP’S LIABILITY TO YOU FOR ANY DAMAGES
                  ARISING FROM OR RELATED TO YOUR USE OF RENTVENT (FOR ANY CAUSE
                  WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION), WILL AT ALL
                  TIMES BE LIMITED TO ONE HUNDRED U.S. DOLLARS ($100).
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  You acknowledge that you are familiar with the provisions of
                  Section 1542 of the California Civil Code, which provides as
                  follows: "A GENERAL RELEASE DOES NOT EXTEND TO CLAIMS WHICH THE
                  CREDITOR DOES NOT KNOW OR SUSPECT TO EXIST IN HIS OR HER FAVOR AT
                  THE TIME OF EXECUTING THE RELEASE, WHICH IF KNOWN BY HIM OR HER
                  MUST HAVE MATERIALLY AFFECTED HIS OR HER SETTLEMENT WITH THE
                  DEBTOR." You hereby expressly waive and relinquish all rights and
                  benefits under Section 1542 of the California Civil Code and any
                  law or legal principle of similar effect in any jurisdiction with
                  respect to the releases and/or discharges granted herein, including
                  but not limited to the releases and/or discharges of unknown
                  claims.
              </p>
          </li>
      </ol>
      <ol start="11">
          <li dir="ltr">
              <p dir="ltr">
                  Termination
              </p>
          </li>
      </ol>
      <ol>
          <li dir="ltr">
              <p dir="ltr">
                  These Terms remain in effect while you use RentVent and, for
                  registered users, as long as your account remains open. You may
                  delete your account at any time. We may suspend or terminate your
                  account or your access to parts of RentVent, for any or no reason,
                  without notice to you. We will have no liability whatsoever to you
                  for any termination of your account or related deletion of your
                  information.
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  All provisions of these Terms shall survive termination or
                  expiration of these Terms except those provisions granting access
                  to or use of RentVent. For the avoidance of doubt, you agree that
                  these Terms apply to your use of RentVent and any Content posted on
                  RentVent at any time prior to the termination or expiration of
                  these Terms.
              </p>
          </li>
      </ol>
      <ol start="12">
          <li dir="ltr">
              <p dir="ltr">
                  Changes to Terms
              </p>
          </li>
      </ol>
      <ol>
          <li dir="ltr">
              <p dir="ltr">
                  We may revise these Terms from time to time by posting an updated
                  version on RentVent. The revised Terms will be effective
                  immediately for unregistered users and users registering accounts
                  on or after the revision date. For users who registered accounts
                  before the revision date, they will become effective thirty (30)
                  days after the revision date. If we make a change that we believe
                  materially reduces your rights or increases your responsibilities
                  we will notify you by email (sent to the e-mail address specified
                  in your account) or by means of a notice on this website prior to
                  the change becoming effective. We may provide notice of changes in
                  other circumstances as well. Any such changes will not apply to any
                  claim brought prior to the effective date of the revised Terms
                  incorporating such changes. We encourage you to periodically review
                  this page for the latest information on our Terms. Your continued
                  use of RentVent is subject to the most current effective version of
                  these Terms.
              </p>
          </li>
      </ol>
      <ol start="13">
          <li dir="ltr">
              <p dir="ltr">
                  Third-Party Discovery
              </p>
          </li>
      </ol>
      <ol>
          <li dir="ltr">
              <p dir="ltr">
                  You agree to waive your right to file a pre-suit discovery
                  proceeding seeking a user's identifying information from RentVent.
                  If you intend to propound discovery seeking a user's identifying
                  information, you agree to do so pursuant to a valid California
                  subpoena, properly issued in connection with an active lawsuit and
                  properly served on our registered agent in California at RentVent,
                  Inc., 695 S. Hudson Avenue, Pasadena, CA 91106. You further agree
                  that all such subpoenas and discovery proceedings arising from such
                  subpoenas shall be issued from, brought and resolved exclusively in
                  the state courts located within Los Angeles County, California or
                  the federal courts in the Southern District of California, as
                  appropriate, and you agree to submit to the personal jurisdiction
                  of each of these courts for such discovery proceedings.
              </p>
          </li>
      </ol>
      <ol start="14">
          <li dir="ltr">
              <p dir="ltr">
                  Dispute Resolution
              </p>
          </li>
      </ol>
      <ol>
          <li dir="ltr">
              <p dir="ltr">
                  PLEASE READ THIS CAREFULLY. IT AFFECTS YOUR RIGHTS. YOU AGREE THAT
                  BY ENTERING INTO THESE TERMS, YOU AND RentVent ARE EACH WAIVING THE
                  RIGHT TO TRIAL BY JURY OR TO PARTICIPATE IN A CLASS ACTION. YOU AND
                  RENTVENT AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN
                  YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS
                  MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING. ANY
                  ARBITRATION WILL TAKE PLACE ON AN INDIVIDUAL BASIS; CLASS
                  ARBITRATIONS AND CLASS ACTIONS ARE NOT PERMITTED.
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Governing Law. These Terms and any and all claims, disputes, or
                  other legal proceedings by or between you or us, including but not
                  limited to any such claims or disputes that are in any way related
                  to or arising under these Terms or your access to or use of
                  RentVent, shall be governed by the laws of the State of California
                  without giving effect to any conflict-of-laws principles that may
                  otherwise provide for the application of the law of another
                  jurisdiction. The parties agree that their arrangement under these
                  Terms is in interstate commerce and that the Federal Arbitration
                  Act applies to the construction of the "Agreement to Arbitrate"
                  provision below. For any claim, dispute, or other legal proceeding
                  not subject to the "Agreement to Arbitrate" provision below, the
                  claim or dispute shall be brought and litigated exclusively in the
                  state courts located within Los Angeles County, California or the
                  federal courts in the Southern District of California, as
                  appropriate, and you agree to submit to the personal jurisdiction
                  of each of these courts for the purpose of litigating such claims
                  or disputes.
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Agreement to Arbitrate. If you reside in the United States, subject
                  to the Exceptions to Arbitration set forth below, you and RentVent
                  each agree that any and all disputes between consumer users of
                  RentVent and RentVent arising under or related in any way to these
                  Terms and such users’ use of RentVent must be resolved through
                  binding arbitration as described in this section. With the
                  exception of the prohibition on class arbitrations set forth in
                  this "Dispute Resolution" section, if an arbitrator or court
                  decides that any part of this agreement to arbitrate is
                  unenforceable, the other parts of this Agreement to Arbitrate will
                  still apply.
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Exceptions to Arbitration. This Agreement to Arbitrate will not
                  apply to the following: (a) small claims court cases that qualify;
                  (b) legal proceedings that involve efforts to obtain
                  user-identifying information; (c) any legal proceedings brought
                  against any of the RentVent Group by companies or other legal
                  entities; or individuals acting on behalf of such companies or
                  other legal entities; (d) any legal proceedings brought by any of
                  the RentVent Group against companies or other legal entities or
                  individuals acting on behalf of any such companies or other legal
                  entities; and (e) a party’s right to seek injunctive or other
                  equitable relief in a court of competent jurisdiction to prevent
                  the actual or threatened infringement, misappropriation or
                  violation of a party's copyrights, trademarks, trade secrets,
                  patents, or other intellectual property rights. If, for some
                  reason, the prohibition on class arbitrations set forth in this
                  Dispute Resolution section cannot be enforced, then the entirety of
                  this Agreement to Arbitrate will not apply. Where this Agreement to
                  Arbitrate does not apply, the remainder of this Agreement and the
                  Dispute Resolution section will continue to apply.
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Informal Dispute Resolution. If either of us intends to seek
                  arbitration under the agreement, the party seeking arbitration must
                  first notify the other party of the dispute in writing at least 30
                  days in advance of initiating arbitration. Notice to RentVent
                  should be sent to the 695 South Hudson Avenue, Pasadena, CA 91106.
                  If you have an account on RentVent, notice to you will be sent to
                  the email address associated with your account. The notice of
                  dispute ("Notice") must (a) describe the nature and basis of the
                  claim or dispute; and (b) set forth the specific relief sought. If
                  RentVent and you do not reach an agreement to resolve the claim
                  within 30 days after the Notice is received, you or RentVent may
                  commence formal proceeding
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Arbitration Procedure. The arbitration will be governed by the
                  Consumer Arbitration Rules of the American Arbitration Association
                  ("AAA"), if applicable, as modified by this section. The AAA's
      rules and a form for initiating the proceeding are available at            <a href="http://www.adr.org/">www.adr.org</a>. Any settlement offer
                  made by you or RentVent shall not be disclosed to the arbitrator.
                  Unless otherwise required by the applicable arbitration rules, the
                  arbitration shall be held in Los Angeles, California. For any claim
                  where the total amount of the award sought is $10,000 or less, you
                  and RentVent may elect to have the arbitration conducted by
                  telephone or based solely on written submissions, which election
                  shall be binding on you and RentVent subject to the arbitrator’s
                  discretion to require an in-person hearing. In cases where an
                  in-person hearing is held, you or RentVent may attend by telephone,
                  unless the arbitrator requires otherwise. The arbitrator will
                  decide the substance of all claims in accordance with applicable
                  law, including recognized principles of equity, and will honor all
                  claims of privilege recognized by law. The arbitrator shall not be
                  bound by rulings in prior arbitrations involving different users,
                  but is bound by rulings in prior arbitrations involving the same
                  RentVent user to the extent required by applicable law. The
                  arbitrator's award shall be final and binding and judgment on the
                  award rendered by the arbitrator may be entered in any court having
                  jurisdiction thereof.
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Opt-Out Procedure. IF YOU ARE A NEW RENTVENT USER, YOU CAN CHOOSE
                  TO REJECT THIS AGREEMENT TO ARBITRATE ("OPT-OUT") BY MAILING US A
                  WRITTEN OPT-OUT NOTICE ("OPT-OUT NOTICE"). THE OPT-OUT NOTICE MUST
                  BE POSTMARKED NO LATER THAN 30 DAYS AFTER THE DATE YOU ACCEPT THE
                  RentVent TERMS OF USE FOR THIS FIRST TIME. YOU MUST MAIL THE
                  OPT-OUT NOTICE TO RentVent INC, 695 SOUTH HUDSON AVENUE, PASADENA,
                  CA 91106.
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  For your convenience, we are providing an Opt-Out Notice form (see
                  below) you must complete and mail to opt out of your agreement to
                  arbitrate. You must complete the Opt-Out Notice form by providing
                  the information called for in the form, including your name,
                  address (including street address, city, state and zip code), and
                  the email address(es) associated with the RentVent account(s) to
                  which the opt-out applies. You must sign the Opt-Out Notice for it
                  to be effective. This procedure is the only way you can opt out of
                  this Agreement to Arbitrate. If you opt out of the Agreement to
                  Arbitrate, all other parts these Terms and this Dispute Resolution
                  section will continue to apply to you. Opting out of this agreement
                  to arbitrate has no effect on any previous, other, or future
                  arbitration agreements that you may have with us.
              </p>
          </li>
          <li dir="ltr">
              <p dir="ltr">
                  Changes to the Agreement to Arbitrate. Notwithstanding any
                  provision in these Terms to the contrary, you and we agree that if
                  we make any changes to this "Arbitration" section (other than an
                  change to any referenced notice address or site link) in the
                  future, that change will not apply to any claim that was filed in a
                  legal proceeding prior to the effective date of the change. The
                  change will apply to all other disputes or claims governed by this
                  Arbitration section that have arisen or may arise between you and
                  RentVent. We will notify you of changes to this Arbitration section
                  by posting the changes on RentVent at least 30 days before the
                  effective date of the changes and by email. If you do not agree to
                  these changed terms, you may close your account within the 30 day
                  period and you will not be bound by the changes.
              </p>
          </li>
      </ol>
      <ol start="15">
          <li dir="ltr">
              <p dir="ltr">
                  Other.
              </p>
          </li>
      </ol>
      <ol>
          <li dir="ltr">
              <p dir="ltr">
                  Except as specifically stated in another agreement we have with
                  you, these Terms constitute the entire agreement between you and us
                  regarding the use of RentVent and these Terms supersede all prior
                  proposals, negotiations, agreements, and understandings concerning
                  the subject matter of these Terms. You represent and warrant that
                  no person has made any promise, representation, or warranty,
                  whether express or implied, not contained herein to induce you to
                  enter into this agreement. Our failure to exercise or enforce any
                  right or provision of the Terms shall not operate as a waiver of
                  such right or provision. If any provision of the Terms is found to
                  be unenforceable or invalid, then only that provision shall be
                  modified to reflect the parties' intention or eliminated to the
                  minimum extent necessary so that the Terms shall otherwise remain
                  in full force and effect and enforceable. To the extent allowed by
                  law, the English version of these Terms are binding and the
                  translations are provided for convenience only. The Terms, and any
                  rights or obligations hereunder, are not assignable, transferable
                  or sublicensable by you except with RentVent's prior written
                  consent, but may be assigned or transferred by us without
                  restriction. Any attempted assignment by you shall violate these
                  Terms and be void. The section titles in the Terms are for
                  convenience only and have no legal or contractual effect; as used
                  in the Terms, the word "including" means "including but not limited
                  to."
              </p>
          </li>
      </ol>
      <ol start="16">
          <li dir="ltr">
              <p dir="ltr">
                  Please contact us with any questions regarding these Terms by
                  terms@vent.rent.
              </p>
          </li>
      </ol>
      <p dir="ltr">
          OPT OUT NOTICE FORM:
      </p>
      <p dir="ltr">
          I am writing to provide notice that I'm opting out of the Agreement to
          Arbitrate in the RentVent Terms of Use. Pursuant to the terms of the
          Agreement to Arbitrate, I'm providing the requested information as follows:
          My Name: _________________________________________________________
      </p>
      <p dir="ltr">
          My Street Address:
          _________________________________________________________ City/Town Where I
          Reside: _________________________________________________________ State
          Where I Reside: _________________________________________________________
      </p>
      <p dir="ltr">
          Zip Code: _________________________________________________________ Phone
          Number: _________________________________________________________ Email
          Address(es) associated with the RentVent account(s) for which I’m opting
          out of the Agreement to Arbitrate: (Please let all email addresses
          associated with the account(s)).
          _____________________________________________________________________________________
          _____________________________________________________________________________________
      </p>
      <p dir="ltr">
          Signature: _________________________________________________________ Date:
          _________________________________________________________ Please mail the
          completed form to the following address: RentVent Inc. Re: Opt-Out Notice,
          695 South Hudson Avenue, Pasadena, CA 91106. For new RentVent users, the
          Opt-Out Notice must be postmarked no later than 30 days after the date you
          accept the RentVent Terms of Use for the first time. It's your
          responsibility to mail the Opt-Out Notice by the applicable deadline.
      </p>
      <div>
          <br/>
      </div>

      </div>
    );
  }
}