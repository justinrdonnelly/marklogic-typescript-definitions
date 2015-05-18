// Type definitions for AnyURIBuiltins
// Definitions: /Users/gjosten/Projects/github-grtjn/marklogic-typescript-definitions/xml/AnyURIBuiltins.xml

/**
  The anyURI built-in function is the XQuery function that applies
  to xs:anyURI instances.  It is defined in
  XQuery 1.0
  and XPath 2.0 Functions and Operators.
**/

declare module AnyURIBuiltins {

  interface fn {

    /** Resolves a relative URI against an absolute URI. If $base is specified, the URI is resolved relative to that base. If $base is not specified, the base is set to the base-uri property from the static context, if the property exists; if it does not exist, an error is thrown. **/
    resolveUri(relative: xs:string, base?: xs:string): xs:anyURI;

    /** Resolves a relative URI against an absolute URI. If $base is specified, the URI is resolved relative to that base. If $base is not specified, the base is set to the base-uri property from the static context, if the property exists; if it does not exist, an error is thrown. **/
    resolveUri(relative: xs:string, base?: xs:string): xs:anyURI;

    /** Resolves a relative URI against an absolute URI. If $base is specified, the URI is resolved relative to that base. If $base is not specified, the base is set to the base-uri property from the static context, if the property exists; if it does not exist, an error is thrown. This XQuery function backs up the SPARQL IRI() function. **/
    resolveIri(relative: xs:string, base?: xs:string): sem:iri;


  }
}