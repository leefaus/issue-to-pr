module.exports = (robot) => {
  // Your code here
  console.log('Yay, the app was loaded!')

  robot.on('push', async context => {
    let re = /^\w+\s#?\d*/i
    console.log("commit pushed");
    var msg = context.payload.commits.message
    robot.log(msg);
    // Code was pushed to the repo, what should we do with it?
    robot.log(context.payload.ref); //head
    robot.log(context.payload.repository.owner.name); //owner
    robot.log(context.payload.repository.name); //repo
    robot.log(context.payload.ref);
    robot.log(context.payload.commits[0].message);
    let message = context.payload.commits[0].message.match(re);
    let issue_no = 0;
    if ((message !== null) && (message[0].startsWith("converts"))) {
      robot.log("message WAS NOT null")
      robot.log(message[0].substring(message[0].indexOf("#") + 1))
      return context.github.pullRequests.createFromIssue({
          "owner":  context.payload.repository.owner.name,
          "repo":   context.payload.repository.name,
          "issue":  message[0].substring(message[0].indexOf("#") + 1),
          "head":   context.payload.ref,
          "base":   "master"
      });
    } else {
      robot.log("message WAS null");
    }
  });

  robot.on('issues', async context => {
    console.log("issue opened");
    // Code was pushed to the repo, what should we do with it?
    robot.log(context.payload.action);
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
