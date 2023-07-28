/**
 * Refactor the following NotificationSender class to follow the Dependency Inversion Principle (DIP).
 * Currently, it has a hard dependency on the EmailService class.
 */

class EmailService {
    send(email: string, message: string): void {
        // Send the email.
    }
}

class NotificationSender {
    private emailService: EmailService;

    constructor () {
        this.emailService = new EmailService();
    }

    sendNotification(email: string, message: string): void {
        this.emailService.send(email, message);
    }
}
