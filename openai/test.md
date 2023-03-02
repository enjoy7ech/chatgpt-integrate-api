curl https://api.openai.com/v1/completions \
-H "Content-Type: application/json" \
-H "Authorization: Bearer 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" \
-d '{"model": "text-davinci-003", "prompt": "Say this is a test", "temperature": 0, "max_tokens": 7, "stream": true}'