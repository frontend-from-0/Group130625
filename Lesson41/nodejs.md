## Definition
Node.js is an open-source and cross-platform JavaScript runtime environment. Node.js runs the V8 JavaScript engine, the core of Google Chrome, outside of the browser. This allows Node.js to be very performant.


## Architecture & Asynchronicity

A Node.js app runs in a single process, without creating a new thread for every request. Node.js provides a set of asynchronous I/O primitives in its standard library that prevent JavaScript code from blocking. In addition, libraries in Node.js are generally written using non-blocking paradigms. Accordingly, blocking behavior is the exception rather than the norm in Node.js.

When Node.js performs an I/O operation, like reading from the network, accessing a database or the filesystem, instead of blocking the thread and wasting CPU cycles waiting, Node.js will resume the operations when the response comes back.

This allows Node.js to handle thousands of concurrent connections with a single server without introducing the burden of managing thread concurrency, which could be a significant source of bugs.

## Full-Stack Context
Node.js has a unique advantage because millions of frontend developers that write JavaScript for the browser are now able to write the server-side code in addition to the client-side code without the need to learn a completely different language.

In Node.js the new ECMAScript standards can be used without problems, as you don't have to wait for all your users to update their browsers - you are in charge of deciding which ECMAScript version to use by changing the Node.js version, and you can also enable specific experimental features by running Node.js with flags.

## Key Built-in Core Modules

### Networking (HTTP)
The HTTP module is one of the most important core modules to understand when starting with Node.js.
• Function: It allows you to manually create a web server, accept incoming requests, and send responses.
• Significance: It provides a crucial low-level understanding of how networking applications work, as application frameworks like Express.js are built on top of it.
• Key Concept: You directly manage the incoming request (which contains the URL, method, headers, etc.) and the outgoing response.

### File System (FS)
Use the File System module to interact with local files and directories (such as reading, writing, or appending data).
• Focus: It is highly recommended to prioritize asynchronous (non-blocking) versions of methods like fs.readFile to prevent blocking Node.js's single thread, especially for operations involving disk access.
• Best Practice: The promise-based version (fs/promises) or using async/await syntax is often preferred over callbacks for better readability and managing asynchronous flow.
• Functionality: Methods exist for both asynchronous (non-blocking), synchronous (blocking), and promise-based operations.

### Path Utilities (Path)
The Path module provides utilities for working with file and directory paths in a reliable, cross-platform manner.
• Cross-Platform Safety: This module is essential because operating systems use different delimiters (e.g., forward slash / on Mac/Linux vs. backslash \ on Windows).
• Key Methods: Use functions like path.join() to construct paths using the correct platform-specific separator, path.resolve() to get an absolute path, and path.basename() or path.dirname() to parse path components.

### OS Utilities (OS)
This module gives you access to information about the underlying operating system and its system resources.
• Resource Access: You can retrieve details such as total system memory (os.totalmem), free memory (os.freemem), and information about the CPUs (os.cpus).
• User Information: It also provides details about the current system user (os.userinfo).

### Events (Events)
The Events module is fundamental to Node.js's architecture, especially its non-blocking nature, and is the basis for many core components.
• Event Emitter Pattern: This module exposes the EventEmitter class.
• Core Mechanics: You create an instance, register listeners using .on() (or .addListener), and trigger events using .emit(), optionally passing data.
• Architecture: The entire non-blocking I/O (Input/Output) structure relies on events and callbacks, managed by the Event Loop.

### Streams
Streams are essential building blocks used for handling and manipulating large or continuous data sequentially.
• Efficiency: They are vital for memory management because they handle data in small chunks (defaulting to 64 kilobytes for readable streams) instead of loading an entire large file into memory at once.
• Types: The four primary types are Readable (source), Writable (destination), Duplex (both read/write), and Transform (modification during transfer).
• Integration: Streams extend the EventEmitter class, allowing you to subscribe to events like data (when a chunk is available) and error.


## Useful links:

- NodeJS Hello World guide: https://nodejs.org/docs/latest/api/synopsis.html
- Express guide: https://expressjs.com/en/starter/installing.html
- Express TS template: https://github.com/wubeZ/create-express-ts-starter#readme

