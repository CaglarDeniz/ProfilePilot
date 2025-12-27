#! /usr/bin/env fish
bun run index.ts \
	--websites "https://poshmark.com" \
	--interests "sports" \
	-n 1 \
	-e 10 
