const CREATE_ELEMENT = 'e';
const CREATE_CHILD_ELEMENT = 'c';
const IF_HYPERSCRIPT = 'i';

module.exports = function (babel) {
    const { types: t } = babel;

    return {
        name: "ast-transform", // not required
        visitor: {
            JSXElement(path) {

                const { openingElement, children } = path.node;
                const attributes = extractAttributes(openingElement);
                const name = openingElement.name.name;
                const isComponent = name.indexOf('-') > 0;
                const ifAttr = extractIfAttribute(openingElement);

                path.node.type = 'CallExpression';
                path.node.callee = {
                    type: 'Identifier',
                    name: isComponent ? CREATE_CHILD_ELEMENT : CREATE_ELEMENT
                };
                path.node.arguments = [
                    {
                        type: 'StringLiteral',
                        value: name
                    },
                    {
                        type: 'ObjectExpression',
                        properties: attributes
                    },
                    {
                        type: 'ArrayExpression',
                        elements: formatChildren(children)
                    },
                    {
                        type: 'ArrayExpression',
                        elements: extractDirectives(openingElement)
                    }
                ];
                if (ifAttr) {
                    const originalNode = { ...path.node };
                    path.node.type = 'CallExpression';
                    path.node.callee = {
                        type: 'Identifier',
                        name: IF_HYPERSCRIPT
                    };
                    path.node.arguments = [
                        {
                            type: 'ArrowFunctionExpression',
                            params: [],
                            body: ifAttr.value.expression
                        },
                        {
                            type: 'ArrowFunctionExpression',
                            params: [],
                            body: originalNode
                        }
                    ];
                }
            }
        }
    };
}

function extractDirectives(openingElement) {
    const { attributes } = openingElement;
    const directiveArr = [];
    attributes.forEach(item => {
        if (item.name.namespace) {
            if (item.name.namespace.name === 'view') {
                if (item.name.name.name === 'if' || item.name.name.name === 'for') {
                    return;
                }
            }
            directiveArr.push({
                type: 'ArrayExpression',
                elements: [
                    {
                        type: 'StringLiteral',
                        value: item.name.namespace.name
                    },
                    {
                        type: 'StringLiteral',
                        value: item.name.name.name
                    },
                    getDirectiveValueCaller(item.value)
                ]
            });
        }
    });
    return directiveArr;
}


function extractAttributes(openingElement) {
    const { attributes } = openingElement;
    const attributeArr = [];
    attributes.forEach(item => {
        if (!item.name.namespace) {
            attributeArr.push({
                type: 'ObjectProperty',
                key: {
                    type: 'Identifier',
                    name: item.name.name
                },
                value: getAttributeValue(item.value)
            });
        }
    });
    return attributeArr;
}

function getDirectiveValueCaller(value) {
    if (value.type === 'JSXExpressionContainer') {
        return {
            type: 'ArrowFunctionExpression',
            params: [],
            body: value.expression
        };
    } else {
        return {
            type: 'ArrowFunctionExpression',
            params: [],
            body: value
        };
    }
}

function getAttributeValue(value) {
    if (value.type === 'JSXExpressionContainer') {
        return {
            type: 'ArrowFunctionExpression',
            params: [],
            body: value.expression
        };
    } else {
        return value;
    }
}

function formatChildren(children) {
    const childrenArr = [];

    children.forEach(item => {
        if (item.type === 'JSXText') {
            childrenArr.push({
                type: 'StringLiteral',
                value: item.value
            });
        }
        if (item.type === 'JSXExpressionContainer') {
            childrenArr.push({
                type: 'ArrowFunctionExpression',
                params: [],
                body: item.expression
            });
        }
        if (item.type === 'JSXElement') {
            childrenArr.push(item);
        }
    });

    return childrenArr;
}

function extractIfAttribute(openingElement) {
    const { attributes } = openingElement;
    let ifAttribute = null;
    attributes.forEach(item => {
        if (item.name.namespace && item.name.namespace.name === 'view' && item.name.name.name === 'if') {
            ifAttribute = item;
        }
    });
    return ifAttribute;
}
