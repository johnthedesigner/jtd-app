// Indent console logs with a title
export function consoleGroup(title, logArray) {
  if (process.env.NODE_ENV === 'development') {
    console.group(title)
    logArray.forEach( (line) => console.log(line) )
    console.groupEnd()
  }
}
