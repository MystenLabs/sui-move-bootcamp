//#region src/transactions/executor/queue.ts
var SerialQueue = class {
	#queue = [];
	async runTask(task) {
		return new Promise((resolve, reject) => {
			this.#queue.push(() => {
				task().finally(() => {
					this.#queue.shift();
					if (this.#queue.length > 0) this.#queue[0]();
				}).then(resolve, reject);
			});
			if (this.#queue.length === 1) this.#queue[0]();
		});
	}
};
var ParallelQueue = class {
	#queue = [];
	constructor(maxTasks) {
		this.activeTasks = 0;
		this.maxTasks = maxTasks;
	}
	runTask(task) {
		return new Promise((resolve, reject) => {
			if (this.activeTasks < this.maxTasks) {
				this.activeTasks++;
				task().finally(() => {
					if (this.#queue.length > 0) this.#queue.shift()();
					else this.activeTasks--;
				}).then(resolve, reject);
			} else this.#queue.push(() => {
				task().finally(() => {
					if (this.#queue.length > 0) this.#queue.shift()();
					else this.activeTasks--;
				}).then(resolve, reject);
			});
		});
	}
};

//#endregion
export { ParallelQueue, SerialQueue };
//# sourceMappingURL=queue.mjs.map