// Type definitions for AdminBuiltins
// Definitions: /Users/gjosten/Projects/github-grtjn/marklogic-typescript-definitions/xml/AdminBuiltins.xml

/****/

declare module AdminBuiltins {

  interface xdmp {

    /** Backs up forest data files. **/
    forestBackup(forestID: xs:unsignedLong, pathname: xs:string): void;

    /** Restores forest data files. Restarts the forest to complete the restoration. **/
    forestRestore(forestID: xs:unsignedLong, pathname: xs:string): void;

    /** Clears forest data files. **/
    forestClear(forestIDs: xs:unsignedLong): void;

    /** Restarts a forest. If multiple forest IDs are specified, the restarts occur in parallel. **/
    forestRestart(forestIDs: xs:unsignedLong): void;

    /** Rolls forests back to a previous point in time, marking any fragment newer than the specified timestamp as deleted. Also, any fragments that were created before the specified timestamp and deleted after will be rolled back (un-deleted). **/
    forestRollback(forestIDs: xs:unsignedLong, timestamp: xs:unsignedLong): void;

    /** Validates that the specified list of forests can be backed up to the backup data directory. Optionally verifies that the list of forests can enable journal archiving to the journal archive directory with the specified lag limit. Returns a database backup set node. **/
    databaseBackupValidate(forestIDs: xs:unsignedLong, pathname: xs:string, includeReplicas?: xs:boolean, journalArchiving?: xs:boolean, journalArchivePath?: xs:string, lagLimit?: xs:unsignedLong): Object;

    /** Validates that the specified list of forests can be backed up to the backup data directory. Optionally verifies that the list of forests can enable journal archiving to the journal archive directory with the specified lag limit. Returns a database backup set node. **/
    databaseIncrementalBackupValidate(forestIDs: xs:unsignedLong, pathname: xs:string, includeReplicas?: xs:boolean, incrementalDir?: xs:string, journalArchiving?: xs:boolean, journalArchivePath?: xs:string, lagLimit?: xs:unsignedLong): Object;

    /** Starts an asynchronous backup of the specified list of forests to the backup data directory. Optionally starts journal archiving of the specified list of forests to the specified journal archive directory. Returns a job ID that uniquely identifies the backup task. **/
    databaseBackup(forestIDs: xs:unsignedLong, pathname: xs:string, journalArchiving?: xs:boolean, journalArchivePath?: xs:string, lagLimit?: xs:unsignedLong): xs:unsignedLong;

    /** Starts an asynchronous incremental backup of the specified list of forests to the backup data directory. Optionally starts journal archiving of the specified list of forests to the specified journal archive directory. Returns a job ID that uniquely identifies the backup task. **/
    databaseIncrementalBackup(forestIDs: xs:unsignedLong, pathname: xs:string, incrementalDir?: xs:string, journalArchiving?: xs:boolean, journalArchivePath?: xs:string, lagLimit?: xs:unsignedLong): xs:unsignedLong;

    /** Starts journal archiving to the specified list of forests. **/
    startJournalArchiving(forestIDs: xs:unsignedLong, journalArchivePath: xs:string, lagLimit?: xs:unsignedLong): void;

    /** Stops journal archiving to the specified list of forests. **/
    stopJournalArchiving(forestIDs: xs:unsignedLong): void;

    /** Checks the status of the outstanding backup job with the specified job ID. Returns a database backup status as a JSON node defined in the job-status.xsd schema. **/
    databaseBackupStatus(jobid: xs:unsignedLong, hostid?: xs:unsignedLong): ObjectNode;

    /** Checks the status of the specified forests for any outstanding backup jobs. Returns the specified forests portion a database backup status as a JSON node defined in the job-status.xsd schema. **/
    forestBackupStatus(forestid: xs:unsignedLong): ObjectNode;

    /** Cancels an outstanding backup job with the specified job ID, returning true if the cancel operation is successful, false if the cancel operation is not successful. The xdmp:database-backup-cancel function must be run on the host in which the backup was initiated. **/
    databaseBackupCancel(jobid: xs:unsignedLong): xs:boolean;

    /** Validates that the specified list of forests can be restored from the backup data directory. Returns a database restore set node. **/
    databaseRestoreValidate(forestIDs: xs:unsignedLong, pathname: xs:string, restoreToTime?: xs:dateTime, includeReplicas?: xs:boolean, journalArchiving?: xs:boolean, journalArchivePath?: xs:string, incrementalBackup?: xs:boolean, incrementalBackupPath?: xs:string): Object;

    /** Starts an asynchronous restore of the specified list of forests from the backup data directory. Returns a job ID that uniquely identifies the restore task. **/
    databaseRestore(forestIDs: xs:unsignedLong, pathname: xs:string, restoreToTime?: xs:dateTime, journalArchiving?: xs:boolean, journalArchivePath?: xs:string, incrementalBackup?: xs:boolean, incrementalBackupPath?: xs:string): xs:unsignedLong;

    /** Checks the status of the outstanding restore job with the specified job ID. Returns a database restore status node JSON node. **/
    databaseRestoreStatus(jobid: xs:unsignedLong): ArrayNode;

    /** Cancels an outstanding restore job with the specified job ID, returning true if the cancel operation is successful, false if the cancel operation is not successful. **/
    databaseRestoreCancel(jobid: xs:unsignedLong): xs:boolean;

    /** Shutdown servers on hosts. **/
    shutdown(hostIDs: xs:unsignedLong, reason: xs:string): void;

    /** Restart servers on hosts. **/
    restart(hostIDs: xs:unsignedLong, reason: xs:string): void;

    /** Performs a directory listing of the given file pathname. **/
    filesystemDirectory(pathname: xs:string): Object;

    /** Creates the directory specified by pathname. Returns the empty sequence upon success. **/
    filesystemDirectoryCreate(pathname: xs:string, options?: element()|map:map, options?: Object): void;

    /** Reads a file from the filesystem. The file at the specified path must be UTF-8 encoded. This function is typically used for text files; for binary files, consider using the xdmp:external-binary function. **/
    filesystemFile(pathname: xs:string): xs:string;

    /** Returns the canonicalized file path of the input path. The file at the specified path must be UTF-8 encoded. **/
    filesystemFilepath(pathname: xs:string): xs:string;

    /** Reads the length of a file from the filesystem. It returns empty sequence if the object named by the pathname does not exist or is not a file. **/
    filesystemFileLength(pathname: xs:string): xs:unsignedLong;

    /** Return true if a file exists on a host; otherwise false. **/
    filesystemFileExists(pathname: xs:string, host?: xs:unsignedLong): xs:boolean;

    /** Returns true if a value is castable. This is similar to the "castable as" XQuery predicate, except that the type is determined at runtime. **/
    castableAs(namespaceUri: xs:string, localName: xs:string, item: item()): xs:boolean;

    /** Cancel the merge with the specified merge ID on a forest with the specified forest ID. **/
    mergeCancel(forestID: xs:unsignedLong, mergeID: xs:unsignedLong): void;

    /** Cancel the request with the given host, server, and request IDs. **/
    requestCancel(hostID: xs:unsignedLong, serverID: xs:unsignedLong, requestID: xs:unsignedLong): void;

    /** Purge old backups from a directory. **/
    databaseBackupPurge(dir: xs:string, keepNumBackups: xs:unsignedInt, incrementalDir?: xs:string): void;

    /** Purge journal archive before last incremental backup from a directory. **/
    databaseJournalArchivePurge(dir: xs:string, incrementalDir?: xs:string, journalArchivePath?: xs:string): void;

    /** Returns a sequence of the IDs of all orphaned large binaries in a given forest. **/
    getOrphanedBinaries(id: xs:unsignedLong): xs:unsignedLong;

    /** Remove an orphaned large binary **/
    removeOrphanedBinary(forestID: xs:unsignedLong, binaryID: xs:unsignedLong): void;


  }
}