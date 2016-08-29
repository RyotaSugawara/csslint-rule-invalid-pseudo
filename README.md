csslint-rule-invalid-pseudo
===

csslint rule plugin for invalid pseudo element.

# why this rule

After Chrome version 49, following code does not work.

You want to use `div::after` style.
But in this case, `div::after.foo` selector pattern ignores other selector.
It is caused by invalid pseudo selector pattern.

```css
div:after, div::after.foo {
    content: "should be invalid pattern"
}
```

