//#region src/with-resolver.ts
function promiseWithResolvers() {
	let resolver;
	let rejecter;
	return {
		promise: new Promise((resolve, reject) => {
			resolver = resolve;
			rejecter = reject;
		}),
		resolve: resolver,
		reject: rejecter
	};
}

//#endregion
export { promiseWithResolvers };
//# sourceMappingURL=with-resolver.mjs.map