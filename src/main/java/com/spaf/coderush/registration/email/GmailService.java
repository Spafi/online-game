package com.spaf.coderush.registration.email;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

@Service
public class GmailService implements EmailSender {

    @Value("${EMAIL_FROM_ADDRESS}")
    private static String from;

    @Value("${GMAIL_APPLICATION_PASSWORD}")
    private static String GMAIL_APPLICATION_PASSWORD;

    @Value("${GMAIL_APPLICATION_EMAIL}")
    private static String GMAIL_APPLICATION_EMAIL;

    @Value("${ENABLE_SMTP_DEBUG}")
    private boolean ENABLE_SMTP_DEBUG;

    @Value("${WELCOME_MAIL_SUBJECT}")
    private static String WELCOME_MAIL_SUBJECT;

    @Override
    @Async
    public void send(String to, String email) {

        String host = "smtp.gmail.com";
        Properties properties = System.getProperties();

        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.auth", "true");

        Session session = Session.getInstance(properties, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(GMAIL_APPLICATION_EMAIL, GMAIL_APPLICATION_PASSWORD);
            }

        });

        session.setDebug(ENABLE_SMTP_DEBUG);

        try {
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(from));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
            message.setSubject(WELCOME_MAIL_SUBJECT);
            message.setContent(email, "text/html");
            Transport.send(message);
        } catch (MessagingException mex) {
            mex.printStackTrace();
        }
    }
}