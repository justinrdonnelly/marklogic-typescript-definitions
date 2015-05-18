// Type definitions for PKIModule
// Definitions: /Users/gjosten/Projects/github-grtjn/marklogic-typescript-definitions/xml/pki.xml

/**
     
      The PKI library manages public key infrastructure state in the security database. 
      All functions require that the caller have either a read or a write PKI 
      execute privilege (http://marklogic.com/xdmp/privileges/pki-read, 
      http://marklogic.com/xdmp/privileges/pki-write). All documents are in
      the PKI collection (http://marklogic.com/xdmp/pki).
      
      All of these functions automatically invoke against the appropriate 
      security database, and require that the user have the necessary 
      invoke/invoke-in privileges.
      
      The pki function module is installed as the following file: 
      install_dir/Modules/MarkLogic/pki.xqy
      where install_dir is the directory in which 
      MarkLogic Server is installed. To use the pki.xqy module in your own
      XQuery modules, include the following line in your XQuery prolog:
      import module namespace pki = "http://marklogic.com/xdmp/pki" 
                  at "/MarkLogic/pki.xqy";
      
      The library uses the pki: namespace, which is 
    not predefined in the server.
    **/

declare module PKIModule {

  interface pki {

    /** This function creates a new X.509 certificate request template. Each time a new certificate request is generated, a new public/private key pair is generated. A new random ID is generated and returned as part of the element. This ID is used for identifying this template and its related key pairs and certificates. The returned element must be separately inserted into the database with pki:insert-template. **/
    createTemplate(name: xs:string, description: xs:string, keyType: xs:string, keyOptions: element(), csr: element(x509:req)): element(pki:template);

    /** This function inserts the specified certificate request template into the Security database and returns the certificate template id. **/
    insertTemplate(template: element(pki:template)): xs:unsignedLong;

    /** This function removes the specified certificate from the Security database. **/
    deleteCertificate(certificateId: xs:unsignedLong): void;

    /** This function removes the specified certificate request template from the Security database. **/
    deleteTemplate(templateId: xs:unsignedLong): void;

    /** This function returns the id of the specified certificate template. **/
    templateGetId(template: element(pki:template)): xs:unsignedLong;

    /** This function returns the name of the specified certificate template. **/
    templateGetName(template: element(pki:template)): xs:string;

    /** This function changes the name of the specified certificate template and returns the XML containing the change. Use pki:insert-template to save the change to the Security database. **/
    templateSetName(template: element(pki:template), name: xs:string): element(pki:template);

    /** This function returns the description of the specified certificate template. **/
    templateGetDescription(template: element(pki:template)): xs:string;

    /** This function changes the description of the specified certificate template and returns the XML containing the change. Use pki:insert-template to save the change to the Security database. **/
    templateSetDescription(template: element(pki:template), description: xs:string): element(pki:template);

    /** This function returns the key type for the specified certificate template. **/
    templateGetKeyType(template: element(pki:template)): xs:string;

    /** This function changes the key type for the specified certificate template and returns the XML containing the change. Use pki:insert-template to save the change to the Security database. **/
    templateSetKeyType(template: element(pki:template), keyType: xs:string): element(pki:template);

    /** This function returns the version number for the specified certificate template. **/
    templateGetVersion(template: element(pki:template)): xs:unsignedLong;

    /** This function returns all of the template key options set in the specified certificate template. **/
    templateGetKeyOptions(template: element(pki:template)): element(pki:key-options);

    /** This function sets the options for generating new keys in the specified certificate template. The returned element must be separately inserted into the database with pki:insert-template. **/
    templateSetKeyOptions(template: element(pki:template), keyOptions: element(pki:key-options)): element(pki:template);

    /** This function returns the request portion of the certificate template. **/
    templateGetRequest(template: element(pki:template)): element(x509:req);

    /** This function sets the request portion for the specified certificate template. Use pki:insert-template to save the change to the Security database. **/
    templateSetRequest(template: element(pki:template), req: element(x509:req)): element(pki:template);

    /** This function returns the ids for all of the certificate templates. **/
    getTemplateIds(): xs:unsignedLong;

    /** This function returns the certificate template for the specified id. **/
    getTemplate(templateId: xs:unsignedLong): element(pki:template);

    /** This function generates a PEM encoded X.509 certificate request from the template for the specified id. If $dns-name or $ip-addr are specified, those values will override any values specified in the template. A new public/private key pair is generated for the request and inserted as a temporary document in the database. When the signed certificate is inserted later, it is matched up against this document and any previously in use private key / certificate is replaced with the new one. The Admin UI will only set common-name, and leave both dns-name and ip-addr unspecified. Control over these values is provided only for power users to use through custom administration scripts. **/
    generateCertificateRequest(templateId: xs:unsignedLong, commonName: xs:string, dnsName: xs:string, ipAddr: xs:string): xs:string;

    /** This function returns any pending certificate requests for the specified template. The pending requests are returned as PEM encoded strings. **/
    getPendingCertificateRequestsPem(templateId: xs:unsignedLong): xs:string;

    /** This function returns any pending certificate requests for the specified template. The pending requests are returned as XML. **/
    getPendingCertificateRequestsXml(templateId: xs:unsignedLong): element(x509:req);

    /** This function inserts one or more PEM-encoded signed certificates into the database. The signed certificates are matched up against previously generated certificate requests and any previous certificate is replaced. If there is no matching certifcate request for the specified certificate, the certificate is not inserted into the database. **/
    insertSignedCertificates(certs: xs:string): void;

    /** This function inserts PEM-encoded certificates into the database without checking for a matching certificate request. This allows you to insert temporary certificates and those from new Certificate Authorities. **/
    insertTrustedCertificates(certs: xs:string): xs:unsignedLong;

    /** This function returns the ids of all of the trusted certificates in the Security database. **/
    getTrustedCertificateIds(): xs:unsignedLong;

    /** This function returns the certificate for the specified template and host. The certificate data is returned in both PEM-encoded and XML formats. The common name must be specified. The DNS name and IP address are optional. **/
    getCertificate(templateId: xs:unsignedLong, commonName: xs:string, dnsName: xs:string, ipAddr: xs:string): element(pki:certificate);

    /** This function inserts externally generated certificate into the database. This certificate can be used for certificate template specified by template-id. The common name of the certificate can be started with a wildcard "*" so that the certificate can be used for multiple hosts. **/
    insertHostCertificate(templateId: xs:unsignedLong, certs: xs:string, pkey: xs:string): void;

    /** This function returns true if the certificate specified by the template id and host combination are not signed by a trusted certificate authority. Otherwise, false is returned. The common name must be specified. The DNS name and IP address are optional. **/
    needCertificate(templateId: xs:unsignedLong, commonName: xs:string, dnsName: xs:string, ipAddr: xs:string): xs:boolean;

    /** This function returns any pending certificate requests for the specified template id and host combination. The certificate request data is return in both PEM-encoded and XML formats. The common name must be specified. The DNS name and IP address are optional. **/
    getPendingCertificateRequest(templateId: xs:unsignedLong, commonName: xs:string, dnsName: xs:string, ipAddr: xs:string): element(pki:request);

    /** This function generates a new key pair and temporary certificate from the specified certificate template. If a temporary certificate already exists for the template, this function does nothing. If $dns-name or $ip-addr are specified, those portions of the template are replaced with the specified values. The certificate is inserted into the database. This is used to ensure that secure app servers are initially usable while waiting for signed certificates. **/
    generateTemporaryCertificateIfNecessary(templateId: xs:unsignedLong, validFor: xs:unsignedInt, commonName: xs:string, dnsName: xs:string, ipAddr: xs:string): void;

    /** This function generates a new key pair and temporary certificate from the specified certificate template. If $dns-name or $ip-addr are specified, those portions of the template are replaced with the specified values. The certificate is inserted into the database. This is used to ensure that secure app servers are initially usable while waiting for signed certificates. **/
    generateTemporaryCertificate(templateId: xs:unsignedLong, validFor: xs:unsignedInt, commonName: xs:string, dnsName: xs:string, ipAddr: xs:string): void;

    /** This function returns true if the certificate is temporary. Otherwise, it returns false. **/
    isTemporary(cert: element(pki:certificate)): xs:boolean;

    /** This function returns the XML representation of the certificate for the specified id and common host name combination. **/
    getCertificateXml(templateId: xs:unsignedLong, hostname: xs:string): element(x509:cert);

    /** This function returns all of the certificates for the specified certificate template in XML format. **/
    getCertificatesForTemplateXml(templateId: xs:unsignedLong): element(x509:cert);

    /** This function returns the PEM encoded certificate for the specified certificate template and common name combination. **/
    getCertificatePem(templateId: xs:unsignedLong, hostname: xs:string): xs:string;

    /** This function returns the certificate template with the specified name. **/
    getTemplateByName(templateName: xs:string): element(pki:template);

    /** This function returns the certificate authority for the specified certificate template. **/
    getTemplateCertificateAuthority(templateId: xs:unsignedLong): element(pki:certificate);

    /** This function creates a common temporary certificate authority to sign all the certificates for the specified certificate template. **/
    generateTemplateCertificateAuthority(templateId: xs:unsignedLong, validFor: xs:unsignedInt): void;

    /** This function returns the certificate data for the specified certificates. **/
    getCertificates(certId: xs:unsignedLong): element(pki:certificate);

    /** This function returns all of the certificates for the specified certificate template. **/
    getCertificatesForTemplate(templateId: xs:unsignedLong): element(pki:certificate);

    /** This function checks whether a certificate template is in use by an App Server. Returns true if the template is in use. Otherwise false is returned. **/
    templateInUse(templateId: xs:unsignedLong): xs:boolean;

    /** This function inserts a PEM- or DER-encoded Certificate Revocation List (CRL) into the security database. A CRL is a list of certificate serial numbers that have been revoked, and the revocation date of each. The CRL is signed by the Certificate Authority to verify its accuracy. The CRL contains two dates, one indicating when it was published and the other indicating when it will next be published. This is useful in determining whether a newer CRL should be fetched. Certificate Authorities typically allow the CRL to be downloaded via HTTP. The document URL in the database is derived from the URL passed in to the function, so Inserting a newer CRL retrieved from the same URL will replace the previous one in the database. **/
    insertCertificateRevocationList(url: xs:string, crl: any): void;


  }
}