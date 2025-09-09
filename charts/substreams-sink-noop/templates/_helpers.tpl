{{/*
Expand the name of the chart.
*/}}
{{- define "substreams-sink-noop.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "substreams-sink-noop.fullname" -}}
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
{{- define "substreams-sink-noop.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "substreams-sink-noop.labels" -}}
helm.sh/chart: {{ include "substreams-sink-noop.chart" . }}
{{ include "substreams-sink-noop.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "substreams-sink-noop.selectorLabels" -}}
app.kubernetes.io/name: {{ include "substreams-sink-noop.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "substreams-sink-noop.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "substreams-sink-noop.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
Component label helper
*/}}
{{- define "substreams_sink_noop.componentLabelFor" -}}
app.kubernetes.io/component: {{ . }}
{{- end }}

{{/*
Generate substreams sink noop labels with underscores for compatibility
*/}}
{{- define "substreams_sink_noop.labels" -}}
{{- include "substreams-sink-noop.labels" . }}
{{- end }}

{{/*
Generate substreams sink noop selector labels with underscores for compatibility  
*/}}
{{- define "substreams_sink_noop.selectorLabels" -}}
{{- include "substreams-sink-noop.selectorLabels" . }}
{{- end }}

{{/*
Generate substreams sink noop fullname with underscores for compatibility
*/}}
{{- define "substreams_sink_noop.fullname" -}}
{{- include "substreams-sink-noop.fullname" . }}
{{- end }}
