import { Injectable } from "@munster/di";

export function Guard() {
    return function(Target) {
        Injectable()(Target);
    }
}
