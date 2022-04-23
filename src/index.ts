#!/usr/bin/env node

// Dependencies
import * as fs from "fs"
import { program } from "commander"
import { ConcatFiles, ConcatFolder } from "./models/Concat.js"
import { IConcatFilesOptions } from "./interfaces/IConcatFilesOptions.js"
import path from "path"

// Vars
const PackageData = JSON.parse(fs.readFileSync("../package.json", "utf-8"))

// Program Data
program
    .name("concat-lua")
    .description("concats lua files")
    .version(PackageData.version);

// Options
program.option("-o, --output", "set where to output")
program.option("-b, --doBlock", "do block files", true)
program.option("-c, --comments", "add comments", true)

// Parse the arguments
program.parse(process.argv)

//
const Arguments = program.args
const OutputPath = Arguments.shift()
const Options = program.opts()

const Data: IConcatFilesOptions = {
    AddComment: Options.comments,
    DoWrap: Options.doBlock
}
let Output = ""

// Make sure we got args
if (Arguments.length == 0){
    let error = new Error("no files specified")
    throw(error)
}

// Make sure we have output
if (!OutputPath){
    let error = new Error("no output specified")
    throw(error)
}

// Loop through files/dirs
for (const File of Arguments){
    // See if directory
    if (path.extname(File) == ""){
        Output += ConcatFolder(File, Data)
        continue
    }

    //
    Output += ConcatFiles([File], Data)
}

// Output
fs.writeFileSync(OutputPath, Output)