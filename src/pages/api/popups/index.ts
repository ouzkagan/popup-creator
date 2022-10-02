import { popupTemplates } from '@/mock';
import { PopupTemplate } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';
// {"template":"POPUP_473","version":46,"layout":{"type":"LIGHT_POPUP","position":"CENTER"},"popup":{"design":{"content":{"headline":{"fontFamily":"Roboto","fontWeight":700,"value":"<p style=\"text-align: center;\"><span style=\"color: #000000; font-size: 30px;\">Play to unlock special offers!</span></p>","hide":false},"description":{"fontFamily":"Roboto","fontWeight":400,"value":"<p style=\"text-align: center;\"><span style=\"color: #000000; font-size: 15px;\">Is it your lucky day? Type in your email address and start game!</span></p>","hide":false},"imagesMobile":[],"images":[],"privacyPolicy":{"showPrivacyPolicy":false,"showCheckbox":false,"value":"I confirm that I've read and agree to <u>Privacy Policy.</u>"},"formFields":[{"type":"EMAIL_INPUT","hide":false,"options":{"name":"Email Address","placeholder":"Enter your e-mail","requiredMessageStatus":true,"requiredMessage":"This field is required","validationMessageStatus":true,"validationMessage":"Not a valid e-mail"}}],"buttons":[{"type":"BUTTON_1","name":"Start GAME","hide":false,"action":{"type":"SEND_AND_SHOW_SUCCESS"},"fontFamily":"Roboto","fontWeight":700,"size":20,"textAlign":"CENTER","textTransform":"UPPERCASE","textUnderline":false}],"wheel":{"segments":[{"text":"<p><strong><span style=“font-size: 30px;“> 5%</span> </strong></p><p>Coupon</p>","type":"gift","couponText":"SALE5%","couponMessage":"Your Discount Code is","ratioPercent":10,"size":15,"color":"#00000","fontWeight":400},{"text":"<p><strong><span style=“font-size: 30px;“> 10%</span> </strong></p><p>Coupon</p>","type":"gift","couponText":"SALE10%","couponMessage":"Your Discount Code is","ratioPercent":15,"size":15,"color":"#00000","fontWeight":400},{"text":"<p><strong><span style=“font-size: 30px;“> 15%</span> </strong></p><p>Coupon</p>","type":"gift","couponText":"SALE15%","couponMessage":"Your Discount Code is","ratioPercent":15,"size":15,"color":"#00000","fontWeight":400},{"text":"<p><strong><span style=“font-size: 30px;“> $20</span> </strong></p><p>Coupon</p>","type":"gift","couponText":"SALE20$","couponMessage":"Your Discount Code is","ratioPercent":10,"size":15,"color":"#00000","fontWeight":400},{"text":"<p><strong><span style=“font-size: 30px;“> $25</span> </strong></p><p>Coupon</p>","type":"gift","couponText":"SALE25$","couponMessage":"Your Discount Code is","ratioPercent":10,"size":15,"color":"#00000","fontWeight":400},{"text":"<p><strong><span style=“font-size: 30px;“> 30%</span> </strong></p><p>Coupon</p>","type":"gift","couponText":"SALE30%","couponMessage":"Your Discount Code is","ratioPercent":10,"size":15,"color":"#00000","fontWeight":400},{"text":"<p><strong><span style=“font-size: 30px;“> 35%</span> </strong></p><p>Coupon</p>","type":"gift","couponText":"SALE35%","couponMessage":"Your Discount Code is","ratioPercent":10,"size":15,"color":"#00000","fontWeight":400},{"text":"<p><strong><span style=“font-size: 30px;“> $25</span> </strong></p><p>Coupon</p>","type":"gift","couponText":"SALE25$","couponMessage":"Your Discount Code is","ratioPercent":10,"size":15,"color":"#00000","fontWeight":400},{"text":"<p><span style=“font-size: 20px;“> $25</span></p>","type":"gift","couponText":"FREESHIP","couponMessage":"Your coupon code is","ratioPercent":10,"size":15,"color":"#00000","fontWeight":400}]}},"appearance":{"body":{"backgroundColor":"#FCB900","borderRadiusType":"ALL","borderRadiusValue":20},"formFields":{"backgroundColor":"#ffffff","borderColor":"#ffffff","placeholderColor":"#000000","borderRadiusType":"ALL","borderRadiusValue":25,"validationColor":"#000000","fontFamily":"Nunito Sans","fontWeight":"400"},"buttons":[{"type":"BUTTON_1","color":"#9900EF","textColor":"#FFFFFF","borderRadiusType":"PARTIAL","borderTopLeftRadius":2,"borderTopRightRadius":25,"borderBottomRightRadius":2,"borderBottomLeftRadius":25,"borderColor":"#FFFFFF"}],"displayEffect":{"type":"FADE_IN_SCALE"},"closeButtons":{"icon":"BUTTON_2","color":"#000000","iconColor":"#FFFFFF"},"customCss":".popupsmart input{ }","backgroundOverlay":{"show":false,"transparency":50,"color":"#000000"},"wheel":{"backgroundColor1":"#00633d"}}},"visibleFields":{"success":true,"design.layout":true,"design.layout.light":true,"design.layout.sidebar":false,"design.layout.floatingbar":false,"design.layout.fullscreen":false,"design.appearance.body":true,"design.appearance.formFields":true,"design.appearance.button":true,"design.appearance.displayEffect":true,"design.appearance.closeButtons":true,"design.appearance.customCss":true,"design.appearance.backgroundOverlay":true,"design.appearance.body.backgroundColor":true,"design.content.headline":true,"design.content.description":true,"design.content.subDescription":false,"design.content.images":false,"design.content.privacyPolicy":true,"design.content.privacyPolicy.showCheckboxVisible":true,"design.content.formFields":true,"design.content.buttons":true,"design.content.wheel":true,"design.content.buttons.action.type":{"SEND_AND_CLOSE":true,"SEND_AND_REDIRECT":true,"SEND_AND_SHOW_SUCCESS":true,"CLOSE":true,"URL":false,"CALL_PHONE":false},"publish.integrations":true},"publish":{"conversionValue":{"status":false,"products":[]}}},"success":{"design":{"content":{"headline":{"fontFamily":"Roboto","fontWeight":700,"value":"<p style=\"text-align: left;\"><span style=\"color: #ffffff; font-size: 40px;\">Congratulations</span></p>","hide":false},"description":{"fontFamily":"Roboto","fontWeight":500,"value":"<p style=\"text-align: left;\"><span style=\"color: #E6E6E6; font-size: 17px;\">You got a</span></p>","hide":false},"subDescription":{"fontFamily":"Roboto","fontWeight":400,"value":"<p style=\"text-align: center;\"><span style=\"color: #ffffff; font-size: 12px;\">You can write the terms of use of the coupon code here.</span></p>","hide":false},"imagesMobile":[],"images":[],"button":{"type":"BUTTON_1","name":"Continue & Use Discount","hide":false,"action":{"type":"CLOSE"},"fontFamily":"Roboto","fontWeight":700,"size":20,"textAlign":"CENTER","textTransform":"UPPERCASE","textUnderline":false}},"appearance":{"body":{"backgroundColor":"#f0f2f8","borderRadiusType":"ALL","borderRadiusValue":20},"button":{"type":"SUBSCRIBE_NOW","color":"#FCB900","textColor":"#FFFFFF","borderRadiusType":"ALL","borderRadiusValue":10,"borderColor":"transparent"},"displayEffect":{"type":"FADE_IN_SCALE"},"closeButtons":{"icon":"BUTTON_2","color":"#000000","iconColor":"#FFFFFF"},"customCss":".popupsmart input{}","backgroundOverlay":{"show":false,"transparency":50,"color":"#000000"}}},"visibleFields":{"design.layout":false,"design.appearance.body":true,"design.appearance.button":true,"design.appearance.displayEffect":true,"design.appearance.closeButton":true,"design.appearance.customCss":false,"design.appearance.backgroundOverlay":true,"design.content.headline":true,"design.content.description":true,"design.content.subDescription":true,"design.content.image":false,"design.content.button":true,"design.content.buttons.action.type":{"CLOSE":true,"URL":true,"CALL_PHONE":true}},"status":true},"tab":{"template":"TAB_11","design":{"startDisplaying":"OPEN","layout":{"position":"TOP_LEFT"},"content":{"headline":{"fontFamily":"Archivo Narrow","fontWeight":700,"value":"<p style=\"text-align: center;\"><span style=\"color: #ffffff; font-size: 36px;\">Black Friday</span></p>"}},"appearance":{"body":{"backgroundColor":"#000000","borderRadiusValue":10,"borderRadiusType":"ALL"},"displayEffect":{"type":"FADE_IN_SCALE"},"closeButton":{"backgroundColor":"#ffffff","color":"#000000"}}},"visibleFields":{"design.layout":true,"design.appearance.body":true,"design.appearance.displayEffect":true,"design.appearance.closeButton":true,"design.content.headline":true,"design.content.description":false,"design.content.images":false},"status":false},"googleEvents":false,"schedule":[],"targetSmartMode":false,"targetAudience":{"operatingSystem":{"windows":true,"macOs":true,"linux":true,"chromium":true,"android":true,"ios":true},"newOrReturningVisitors":"ALL","browserLanguage":[],"geoLocated":{"type":"all","locations":[]},"trafficSource":[],"htmlTargeting":[],"cookieTargeting":[]},"visitorBehavior":{"afterXSeconds":[],"afterScrollingXAmount":[],"onExitIntent":{"onExitIntentDegree":"NONE","overrideConditions":true},"urlBrowsing":{"include":[],"exclude":[],"targetAll":true},"inActivityMode":[],"onClick":"javascript:showPopupSmart(true);"},"visitorDevice":{"desktop":true,"mobile":false},"displayFrequency":{"showAgain":{"type":"ON_EVERY_PAGE","options":{"time":"DAYS","value":1}},"stopShowing":{"type":"STOP_SHOWING","options":{"clickClose":true,"seenCampaign":false,"seenCampaignValue":"0","signedUpOrClicked":true}}},"zIndex":99999}

// Fake popup data
const popups: PopupTemplate[] = [...popupTemplates];

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  // Get data from your database
  res.status(200).json(popups);
}
