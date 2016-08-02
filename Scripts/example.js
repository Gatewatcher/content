// This is an Example server-side script that shows how to use and create JavaScript scripts in the Demisto server
// The log function allows you to print data during script execution
log('Hello World');

// You can use arguments (that are added via the CLI) inside scripts in the following ways, (in our example,
// the argument name is : 'ArgumentExample')
// e.g. run this script !ExampleJSScript ArgumentExample=MD5
log('Your argument value = ' + args.ArgumentExample);

// You can view (but not change directly) incidents and investigation properties relevant to your current investigation
log('Investigation name is: ' + investigation.name);

// Please note incidents can be empty (e.g. if you run the from playground) the following returns the incident
// details only if the incidents are not empty
if (incidents && typeof incidents === 'object' && incidents !== null) {
  log('First incident details: ' + incidents[0].details);
}

// You can run specific integrations if they are already configured. The following is an example of a script
// running on a particular splunk instance called "Splunk1".
// The first example brings back the first event offset.
// log('Splunk query result: ' + executeCommand('search', {'using': 'Splunk1', 'query':' * | head 2 '})[0]['offset']);

// executeCommand is used to run a command without specifying the entity that will execute it.
// For example, if you want to run a single command that runs on every integration that supports the search command:
// log('Search query result: ' + executeCommand('search', {'query':' * | head 2 '}));

// Another example for executeCommand enables running an internal command that will get all entries of this investigation
log('First Entry content: ' + executeCommand('getEntries', {})[0]);

// You can check for all supported commands using the getAllSupportedCommands function.
// The following will return all supported commands and the entities supported
var cmds = getAllSupportedCommands();
for (var key in cmds) {
  if (cmds.hasOwnProperty(key)) {
    log('supporting integration: ' + key);
  }
}

// Util function isIp
log(isIp('8.8.8.8'));

// Util function http
var res = http('http://www.demisto.com');
log('Http GET call result StatusCode = ' +res.StatusCode);

// You can perform operations on current investigation and incidents, see follow example,
// Methods descriptions available in CommonServer script.
/*
var user = 'David';
var time = new Date();
var taskId = '3';

setOwner(user);

setPlaybook('Phishing Playbook');

setSeverity({id: incidents[0].id, severity: 'Critical'});

setTaskDueDate({id: taskId, dueDate: time.toUTCString()});

taskAssign({id: taskId, assignee: user});

You can change incident type, name, severity, details and systems for an investigation with a single incident.
This can be done by sending an object to setIncident with the details.
setIncident({type: 'Phishing', details: 'Phishing on my computer', severity: 'Critical', incName: 'Phishing incident',
            systems: '2.2.2.2,10.10.10.10'});

You can also spawn a new incident from the current one, in the same manner as changing the details of the incident:
createNewIncident({type: 'Phishing', details: 'Phishing on your computer', severity: 'Critical', incName: 'Phishing incident',
                              systems: '2.2.2.2,10.10.10.10'});


return;
*/

// You can also return either string or JSON objects to be printed to the screen as script results
return 'Script success! GO and write new scripts :)';
