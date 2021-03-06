import fs from 'fs';
import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import { SES } from 'aws-sdk';
import IMailProvider from '../IMailPrivider';

class SESMailProvider implements IMailProvider {
    private client: Transporter;

    constructor() {
        this.client = nodemailer.createTransport({
            SES: new SES({
                apiVersion: '2010-12-01',
                region: process.env.AWS_REGION,
            }),
        });
    }

    public async sendMail(
        to: string,
        subject: string,
        variables: any,
        path: string,
    ): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString('utf-8');

        const templateParse = handlebars.compile(templateFileContent);

        const templateHTML = templateParse(variables);

        await this.client.sendMail({
            to,
            from: 'Rentx <contato@rentx.com.br>',
            subject,
            html: templateHTML,
        });
    }
}

export default SESMailProvider;
