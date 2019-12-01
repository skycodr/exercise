/**
 * Author: SkyCodr (aka: Dulan Sudasinghe)
 * Date: 01.12.2019
 */

const tasks = require('./tasks');
const { vars } = require('./vars');
const {
    toFile,
    toConsole,
    fileIo,
    log,
    isValidBool: isBool,
    isValidTask: isTask,
    isValidOutput: isOutput,
    hasValue,
} = require('./utils');

// YOUR CODE HERE

/**
 * SPECIAL NOTES:
 *
 * All output is in ascending order
 *
 * Important!!!: In order to run scripts look at "TASK Runner" section
 */

/* --------------- TASKS --------------------- */

/*
 * ---------------------------------
 * TASK 1 - Printing random strings
 * ---------------------------------
 */

// tasks.taskSync.do({ write: toConsole }); // Printing to console
// tasks.taskSync.do({ write: toFile(fileIo('./task-1.txt')) }); // Printing to file

/*
 * ---------------------------------
 * TASK 2 - Fizz Buzz, sync
 * ---------------------------------
 */

// tasks.taskSync.do({ fizzBuzz: true, write: toConsole }); // Printing with FizzBuzz
// tasks.taskSync.do({ fizzBuzz: true, withErrors: true, write: toConsole }); // Printing with FizzBuzz with errors
// tasks.taskSync.do({ fizzBuzz: true, withErrors: true, write: toFile(fileIo('./task-2.txt')) }); // Printing with FizzBuzz with errors

/*
 * ---------------------------------
 * TASK 3 - Fizz Buzz, async
 * ---------------------------------
 */

// tasks.taskAsync.do({ fizzBuzz: true, withErrors: true, write: toConsole });
// tasks.taskAsync.do({ fizzBuzz: true, withErrors: true, slow: true, write: toFile(fileIo('./task-3.txt')) });

/*
 * ------------------------------------------
 * TASK 4, 5 - Implemented in above solution
 * ------------------------------------------
 */

/*
 * ---------------------------------
 * Bonus -
 * 1. Ascending order implemented
 * 2. Promise wrangling implemented
 * ---------------------------------
 */

// tasks.taskAsync.do({ fizzBuzz: true, withErrors: true, slow: true, write: toConsole });
// tasks.taskWrangledAsync.do({ fizzBuzz: true, withErrors: true, slow: true, write: toConsole });
// tasks.taskWrangledAsync.do({ fizzBuzz: true, withErrors: true, slow: true, write: toFile(fileIo('./task-4.txt')) });

/*
 * ------------------------------------------------------------------------
 * TASK Runner
 * 
 * Ex: npm start task=async fizzBuzz=true withErrors=true output=file slow=false
 *
 * Flags:
 *  -- task=(sync|async|wrangled) default wrangled. Choose the task to run
 *  -- output=(console|file) default console. Choose type of output
 *  -- slow=(true|false) default false. Choose speed simulation. only async
 *     functions can be throttled.
 *  -- fizzBuzz=(true|false) default false. Choose fizz buzz
 *  -- withErrors=(true|false) default false. Choose random error
 * ------------------------------------------------------------------------
 */

(async () => {
    log('Start: TASK Runner\n\n');
    log('/*----------------------------------------------------------------------------*/');
    log('/* Build using:                                                               */');
    log('/* NodeJS: v12.1.0                                                            */');
    log('/* npm: v6.9.0                                                                */');
    log('/*                                                                            */');
    log('/* Flags:                                                                     */');
    log('/*  -- task=(sync|async|wrangled) default wrangled. Choose the task to run    */');
    log('/*  -- output=(console|file) default console. Choose type of output           */');
    log('/*  -- slow=(true|false) default false. Choose speed simulation. only for     */');
    log('/*     task=(async|wrangled)                                                  */');
    log('/*  -- fizzBuzz=(true|false) default false. Choose fizz buzz                  */');
    log('/*  -- withErrors=(true|false) default false. Choose random error             */');
    log('/*                                                                            */');
    log('/* Example Usage:                                                             */');
    log('/* npm start task=async fizzBuzz=true withErrors=true output=file slow=false  */');
    log('/*----------------------------------------------------------------------------*/\n\n');

    let task = vars.WRANGLED,
        output = vars.CONSOLE,
        slow = vars.FALSE,
        buzz = vars.FALSE,
        error = vars.FALSE;
        file = './output.txt';

    const taskTypes = {[vars.SYNC]: 'taskSync', [vars.ASYNC]: 'taskAsync', [vars.WRANGLED]: 'taskWrangledAsync'};
    const outputTypes = {[vars.FILE]: toFile(fileIo(file)), [vars.CONSOLE]: toConsole};
    const boolTypes = {[vars.TRUE]: true, [vars.FALSE]: false}

    let taskInstance = taskTypes[task];
    let params = {fizzBuzz: boolTypes[buzz], slow: boolTypes[slow], withErrors: boolTypes[error], write: outputTypes[output], output};

    if (process.argv.length > 2) {
        process.argv.splice(0, 2);
        process.argv.forEach((value) => {
            const kv = value.toLowerCase().split('=');
            const k = kv[0];

            if (hasValue(kv)) {
                const v = kv[1];
                switch (k) {
                    case vars.ARG_TASK:
                        task = isTask(v) ? v : vars.WRANGLED;
                        break;
                    case vars.ARG_OUTPUT:
                        output = isOutput(v) ? v : vars.CONSOLE;
                        break;
                    case vars.ARG_SLOW:
                        slow = isBool(v) ? v : vars.FALSE;
                        break;
                    case vars.ARG_BUZZ:
                        buzz = isBool(v) ? v : vars.FALSE;
                        break;
                    case vars.ARG_ERR:
                        error = isBool(v) ? v : vars.FALSE;
                        break;
                }
            }
        });

        // Create the params
        taskInstance = taskTypes[task];
        params = {fizzBuzz: boolTypes[buzz], slow: boolTypes[slow], withErrors: boolTypes[error], write: outputTypes[output], output};
    } 
    
    log(`Running Task: '${taskInstance}' with params ${JSON.stringify(params)}\n\n`);

    if(output === vars.FILE) log(`Check ${file} to see the output\n\n`);
    
    // Run the task
    await tasks[taskInstance].do(params);
    
    log('\n\nEnd: TASK Runner\n');
})();
