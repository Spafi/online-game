package com.spaf.jwt.jwt101.registration.service;

import com.spaf.jwt.jwt101.registration.email.EmailSender;
import com.spaf.jwt.jwt101.registration.models.RegistrationRequest;
import com.spaf.jwt.jwt101.registration.token.ConfirmationToken;
import com.spaf.jwt.jwt101.registration.token.ConfirmationTokenService;
import com.spaf.jwt.jwt101.user.models.AppUser;
import com.spaf.jwt.jwt101.user.models.AppUserRole;
import com.spaf.jwt.jwt101.user.services.AppUserService;
import io.github.cdimascio.dotenv.Dotenv;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final AppUserService appUserService;
    private final EmailValidator emailValidator;
    private final ConfirmationTokenService confirmationTokenService;
    private final EmailSender emailSender;



    public String register(RegistrationRequest request) {
        boolean isValidEmail = emailValidator.
                test(request.getEmail());

        if (!isValidEmail) {
            throw new IllegalStateException("Email not valid");
        }

        String token = appUserService.signUpUser(
                new AppUser(
                        request.getUsername(),
                        request.getEmail(),
                        request.getPassword(),
                        AppUserRole.valueOf(request.getRole())

                )
        );

        Dotenv dotenv = Dotenv.load();

        String BASE_URL = dotenv.get("BASE_URL");

        String link = BASE_URL + "/api/v1/registration/confirm?token=" + token;

        emailSender.send(
                request.getEmail(),
                buildEmail(request.getUsername(), link));
        return token;
    }

    @Transactional
    public String confirmToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService
                .getToken(token)
                .orElseThrow(() ->
                        new IllegalStateException("Token not found"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("Email already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("Token expired");
        }

        confirmationTokenService.setConfirmedAt(token);

        Dotenv dotenv = Dotenv.load();
        String FRONTEND_URL = dotenv.get("FRONT_END_REDIRECT_URL");

        appUserService.enableAppUser(
                confirmationToken.getUser().getEmail());
        return buildConfirmationPage(FRONTEND_URL);
    }

    private String buildConfirmationPage(String redirectLink) {
        return "<!DOCTYPE html>" +
                "<html lang=\"en\">" +
                "<head>" +
                "    <meta charset=\"UTF-8\" />" +
                "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />" +
                "" +
                "    <title>Email Confirmed</title>" +
                "    <script defer>" +
                "        window.onload = (event) => {" +
                "            setTimeout(()=> {window.location.replace(\"" + redirectLink + "\");}, 3000);" +
                "            let counter = 2;" +
                "            setInterval(() => {" +
                "                document.getElementById('counter').innerText = counter;" +
                "                counter--;" +
                "            }, 1000);" +
                "        };" +
                "    </script>" +
                "</head>" +
                "<body>" +
                "<p>Email Confirmed</p>" +
                "<p>" +
                "    You will be redirected in <span id=\"counter\">3</span> seconds to the login" +
                "    page" +
                "</p>" +
                "</body>" +
                "</html>";


    }

    private String buildEmail(String name, String link) {

        Dotenv dotenv = Dotenv.load();
        String FRONTEND_URL = dotenv.get("FRONT_END_REDIRECT_URL");


        StringBuilder emailTemplate = new StringBuilder();
        emailTemplate.append("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">")
                .append("<html xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\" style=\"width:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0\">")
                .append(" <head> ")
                .append("  <meta charset=\"UTF-8\"> ")
                .append("  <meta content=\"width=device-width, initial-scale=1\" name=\"viewport\"> ")
                .append("  <meta name=\"x-apple-disable-message-reformatting\"> ")
                .append("  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"> ")
                .append("  <meta content=\"telephone=no\" name=\"format-detection\"> ")
                .append("  <title>New email template 2021-08-08</title> ")
                .append("  <!--[if (mso 16)]>")
                .append("    <style type=\"text/css\">")
                .append("    a {text-decoration: none;}")
                .append("    </style>")
                .append("    <![endif]--> ")
                .append("  <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> ")
                .append("  <!--[if gte mso 9]>")
                .append("<xml>")
                .append("    <o:OfficeDocumentSettings>")
                .append("    <o:AllowPNG></o:AllowPNG>")
                .append("    <o:PixelsPerInch>96</o:PixelsPerInch>")
                .append("    </o:OfficeDocumentSettings>")
                .append("</xml>")
                .append("<![endif]--> ")
                .append("  <!--[if !mso]><!-- --> ")
                .append("  <link href=\"https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i\" rel=\"stylesheet\"> ")
                .append("  <!--<![endif]--> ")
                .append("  <style type=\"text/css\">")
                .append("#outlook a {")
                .append("	padding:0;")
                .append("}")
                .append(".ExternalClass {")
                .append("	width:100%;")
                .append("}")
                .append(".ExternalClass,")
                .append(".ExternalClass p,")
                .append(".ExternalClass span,")
                .append(".ExternalClass font,")
                .append(".ExternalClass td,")
                .append(".ExternalClass div {")
                .append("	line-height:100%;")
                .append("}")
                .append(".es-button {")
                .append("	mso-style-priority:100!important;")
                .append("	text-decoration:none!important;")
                .append("	transition:all 100ms ease-in;")
                .append("}")
                .append("a[x-apple-data-detectors] {")
                .append("	color:inherit!important;")
                .append("	text-decoration:none!important;")
                .append("	font-size:inherit!important;")
                .append("	font-family:inherit!important;")
                .append("	font-weight:inherit!important;")
                .append("	line-height:inherit!important;")
                .append("}")
                .append(".es-button:hover {")
                .append("	background:#555555!important;")
                .append("	border-color:#555555!important;")
                .append("}")
                .append(".es-desk-hidden {")
                .append("	display:none;")
                .append("	float:left;")
                .append("	overflow:hidden;")
                .append("	width:0;")
                .append("	max-height:0;")
                .append("	line-height:0;")
                .append("	mso-hide:all;")
                .append("}")
                .append("[data-ogsb] .es-button {")
                .append("	border-width:0!important;")
                .append("	padding:15px 30px 15px 30px!important;")
                .append("}")
                .append("@media only screen and (max-width:600px), screen and (max-device-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:30px!important; text-align:center } h2 { font-size:26px!important; text-align:left } h3 { font-size:20px!important; text-align:left } h1 a { text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } h2 a { text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:20px!important } h3 a { text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:17px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:17px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class=\"gmail-fix\"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:14px!important; display:inline-block!important; border-width:15px 25px 15px 25px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }")
                .append("</style> ")
                .append(" </head> ")
                .append(" <body style=\"width:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0\"> ")
                .append("  <div class=\"es-wrapper-color\" style=\"background-color:#F1F1F1\"> ")
                .append("   <!--[if gte mso 9]>")
                .append("			<v:background xmlns:v=\"urn:schemas-microsoft-com:vml\" fill=\"t\">")
                .append("				<v:fill type=\"tile\" color=\"#f1f1f1\"></v:fill>")
                .append("			</v:background>")
                .append("		<![endif]--> ")
                .append("   <table class=\"es-wrapper\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top\"> ")
                .append("     <tr style=\"border-collapse:collapse\"> ")
                .append("      <td valign=\"top\" style=\"padding:0;Margin:0\"> ")
                .append("       <table cellpadding=\"0\" cellspacing=\"0\" class=\"es-content\" align=\"center\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%\"> ")
                .append("         <tr style=\"border-collapse:collapse\"> ")
                .append("          <td align=\"center\" style=\"padding:0;Margin:0\"> ")
                .append("           <table class=\"es-content-body\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"> ")
                .append("             <tr style=\"border-collapse:collapse\"> ")
                .append("              <td align=\"left\" style=\"Margin:0;padding-left:10px;padding-right:10px;padding-top:15px;padding-bottom:15px\"> ")
                .append("               <!--[if mso]><table style=\"width:580px\" cellpadding=\"0\" cellspacing=\"0\"><tr><td style=\"width:282px\" valign=\"top\"><![endif]--> ")
                .append("               <table class=\"es-left\" cellspacing=\"0\" cellpadding=\"0\" align=\"left\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left\"> ")
                .append("                 <tr style=\"border-collapse:collapse\"> ")
                .append("                  <td align=\"left\" style=\"padding:0;Margin:0;width:282px\"> ")
                .append("                   <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" role=\"presentation\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px\"> ")
                .append("                     <tr style=\"border-collapse:collapse\"> ")
                .append("                      <td class=\"es-infoblock es-m-txt-c\" align=\"left\" style=\"padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC\"><p style=\"Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px\"><br></p></td> ")
                .append("                     </tr> ")
                .append("                   </table></td> ")
                .append("                 </tr> ")
                .append("               </table> ")
                .append("               <!--[if mso]></td><td style=\"width:20px\"></td><td style=\"width:278px\" valign=\"top\"><![endif]--> ")
                .append("               <table class=\"es-right\" cellspacing=\"0\" cellpadding=\"0\" align=\"right\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right\"> ")
                .append("                 <tr style=\"border-collapse:collapse\"> ")
                .append("                  <td align=\"left\" style=\"padding:0;Margin:0;width:278px\"> ")
                .append("                   <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" role=\"presentation\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px\"> ")
                .append("                     <tr style=\"border-collapse:collapse\"> ")
                .append("                      <td align=\"right\" class=\"es-infoblock es-m-txt-c\" style=\"padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC\"><p style=\"Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px\"><a href=\"https://viewstripo.email/\" class=\"view\" target=\"_blank\" style=\"-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px;font-family:arial, 'helvetica neue', helvetica, sans-serif\">View in browser</a></p></td> ")
                .append("                     </tr> ")
                .append("                   </table></td> ")
                .append("                 </tr> ")
                .append("               </table> ")
                .append("               <!--[if mso]></td></tr></table><![endif]--></td> ")
                .append("             </tr> ")
                .append("           </table></td> ")
                .append("         </tr> ")
                .append("       </table> ")
                .append("       <table cellpadding=\"0\" cellspacing=\"0\" class=\"es-header\" align=\"center\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top\"> ")
                .append("         <tr style=\"border-collapse:collapse\"> ")
                .append("          <td align=\"center\" style=\"padding:0;Margin:0\"> ")
                .append("           <table class=\"es-header-body\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#ffffff;width:600px\" cellspacing=\"0\" cellpadding=\"0\" bgcolor=\"#ffffff\" align=\"center\"> ")
                .append("             <tr style=\"border-collapse:collapse\"> ")
                .append("              <td style=\"Margin:0;padding-top:30px;padding-bottom:30px;padding-left:40px;padding-right:40px;background-color:#999999\" bgcolor=\"#999\" align=\"left\"> ")
                .append("               <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px\"> ")
                .append("                 <tr style=\"border-collapse:collapse\"> ")
                .append("                  <td valign=\"top\" align=\"center\" style=\"padding:0;Margin:0;width:520px\"> ")
                .append("                   <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" role=\"presentation\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px\"> ")
                .append("                     <tr style=\"border-collapse:collapse\"> ")
                .append("                      <td align=\"center\" style=\"padding:0;Margin:0;font-size:0px\"><a href=\"").append(FRONTEND_URL).append("\" target=\"_blank\" style=\"-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#FFFFFF;font-size:14px\"><img src=\"https://rfgbej.stripocdn.email/content/guids/9b0ae056-69b6-41d5-90d2-d079d1813b13/images/79201628374949343.png\" alt style=\"display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic\" width=\"222\" class=\"adapt-img\"></a></td> ")
                .append("                     </tr> ")
                .append("                   </table></td> ")
                .append("                 </tr> ")
                .append("               </table></td> ")
                .append("             </tr> ")
                .append("           </table></td> ")
                .append("         </tr> ")
                .append("       </table> ")
                .append("       <table class=\"es-content\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%\"> ")
                .append("         <tr style=\"border-collapse:collapse\"> ")
                .append("          <td align=\"center\" style=\"padding:0;Margin:0\"> ")
                .append("           <table class=\"es-content-body\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#333333;width:600px\" cellspacing=\"0\" cellpadding=\"0\" bgcolor=\"#333333\" align=\"center\"> ")
                .append("             <tr style=\"border-collapse:collapse\"> ")
                .append("              <td style=\"Margin:0;padding-top:40px;padding-bottom:40px;padding-left:40px;padding-right:40px;background-image:url(https://rfgbej.stripocdn.email/content/guids/9b0ae056-69b6-41d5-90d2-d079d1813b13/images/16901628375083588.png);background-repeat:no-repeat;background-position:center top;background-color:#777777\" align=\"left\" background=\"https://rfgbej.stripocdn.email/content/guids/9b0ae056-69b6-41d5-90d2-d079d1813b13/images/16901628375083588.png\" bgcolor=\"#777\"> ")
                .append("               <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px\"> ")
                .append("                 <tr style=\"border-collapse:collapse\"> ")
                .append("                  <td valign=\"top\" align=\"center\" style=\"padding:0;Margin:0;width:520px\"> ")
                .append("                   <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" role=\"presentation\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px\"> ")
                .append("                     <tr style=\"border-collapse:collapse\"> ")
                .append("                      <td align=\"center\" style=\"padding:0;Margin:0;padding-bottom:10px;padding-top:40px\"><h1 style=\"Margin:0;line-height:36px;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;font-size:30px;font-style:normal;font-weight:bold;color:#ffffff\"><span style=\"background-color:null\">WELCOME, ").append(name).append("</span></h1></td> ")
                .append("                     </tr> ")
                .append("                     <tr style=\"border-collapse:collapse\"> ")
                .append("                      <td esdev-links-color=\"#757575\" align=\"center\" style=\"Margin:0;padding-top:10px;padding-bottom:20px;padding-left:30px;padding-right:30px\"><p style=\"Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#dddddd;font-size:16px\">You have 15 minutes to activate your account.<br>Hurry up, click on the button below!</p></td> ")
                .append("                     </tr> ")
                .append("                     <tr style=\"border-collapse:collapse\"> ")
                .append("                      <td align=\"center\" style=\"padding:0;Margin:0;padding-top:10px;padding-bottom:20px\"><span class=\"es-button-border\" style=\"border-style:solid;border-color:#7c3aed;background:#7c3aed;border-width:0px;display:inline-block;border-radius:50px;width:auto\"><a href=\"").append(link).append("\" class=\"es-button\" target=\"_blank\" style=\"mso-style-priority:100 !important;text-decoration:none;transition:all 100ms ease-in;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#ffffff;font-size:14px;border-style:solid;border-color:#7c3aed;border-width:15px 30px 15px 30px;display:inline-block;background:#7c3aed;border-radius:50px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:bold;font-style:normal;line-height:17px;width:auto;text-align:center\">ACTIVATE ACCOUNT</a></span></td> ")
                .append("                     </tr> ")
                .append("                   </table></td> ")
                .append("                 </tr> ")
                .append("               </table></td> ")
                .append("             </tr> ")
                .append("           </table></td> ")
                .append("         </tr> ")
                .append("       </table> ")
                .append("       <table class=\"es-content\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%\"> ")
                .append("         <tr style=\"border-collapse:collapse\"> ")
                .append("          <td align=\"center\" style=\"padding:0;Margin:0\"> ")
                .append("           <table class=\"es-content-body\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#292828;width:600px\" cellspacing=\"0\" cellpadding=\"0\" bgcolor=\"#292828\" align=\"center\"> ")
                .append("             <tr style=\"border-collapse:collapse\"> ")
                .append("              <td align=\"left\" style=\"Margin:0;padding-top:30px;padding-bottom:30px;padding-left:40px;padding-right:40px\"> ")
                .append("               <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px\"> ")
                .append("                 <tr style=\"border-collapse:collapse\"> ")
                .append("                  <td valign=\"top\" align=\"center\" style=\"padding:0;Margin:0;width:520px\"> ")
                .append("                   <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" role=\"presentation\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px\"> ")
                .append("                     <tr style=\"border-collapse:collapse\"> ")
                .append("                      <td align=\"center\" style=\"padding:0;Margin:0;font-size:0\"> ")
                .append("                       <table class=\"es-table-not-adapt es-social\" cellspacing=\"0\" cellpadding=\"0\" role=\"presentation\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px\"> ")
                .append("                         <tr style=\"border-collapse:collapse\"> ")
                .append("                          <td valign=\"top\" align=\"center\" style=\"padding:0;Margin:0;padding-right:10px\"><a target=\"_blank\" href=\"https://www.facebook.com/spafiul/\" style=\"-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#26A4D3;font-size:15px\"><img title=\"Facebook\" src=\"https://rfgbej.stripocdn.email/content/assets/img/social-icons/circle-white/facebook-circle-white.png\" alt=\"Fb\" width=\"24\" height=\"24\" style=\"display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic\"></a></td> ")
                .append("                          <td valign=\"top\" align=\"center\" style=\"padding:0;Margin:0;padding-right:10px\"><a target=\"_blank\" href=\"https://twitter.com/CristianSpafiu\" style=\"-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#26A4D3;font-size:15px\"><img title=\"Twitter\" src=\"https://rfgbej.stripocdn.email/content/assets/img/social-icons/circle-white/twitter-circle-white.png\" alt=\"Tw\" width=\"24\" height=\"24\" style=\"display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic\"></a></td> ")
                .append("                          <td valign=\"top\" align=\"center\" style=\"padding:0;Margin:0;padding-right:10px\"><a target=\"_blank\" href=\"https://www.instagram.com/s.p.af/\" style=\"-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#26A4D3;font-size:15px\"><img title=\"Instagram\" src=\"https://rfgbej.stripocdn.email/content/assets/img/social-icons/circle-white/instagram-circle-white.png\" alt=\"Inst\" width=\"24\" height=\"24\" style=\"display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic\"></a></td> ")
                .append("                          <td valign=\"top\" align=\"center\" style=\"padding:0;Margin:0\"><a target=\"_blank\" href=\"https://www.linkedin.com/in/spaf/\" style=\"-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#26A4D3;font-size:15px\"><img title=\"Linkedin\" src=\"https://rfgbej.stripocdn.email/content/assets/img/social-icons/circle-white/linkedin-circle-white.png\" alt=\"In\" width=\"24\" height=\"24\" style=\"display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic\"></a></td> ")
                .append("                         </tr> ")
                .append("                       </table></td> ")
                .append("                     </tr> ")
                .append("                   </table></td> ")
                .append("                 </tr> ")
                .append("               </table></td> ")
                .append("             </tr> ")
                .append("           </table></td> ")
                .append("         </tr> ")
                .append("       </table></td> ")
                .append("     </tr> ")
                .append("   </table> ")
                .append("  </div>  ")
                .append(" </body>")
                .append("</html>");
        return emailTemplate.toString();
    }
}