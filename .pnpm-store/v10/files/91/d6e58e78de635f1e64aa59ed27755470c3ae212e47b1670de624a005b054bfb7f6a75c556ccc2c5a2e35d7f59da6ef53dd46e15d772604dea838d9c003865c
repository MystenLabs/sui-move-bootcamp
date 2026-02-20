/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { notEqual } from '@lit/reactive-element';
/**
 * States for task status
 */
export const TaskStatus = {
    INITIAL: 0,
    PENDING: 1,
    COMPLETE: 2,
    ERROR: 3,
};
/**
 * A special value that can be returned from task functions to reset the task
 * status to INITIAL.
 */
export const initialState = Symbol();
// TODO(sorvell / justinfagnani): Some issues:
// 1. With the task triggered in `update`, there is no ReactiveElement
// change-in-update warning in the common case that the update itself does not change
// the deps; however, Task's `requestUpdate` call to render pending state  will not
// trigger another update since the element is updating. This `requestUpdate`
// could be triggered in updated, but that results a change-in-update warning.
// 2. There is no good signal for when the task has resolved and rendered other
// than requestAnimationFrame. The user would need to store a promise for the
// task and then wait for that and the element to update. (Update just justinfagnani:
// Why isn't waiting taskComplete and updateComplete sufficient? This comment is
// from before taskComplete existed!)
/**
 * A controller that performs an asynchronous task (like a fetch) when its
 * host element updates.
 *
 * Task requests an update on the host element when the task starts and
 * completes so that the host can render the task status, value, and error as
 * the task runs.
 *
 * The task function must be supplied and can take a list of arguments. The
 * arguments are given to the Task as a function that returns a list of values,
 * which is run and checked for changes on every host update.
 *
 * The `value` property reports the completed value, and the `error` property
 * an error state if one occurs. The `status` property can be checked for
 * status and is of type `TaskStatus` which has states for initial, pending,
 * complete, and error.
 *
 * The `render` method accepts an object with optional methods corresponding
 * to the task statuses to easily render different templates for each task
 * status.
 *
 * The task is run automatically when its arguments change; however, this can
 * be customized by setting `autoRun` to false and calling `run` explicitly
 * to run the task.
 *
 * For a task to see state changes in the current update pass of the host
 * element, those changes must be made in `willUpdate()`. State changes in
 * `update()` or `updated()` will not be visible to the task until the next
 * update pass.
 *
 * @example
 *
 * ```ts
 * class MyElement extends LitElement {
 *   url = 'example.com/api';
 *   id = 0;
 *
 *   task = new Task(
 *     this,
 *     {
 *       task: async ([url, id]) => {
 *         const response = await fetch(`${this.url}?id=${this.id}`);
 *         if (!response.ok) {
 *           throw new Error(response.statusText);
 *         }
 *         return response.json();
 *       },
 *       args: () => [this.id, this.url],
 *     }
 *   );
 *
 *   render() {
 *     return this.task.render({
 *       pending: () => html`<p>Loading...</p>`,
 *       complete: (value) => html`<p>Result: ${value}</p>`
 *     });
 *   }
 * }
 * ```
 */
export class Task {
    /**
     * A Promise that resolve when the current task run is complete.
     *
     * If a new task run is started while a previous run is pending, the Promise
     * is kept and only resolved when the new run is completed.
     */
    get taskComplete() {
        // If a task run exists, return the cached promise. This is true in the case
        // where the user has called taskComplete in pending or completed state
        // before and has not started a new task run since.
        if (this._taskComplete) {
            return this._taskComplete;
        }
        // Generate an in-progress promise if the status is pending and has been
        // cleared by .run().
        if (this._status === TaskStatus.PENDING) {
            this._taskComplete = new Promise((res, rej) => {
                this._resolveTaskComplete = res;
                this._rejectTaskComplete = rej;
            });
            // If the status is error, return a rejected promise.
        }
        else if (this._status === TaskStatus.ERROR) {
            this._taskComplete = Promise.reject(this._error);
            // Otherwise we are at a task run's completion or this is the first
            // request and we are not in the middle of a task (i.e. INITIAL).
        }
        else {
            this._taskComplete = Promise.resolve(this._value);
        }
        return this._taskComplete;
    }
    constructor(host, task, args) {
        this._callId = 0;
        this._status = TaskStatus.INITIAL;
        (this._host = host).addController(this);
        const taskConfig = typeof task === 'object' ? task : { task, args };
        this._task = taskConfig.task;
        this._argsFn = taskConfig.args;
        this._argsEqual = taskConfig.argsEqual ?? shallowArrayEquals;
        this._onComplete = taskConfig.onComplete;
        this._onError = taskConfig.onError;
        this.autoRun = taskConfig.autoRun ?? true;
        // Providing initialValue puts the task in COMPLETE state and stores the
        // args immediately so it only runs when they change again.
        if ('initialValue' in taskConfig) {
            this._value = taskConfig.initialValue;
            this._status = TaskStatus.COMPLETE;
            this._previousArgs = this._getArgs?.();
        }
    }
    hostUpdate() {
        if (this.autoRun === true) {
            this._performTask();
        }
    }
    hostUpdated() {
        if (this.autoRun === 'afterUpdate') {
            this._performTask();
        }
    }
    _getArgs() {
        if (this._argsFn === undefined) {
            return undefined;
        }
        const args = this._argsFn();
        if (!Array.isArray(args)) {
            throw new Error('The args function must return an array');
        }
        return args;
    }
    /**
     * Determines if the task should run when it's triggered because of a
     * host update, and runs the task if it should.
     *
     * A task should run when its arguments change from the previous run, based on
     * the args equality function.
     *
     * This method is side-effectful: it stores the new args as the previous args.
     */
    async _performTask() {
        const args = this._getArgs();
        const prev = this._previousArgs;
        this._previousArgs = args;
        if (args !== prev &&
            args !== undefined &&
            (prev === undefined || !this._argsEqual(prev, args))) {
            await this.run(args);
        }
    }
    /**
     * Runs a task manually.
     *
     * This can be useful for running tasks in response to events as opposed to
     * automatically running when host element state changes.
     *
     * @param args an optional set of arguments to use for this task run. If args
     *     is not given, the args function is called to get the arguments for
     *     this run.
     */
    async run(args) {
        args ??= this._getArgs();
        // Remember the args for potential future automatic runs.
        // TODO (justinfagnani): add test
        this._previousArgs = args;
        if (this._status === TaskStatus.PENDING) {
            this._abortController?.abort();
        }
        else {
            // Clear the last complete task run in INITIAL because it may be a resolved
            // promise. Also clear if COMPLETE or ERROR because the value returned by
            // awaiting taskComplete may have changed since last run.
            this._taskComplete = undefined;
            this._resolveTaskComplete = undefined;
            this._rejectTaskComplete = undefined;
        }
        this._status = TaskStatus.PENDING;
        let result;
        let error;
        // Request an update to report pending state.
        if (this.autoRun === 'afterUpdate') {
            // Avoids a change-in-update warning
            queueMicrotask(() => this._host.requestUpdate());
        }
        else {
            this._host.requestUpdate();
        }
        const key = ++this._callId;
        this._abortController = new AbortController();
        let errored = false;
        try {
            result = await this._task(args, { signal: this._abortController.signal });
        }
        catch (e) {
            errored = true;
            error = e;
        }
        // If this is the most recent task call, process this value.
        if (this._callId === key) {
            if (result === initialState) {
                this._status = TaskStatus.INITIAL;
            }
            else {
                if (errored === false) {
                    try {
                        this._onComplete?.(result);
                    }
                    catch {
                        // Ignore user errors from onComplete.
                    }
                    this._status = TaskStatus.COMPLETE;
                    this._resolveTaskComplete?.(result);
                }
                else {
                    try {
                        this._onError?.(error);
                    }
                    catch {
                        // Ignore user errors from onError.
                    }
                    this._status = TaskStatus.ERROR;
                    this._rejectTaskComplete?.(error);
                }
                this._value = result;
                this._error = error;
            }
            // Request an update with the final value.
            this._host.requestUpdate();
        }
    }
    /**
     * Aborts the currently pending task run by aborting the AbortSignal
     * passed to the task function.
     *
     * Aborting a task does nothing if the task is not running: ie, in the
     * complete, error, or initial states.
     *
     * Aborting a task does not automatically cancel the task function. The task
     * function must be written to accept the AbortSignal and either forward it
     * to other APIs like `fetch()`, or handle cancellation manually by using
     * [`signal.throwIfAborted()`]{@link https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/throwIfAborted}
     * or the
     * [`abort`]{@link https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/abort_event}
     * event.
     *
     * @param reason The reason for aborting. Passed to
     *     `AbortController.abort()`.
     */
    abort(reason) {
        if (this._status === TaskStatus.PENDING) {
            this._abortController?.abort(reason);
        }
    }
    /**
     * The result of the previous task run, if it resolved.
     *
     * Is `undefined` if the task has not run yet, or if the previous run errored.
     */
    get value() {
        return this._value;
    }
    /**
     * The error from the previous task run, if it rejected.
     *
     * Is `undefined` if the task has not run yet, or if the previous run
     * completed successfully.
     */
    get error() {
        return this._error;
    }
    get status() {
        return this._status;
    }
    render(renderer) {
        switch (this._status) {
            case TaskStatus.INITIAL:
                return renderer.initial?.();
            case TaskStatus.PENDING:
                return renderer.pending?.();
            case TaskStatus.COMPLETE:
                return renderer.complete?.(this.value);
            case TaskStatus.ERROR:
                return renderer.error?.(this.error);
            default:
                throw new Error(`Unexpected status: ${this._status}`);
        }
    }
}
export const shallowArrayEquals = (oldArgs, newArgs) => oldArgs === newArgs ||
    (oldArgs.length === newArgs.length &&
        oldArgs.every((v, i) => !notEqual(v, newArgs[i])));
//# sourceMappingURL=task.js.map