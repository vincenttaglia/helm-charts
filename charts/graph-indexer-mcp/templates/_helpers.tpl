{{/*
Expand the name of the chart.
*/}}
{{- define "graph-indexer-mcp.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
*/}}
{{- define "graph-indexer-mcp.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "graph-indexer-mcp.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "graph-indexer-mcp.labels" -}}
helm.sh/chart: {{ include "graph-indexer-mcp.chart" . }}
{{ include "graph-indexer-mcp.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app.kubernetes.io/component: mcp-server
{{- end }}

{{/*
Selector labels
*/}}
{{- define "graph-indexer-mcp.selectorLabels" -}}
app.kubernetes.io/name: {{ include "graph-indexer-mcp.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "graph-indexer-mcp.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "graph-indexer-mcp.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
The user-managed Secret holding sensitive env vars (see secret.yaml guard).
*/}}
{{- define "graph-indexer-mcp.secretName" -}}
{{- required "graph-indexer-mcp: existingSecret is required (see values.yaml)." .Values.existingSecret }}
{{- end }}

{{/*
Whether the MCP server exposes a network listener (http transport only).
Returns "true" when networked, "" otherwise.
*/}}
{{- define "graph-indexer-mcp.networked" -}}
{{- if eq .Values.config.transport "http" -}}
true
{{- end -}}
{{- end }}

{{/*
Validate transport/authz combination at render time.
*/}}
{{- define "graph-indexer-mcp.validate" -}}
{{- if and (eq .Values.config.authz "k8s-rbac") (ne .Values.config.transport "http") -}}
{{- fail "config.authz=k8s-rbac requires config.transport=http (caller identity is only available over the http transport)" -}}
{{- end -}}
{{- end }}
