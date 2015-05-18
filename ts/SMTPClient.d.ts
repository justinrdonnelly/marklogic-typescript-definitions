// Type definitions for SMTPClient
// Definitions: /Users/gjosten/Projects/github-grtjn/marklogic-typescript-definitions/xml/SMTPClient.xml

/**
Implements the send function.
**/

declare module SMTPClient {

  interface  {

    /** Send an email in an XQuery program. A valid SMTP Relay must be configured in the Groups page of the Admin Interface for the email to be sent. The format of the email message must be an XML file that complies with the schema files listed below. **/
    email(message: element()): void;


  }
}