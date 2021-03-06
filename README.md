# marklogic-typescript-definitions

TypeScript definition files for MarkLogic server-side javascript functions and types, available as an npm module.

For the node.js client definitions try the [marklogic-node-typescript-definitions](https://github.com/christyharagan/marklogic-node-typescript-definitions) package

## Usage

Install these files as node.js dependency using npm:

```
npm install marklogic-typescript-definitions --save
```

To use the definitions, modify your ```tsconfig.json``` file, adding the following entry to the ```files``` section:

```
node_modules/marklogic-typescript-definitions/ts/index.d.ts
```

So, for example, your ```tsconfig.json``` file might look like:

```json
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es5"
    },
    "files": [
        "./lib/myCode.ts",
        "./node_modules/marklogic-typescript-definitions/ts/index.d.ts"
    ]
}
```

## Suggested TypeScript Editors

Below are two suggested TypeScript editors:

- [Visual Studio Code](https://code.visualstudio.com/) runs out of the box with TypeScript support.
- [Atom](https://atom.io/) also provides good support (if not better), but requires installation of the ```atom-typescript``` plugin.

Make sure to use TypeScript 2.9.2+, to support the Iterable interface used by the Sequence class.

## Building the TypeScript definitions

The npm package contains the built definitions. If you'd like to re-build them, you can either use a local instance of node, or use docker. Both techniques require MarkLogic Server.

To build the definitions with a local installation of node, perform the following:
- Clone this project
- Download a copy of the documentation from here: http://docs.marklogic.com/MarkLogic_9_pubs.zip
- Extract the zip, and move the folder pubs/raw/apidoc/ into the root of this project, and rename it to xml/
- Run `npm install`
- Run `gulp` (may take a minute)

To build the definitions with docker, perform the following:
- Clone this project
- Download a copy of the documentation from here: http://docs.marklogic.com/MarkLogic_9_pubs.zip
- Extract the zip to the root of this project
- Build the image (eg `docker image build -t mltsd .`)
- Run the container (eg `docker container run --rm --mount type=bind,source=$(pwd)/MarkLogic_9_pubs/pubs/raw/apidoc,target=/usr/src/app/xml,readonly --mount type=bind,source=$(pwd)/ts,target=/usr/src/app/ts mltsd`)

Note: Default values are used for MarkLogic host, port, username, and password. They can be overridden (for either a local node installation, or docker) by using flags. It runs by default as if you typed:

```
--ml-host=localhost --ml-port=8000 --ml-user=admin --ml-pass=admin
```

**Warning: The apidocs are fully man-made, so can contain all kinds of typos that can throw off this tool. The processing is fairly delicate. Please report any issue resulting from mistakes in the apidoc, so that we can get them fixed.**
