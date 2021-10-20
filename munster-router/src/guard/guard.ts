import { Injectable } from "@munster/core";

export function Guard() {
    return function(Target) {
        return Injectable()(Target);
    }
}
