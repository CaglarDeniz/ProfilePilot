import { configure, getConsoleSink, getLogger, getStreamSink } from '@logtape/logtape'
import type { FileSink } from 'bun';

// Create a stream sink for logtape's internal errors
let logtape_sink_file: FileSink | undefined = undefined;

const logtape_stream_sink = new WritableStream({

	start() {
		logtape_sink_file = Bun.file('./logtape.log').writer();
	},
	write(chunk) {
		logtape_sink_file?.write(chunk)
	},
	close() {
		logtape_sink_file?.end();
	},
	abort() { }
})

// Configure the logger
await configure({
	sinks: {
		console: getConsoleSink(),
		stream: getStreamSink(logtape_stream_sink)
	},
	loggers: [
		{ category: ['merchantScripts'], lowestLevel: 'trace', sinks: ["console"] },
		{ category: ['logtape', 'meta'], lowestLevel: 'warning', sinks: ["stream"] }
	]
})

const logger = getLogger(["merchantScripts"])

export default logger;
