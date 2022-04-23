// Dependencies
import * as fs from "fs"
import * as path from "path"
import indentString from "indent-string"
import { IConcatFilesOptions } from "../interfaces/IConcatFilesOptions.js"

//
export function ConcatFiles(Files: string[], Options: IConcatFilesOptions){
    // Vars
    let Output = ""

    // Go through each file
    for (const File of Files){
        // Make sure is a file
        if (path.extname(File) != ".lua"){
            continue
        }

        // Grab the data
        let Data = fs.readFileSync(File, "utf-8")

        if (Options.DoWrap){
            // Add a tab to each line
            Data = indentString(Data, 1, {
                indent: "\t"
            })

            // Add do-end to the start-end of the data
            Data = "do\n" + Data + "\nend\n"
        }

        // Add comment
        if (Options.AddComment){
            Data = `-- // ${File}\n` + Data
        }

        // Add to the output
        Output += Data + "\n"
    }

    // Return the output
    return Output
}

//
export function ConcatFolder(Directory: string, Options: IConcatFilesOptions){
    return ConcatFiles(fs.readdirSync(Directory), Options)
}