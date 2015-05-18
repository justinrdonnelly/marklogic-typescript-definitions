// Type definitions for SecurityBuiltins
// Definitions: /Users/gjosten/Projects/github-grtjn/marklogic-typescript-definitions/xml/Security-xdmp.xml

/**
The security built-in functions are XQuery functions to perform many
security-related tasks in MarkLogic Server.
**/

declare module SecurityBuiltins {

  interface xdmp {

    /** Tests whether a user can grant or revoke a set of roles. Raises an error if the session user can not. **/
    canGrantRoles(roles: string): void;

    /** Tests whether the current user has at least one of a given set of privileges. Raises an error if the user does not have any of the privileges. **/
    securityAssert(privileges: string, kind: string): void;

    /** Tests whether the current user has at least one of a given set of privileges. Returns true if they do, false otherwise. **/
    hasPrivilege(privileges: string, kind: string): boolean;

    /** Returns all roles assigned to a user, including roles directly assigned to the user and roles inherited by other roles. **/
    userRoles(name: string, extSecId?: number, secDbFirst?: boolean): number;

    /** Returns all roles assigned to a user, including roles directly assigned to the user and roles inherited by other roles. **/
    useridRoles(userId: number, extSecId?: number, secDbFirst?: boolean): number;

    /** Returns the set of all roles inherited by a given role, including roles directly assigned to the role and roles inherited from other roles. **/
    roleRoles(name: string): number;

    /** Returns the set of all roles that have a given privilege. **/
    privilegeRoles(action: string, kind: string): number;

    /** Returns the set of all roles assigned to an amp, including roles directly assigned to the amp and roles inherited by other roles. **/
    ampRoles(namespaceUri: string, localname: string, documentUri: string, databaseId: number): number;

    /** Returns the collections to which a given document belongs. **/
    documentGetCollections(uri: string): String[];

    /** Returns the permissions to a given document. **/
    documentGetPermissions(uri: string, format?: string, format?: string): Object[];

    /** Returns the permissions any new document would get if the current user were to insert a document without specifying the default permissions. **/
    defaultPermissions(uri?: string, format?: string, format?: string): Object[];

    /** Returns the collections any new document would get if the current user were to insert a document without specifying the collections. **/
    defaultCollections(uri?: string): string;

    /** Returns the name of the current user. **/
    getCurrentUser(): string;

    /** Returns the ID of the current user. **/
    getCurrentUserid(): number;

    /** If this App Server is using application-level authentication, returns the ID of the user in the last successful call to xdmp:login. Otherwise, returns the ID of the user from the Authorization header of this App Server request. If you want to get the ID of the current user, use the xdmp:get-current-userid function. **/
    getRequestUser(): number;

    /** Returns all the current roles, both assigned and inherited by the current user and any received from amps. **/
    getCurrentRoles(): number;

    /** Returns a permission object corresponding to the named role and capability given. **/
    permission(role: string, capability: string, format?: string, format?: string): Object;

    /** Returns the user ID for the specified user name. Unlike the security library module function sec:uid-for-name, this function can be evaluted against any database and does not need to be evaluated directly against the security database. It returns the user ID from the security database configured for the database in which the App Server evaluates against. **/
    user(user: string, extSecId?: number, secDbFirst?: boolean): number;

    /** Returns the role ID for the specified role name. Unlike the security library module function sec:uid-for-name, this function can be evaluted against any database and does not need to be evaluated directly against the security database. It returns the role ID from the security database configured for the database in which the App Server evaluates against. **/
    role(role: string): number;

    /** Returns the privilege ID for the specified privilege name. Unlike the security library module function sec:uid-for-name, this function can be evaluted against any database and does not need to be evaluated directly against the security database. It returns the privilege ID from the security database configured for the database in which the App Server evaluates against. **/
    privilege(action: string, kind: string): number;

    /** Returns the amp ID for the specified amp. Unlike the security library module function sec:uid-for-name, this function can be evaluted against any database and does not need to be evaluated directly against the security database. It returns the amp ID from the security database configured for the database in which the App Server evaluates against. **/
    amp(namespace: string, localname: string, moduleUri: string, database: number): number;

    /** Returns external security id and user name for an external user. **/
    userExternalSecurity(userId: number): object;

    /** Returns the external security ID for the specified external security name. Unlike the security library module function sec:uid-for-name, this function can be evaluted against any database and does not need to be evaluated directly against the security database. It returns the external security ID from the security database configured for the database in which the App Server evaluates against. **/
    externalSecurity(externalSecurity: string): number;


  }
}
