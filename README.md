# chokidar-lots-of-files-repro

Repro for https://github.com/paulmillr/chokidar/issues/1385 (macos)

```bash
# Generate files to watch in src/
# (Edit gen.js parameters if needed)
node gen.js

# Watch with chokidar and tries to `exec` the `ls` bash command
node test.js
```

Results:

- Chokidar v4: EBADF error happens when generating 2000 files (lower than that it seems to be able to cope)
- Chokidar v3: No errors even with 10000 files
