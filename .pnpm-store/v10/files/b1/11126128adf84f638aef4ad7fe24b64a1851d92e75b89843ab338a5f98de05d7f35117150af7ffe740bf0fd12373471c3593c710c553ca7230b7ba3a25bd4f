//#region src/mitt.ts
/**
* Mitt: Tiny (~200b) functional event emitter / pubsub.
* @name mitt
* @returns {Mitt}
*/
function mitt(all) {
	all = all || /* @__PURE__ */ new Map();
	return {
		all,
		on(type, handler) {
			const handlers = all.get(type);
			if (handlers) handlers.push(handler);
			else all.set(type, [handler]);
		},
		off(type, handler) {
			const handlers = all.get(type);
			if (handlers) if (handler) handlers.splice(handlers.indexOf(handler) >>> 0, 1);
			else all.set(type, []);
		},
		emit(type, evt) {
			let handlers = all.get(type);
			if (handlers) handlers.slice().map((handler) => {
				handler(evt);
			});
			handlers = all.get("*");
			if (handlers) handlers.slice().map((handler) => {
				handler(type, evt);
			});
		}
	};
}

//#endregion
export { mitt as default };
//# sourceMappingURL=mitt.mjs.map