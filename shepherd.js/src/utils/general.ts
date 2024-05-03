import { type Tour, type TourOptions } from '../tour';
import {
    type StepOptionsAttachTo,
    Step,
    type StepOptions,
    type PopperPlacement,
    type ResolvedAttachTo
} from '../step';
import { isFunction, isHTMLElement, isString } from './type-check';

export class StepNoOp {
    constructor(_options: StepOptions) { }
}

export class TourNoOp {
    constructor(_tour: Tour, _options: TourOptions) { }
}

/**
 * Ensure class prefix ends in `-`
 * @param prefix - The prefix to prepend to the class names generated by nano-css
 * @return The prefix ending in `-`
 */
export function normalizePrefix(prefix?: string) {
    if (!isString(prefix) || prefix === '') {
        return '';
    }

    return prefix.charAt(prefix.length - 1) !== '-' ? `${prefix}-` : prefix;
}

/**
 * Resolves attachTo options, converting element option value to a qualified HTMLElement.
 * @param step - The step instance
 * @returns {{}|{element, on}}
 * `element` is a qualified HTML Element
 * `on` is a string position value
 */
export function parseAttachTo(step: Step): null | ResolvedAttachTo[] {
    // const options = step.options.attachTo || {};
    // const returnOpts = Object.assign({}, options);

    // if (isFunction(returnOpts.element)) {
    //     // Bind the callback to step so that it has access to the object, to enable running additional logic
    //     returnOpts.element = returnOpts.element.call(step);
    // }

    // if (isString(returnOpts.element)) {
    //     // Can't override the element in user opts reference because we can't
    //     // guarantee that the element will exist in the future.
    //     try {
    //         returnOpts.element = document.querySelector(
    //             returnOpts.element
    //         ) as HTMLElement;
    //     } catch (e) {
    //         // TODO
    //     }
    //     if (!returnOpts.element) {
    //         console.error(
    //             `The element for this Shepherd step was not found ${options.element}`
    //         );
    //     }
    // }

    // return returnOpts;

    if(!step.options.attachTo || step.options.attachTo.length === 0){
        return null;
    }

    return step.options.attachTo.map(item => {
        const result = Object.assign({}, item);

        if (isFunction(result.element)) {
            // Bind the callback to step so that it has access to the object, to enable running additional logic
            result.element = result.element.call(step);
        }

        if (isString(result.element)) {
            // Can't override the element in user opts reference because we can't
            // guarantee that the element will exist in the future.
            try {
                result.element = document.querySelector<HTMLElement>(result.element);

            } catch (e) {
                // TODO
            }
            if (!result.element) {
                console.error(
                    `The element for this Shepherd step was not found ${result.element}`
                );
            }
        }

        return result;

    }) as ResolvedAttachTo[];

}





/**
 * Checks if the step should be centered or not. Does not trigger attachTo.element evaluation, making it a pure
 * alternative for the deprecated step.isCentered() method.
 */
export function shouldCenterStep(resolvedAttachToOptions: ResolvedAttachTo[] | null) {
    if (
        resolvedAttachToOptions === undefined ||
        resolvedAttachToOptions === null ||
        resolvedAttachToOptions.length === 0
    ) {
        return true;
    }

    // return !resolvedAttachToOptions.element || !resolvedAttachToOptions.on;
    
    return !resolvedAttachToOptions.some(item => {
        return item.isTarget && item.element && item.on;
    });


}

/**
 * Create a unique id for steps, tours, modals, etc
 */
export function uuid() {
    let d = Date.now();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
}


export default function elementInViewport(el: HTMLElement): boolean {
    const rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth
    );

}
