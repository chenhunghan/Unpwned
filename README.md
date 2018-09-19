A React component check if the password has been pwned using <https://haveibeenpwned.com/>

It uses a render prop which gives you maximum flexibility because you are responsible for the rendering of everything and you simply apply props to what you're rendering.

# Usage

Using a simple input type = password.

```javascript
<Unpwned render={({ pwned, checkHaveIBeenPwned }) =>
    <Fragment>
      <input
        type="password"
        onChange={(e) => checkHaveIBeenPwned(e.target.value)} />
      {pwned && <label >'password has been hacked!'</label>}
    </Fragment>
} />
```

# See Live Example

```sh
yarn start
```

# Test
```sh
yarn test
```
