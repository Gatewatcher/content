//+ exchange/search.ps1

//Params:
//See here: https://technet.microsoft.com/en-us/library/dd298173(v=exchg.160).aspx
//query is the string provided to the -SearchQuery parameter

if ((env.ARCH !== "amd64") && (env.OS !== "windows")) {
    throw("Script can ran only in 64bit Windows Agents");
}

var command = [];
command.push("powershell.exe");
command.push("-version 2.0");
command.push("-NonInteractive");
command.push("-NoLogo");
command.push(which("search.ps1"));
command.push("-query");
command.push(args.query);
command.push("-delete");

if (typeof (args.server) !== "undefined") {
    command.push("-server");
    command.push(args.server);
}

pack(execute(command.join(" ")), 'table');

