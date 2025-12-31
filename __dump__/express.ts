import { HttpStatus } from 'nhb-toolbox';

interface Request {
	body: any;
	params: Record<string, string>;
	query: Record<string, string>;
	headers: Record<string, string>;
	cookies?: Record<string, string>;
}

interface Response {
	status(code: number): Response;
	json(data: any): Response;
	send(data: any): Response;
	sendStatus(code: number): Response;
	cookie(name: string, value: string, options?: any): Response;
}

type RequestHandler = (
	req: Request,
	res: Response,
	next: () => void
) => void | Promise<void>;
type ErrorHandler = (err: Error, req: Request, res: Response, next: () => void) => void;

function isRequestHandler(fn: unknown): fn is RequestHandler {
	return typeof fn === 'function' && fn.length === 3;
}

function isErrorHandler(fn: unknown): fn is ErrorHandler {
	return typeof fn === 'function' && fn.length === 4;
}

class Express extends HttpStatus {
	#middlewares: RequestHandler[] = [];
	#errorHandlers: ErrorHandler[] = [];

	// HTTP Methods
	get(path: string, ...handlers: RequestHandler[]) {
		return this;
	}

	post(path: string, ...handlers: RequestHandler[]) {
		return this;
	}

	put(path: string, ...handlers: RequestHandler[]) {
		return this;
	}

	delete(path: string, ...handlers: RequestHandler[]) {
		return this;
	}

	patch(path: string, ...handlers: RequestHandler[]) {
		return this;
	}

	// Middleware
	use(path: string, ...handlers: RequestHandler[]): Express;
	use(handler: RequestHandler, ...handlers: RequestHandler[]): Express;

	// Error Handling
	use(error: ErrorHandler): Express;

	use(
		pathOrHandler: string | ErrorHandler | RequestHandler,
		...handlers: RequestHandler[]
	) {
		if (typeof pathOrHandler === 'string') {
			this.#middlewares.push(...handlers);
		} else if (isRequestHandler(pathOrHandler) && handlers.length > 0) {
			this.#middlewares.push(pathOrHandler, ...handlers);
		} else if (isErrorHandler(pathOrHandler)) {
			this.#errorHandlers.push(pathOrHandler);
		}

		return this;
	}

	// Router
	router() {
		return new Express();
	}

	// Server
	listen(port: number, callback?: () => void): void {
		callback?.();
	}

	// Settings
	set(setting: string, value: any) {
		return this;
	}

	// Static files
	static(path: string) {
		return this;
	}

	// Template engine
	engine(
		ext: string,
		fn: (
			path: string,
			options: object,
			callback: (e: any, rendered?: string) => void
		) => void
	) {
		return this;
	}
}

// Usage example:
const app = new Express();

app.use((req, res, next) => {
	console.log('Middleware');
	next();
});

app.get('/users', (req, res) => {
	res.json([{ id: 1, name: 'John' }]);
});

app.post('/users', (req, res) => {
	res.status(201).json({ message: 'Created' });
});

app.use((err: Error, req: Request, res: Response, next: () => void) => {
	res.status(500).json({ error: err.message });
});

app.listen(3000, () => {
	console.log('Server running on port 3000');
});
