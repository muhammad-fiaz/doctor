# Doctor - Your ready to go documentation website

Doctor Action: Build &amp; deploy documentation websites from markdown files in GitHub workflows. Customize themes &amp; functionality with CSS &amp; JS.
**Note:This Project is Still in Active Development!**
# Hello world javascript action

This action prints "Hello World" or "Hello" + the name of a person to greet to the log.

## Inputs

### `who-to-greet`

**Required** The name of the person to greet. Default `"World"`.

## Outputs

### `time`

The time we greeted you.

## Example usage

```yaml
uses: actions/hello-world-javascript-action@e76147da8e5c81eaf017dede5645551d4b94427b
with:
  who-to-greet: 'Mona the Octocat'
```
