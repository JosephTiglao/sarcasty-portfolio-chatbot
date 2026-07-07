# deploy.ps1

# Load .env
Get-Content .env | ForEach-Object {
  if ($_ -match '^\s*#' -or $_ -match '^\s*$') { return }  # skip comments/blanks
  $key, $value = $_ -split '=', 2
  [System.Environment]::SetEnvironmentVariable($key.Trim(), $value.Trim(), "Process")
}

sam deploy `
  --parameter-overrides `
    GroqApiKey="$env:GROQ_API_KEY" `
    GeminiApiKey="$env:GEMINI_API_KEY" `
    AllowedOrigins="$env:ALLOWED_ORIGINS"