// Type definitions for XPointerModule
// Definitions: /Users/gjosten/Projects/github-grtjn/marklogic-typescript-definitions/xml/xpointer.xml

/**
		This is the XPointer module, which is used with the 
			modular documents CPF application.
		To use the XPointer module as part of your own XQuery 
			module, include the following line in your 
			XQuery prolog: 
import module namespace xp = "http://marklogic.com/xinclude/xpointer"
         at "/MarkLogic/xinclude/xpointer.xqy";
The library namespace prefix xp is not predefined
in the server.
	**/

declare module XPointerModule {

  interface xp {

    /** This function.... **/
    parseXpointer(xpointer: xs:string): element(xp:part);

    /** This function.... **/
    pathFromElementScheme(part: xs:string): xs:string;

    /** This function.... **/
    altPathFromElementScheme(part: xs:string): xs:string;

    /** This function.... **/
    doDereference(context: node(), path: xs:string, nsBindings: xs:string): node();

    /** This function resolves an XPointer in the context of a particular node. **/
    dereference(context: node(), xpointer: xs:string): node();


  }
}