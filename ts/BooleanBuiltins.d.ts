// Type definitions for BooleanBuiltins
// Definitions: /Users/gjosten/Projects/github-grtjn/marklogic-typescript-definitions/xml/BooleanBuiltins.xml

/**
The boolean built-in functions are XQuery functions to manipulate xs:boolean
values.
They are defined in
XQuery 1.0
and XPath 2.0 Functions and Operators.
**/

declare module BooleanBuiltins {

  interface fn {

    /** Returns the xs:boolean value true. Equivalent to xs:boolean("1"). **/
    true(): xs:boolean;

    /** Returns the xs:boolean value false. Equivalent to xs:boolean("0"). **/
    false(): xs:boolean;

    /** Returns true if the effective boolean value is false, and false if the effective boolean value is true. The $arg parameter is first reduced to an effective boolean value by applying the fn:boolean function. **/
    not(arg: item()): xs:boolean;


  }
}