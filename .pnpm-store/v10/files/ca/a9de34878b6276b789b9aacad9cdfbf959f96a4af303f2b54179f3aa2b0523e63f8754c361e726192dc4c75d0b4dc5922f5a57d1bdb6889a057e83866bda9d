// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

export interface PromiseWithResolvers<T> {
	promise: Promise<T>;
	resolve: (value: T) => void;
	reject: (error: unknown) => void;
}

export function promiseWithResolvers<T>(): PromiseWithResolvers<T> {
	let resolver!: (value: T) => void;
	let rejecter!: (error: unknown) => void;

	const promise = new Promise<T>((resolve, reject) => {
		resolver = resolve;
		rejecter = reject;
	});

	return {
		promise,
		resolve: resolver,
		reject: rejecter,
	};
}
